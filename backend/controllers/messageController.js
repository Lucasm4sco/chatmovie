import User from '../models/UserModel.js';
import Message from '../models/MessageModel.js';
import * as cripto from '../utils/cripto.js';
import { CustomErrors } from '../utils/errors.js';
import { getAuthenticateUser } from '../middlewares/authorizationWebSocket.js';
import { isValidObjectId } from './UserController.js';

const profiles = {};

const getStringMessage = (type, message, status, action) => {
    const objMessage = {
        type,
        message,
        status
    }

    if (type === 'success')
        objMessage.action = action;

    return JSON.stringify(objMessage)
}

const verifyObjectMessage = (object) => {
    let template = {
        'get-message': { action: String, id_user: String },
        'send-message': { action: String, id_user: String, message: String }
    };

    const objTemplate = template[object.action];

    if (!objTemplate)
        throw new CustomErrors('Objeto enviado não correspondente a aplicação.', 422);

    const keysReceveid = Object.keys(object).sort();
    const keysTemplate = Object.keys(objTemplate).sort();
    const isTheSameKeys = JSON.stringify(keysReceveid) === JSON.stringify(keysTemplate);

    if (!isTheSameKeys)
        throw new CustomErrors('Objeto enviado não correspondente a aplicação.', 422);

    const isValidId = isValidObjectId(object.id_user);
    const isValidMessage = object.message && object.message.trim().length > 0;

    if (!isValidId)
        throw new CustomErrors('Por favor defina um ID válido!', 422);

    if (object.action === 'send-message' && !isValidMessage)
        throw new CustomErrors('Não é possível enviar mensagens sem conteúdo!', 422);

    return true
}

const getListMessages = async (id) => {
    const allMessages = await Message.find({ members: id })
        .sort({ updatedAt: -1 })
        .slice('messages', -1);

    const listMessages = allMessages.map(({ messages, updatedAt, members, key }) => ({
        messages,
        key: cripto.decryptKey(key),
        updatedAt,
        members
    }))

    return listMessages;
}

const getMessage = async (userId, userId2) => {
    const infoMessage = await Message.findOne({
        members: {
            $all: [userId, userId2]
        }
    }).select('messages updatedAt members key');

    if (!infoMessage)
        return { members: [userId.toString(), userId2.toString()], messages: [] }

    const lastMessageEncrypted = infoMessage.messages.pop();
    const key = cripto.decryptKey(infoMessage.key);
    const lastMessage = JSON.parse(cripto.decryptText(lastMessageEncrypted, key));
    const viewMessage = lastMessage.id_user.toString() === userId2.toString();

    if (viewMessage)
        lastMessage.visualized = true;

    const encryptLastMessage = cripto.encryptText(JSON.stringify(lastMessage), key);
    infoMessage.messages.push(encryptLastMessage);

    await infoMessage.save();
    return { messages: infoMessage.messages.reverse(), key, members: infoMessage.members }
}

const createMessage = (userId, messageContent) => {
    const message = {
        id_user: userId,
        content: messageContent,
        date: new Date(),
        visualized: false
    }

    return message;
}

const sendMessage = async (userId, receiverUserId, message) => {
    const infoMessage = await Message.findOne({
        members: {
            $all: [userId, receiverUserId]
        }
    });

    if (!infoMessage) {
        const key = cripto.generateRandomKey();
        const encryptedKey = cripto.encryptKey(key);

        const createdMessage = await Message.create({
            members: [userId.toString(), receiverUserId.toString()],
            messages: [],
            key: encryptedKey
        });

        const objMessage = createMessage(userId.toString(), message);
        const encryptedMessage = cripto.encryptText(JSON.stringify(objMessage), key);
        createdMessage.messages.push(encryptedMessage);
        await createdMessage.save();
        return {
            infoMessage: {
                message: encryptedMessage,
                key,
                members: createdMessage.members
            },
            status: 201
        };
    }

    const key = cripto.decryptKey(infoMessage.key);
    const objMessage = createMessage(userId.toString(), message);
    const encryptedMessage = cripto.encryptText(JSON.stringify(objMessage), key);
    infoMessage.messages.push(encryptedMessage);
    await infoMessage.save();
    return {
        infoMessage: { message: encryptedMessage, key, members: infoMessage.members },
        status: 200
    };
}

const handleReceveidMessages = async (userId, openConnectionState, message) => {
    try {
        const objMessage = JSON.parse(message);
        verifyObjectMessage(objMessage);

        const receiverUser = await User.findById(objMessage.id_user.toString());
        const actionGetMessage = objMessage.action === 'get-message';
        const actionSendMessage = objMessage.action === 'send-message';

        if (!receiverUser) {
            throw new CustomErrors('ID de usuário enviado não existente.', 400);
        }
        else if (actionGetMessage) {
            const infoMessage = await getMessage(userId, objMessage.id_user);
            const stringMessage = getStringMessage('success', infoMessage, 200, objMessage.action);

            if (profiles[userId]?.readyState === openConnectionState)
                profiles[userId].send(stringMessage);
        }
        else if (actionSendMessage) {
            const { infoMessage, status } = await sendMessage(userId, objMessage.id_user, objMessage.message);
            const stringMessageUser = getStringMessage('success', infoMessage, status, objMessage.action);
            const stringMessageReceiverUser = getStringMessage('success', infoMessage, status, 'receive-message')

            const user = profiles[userId]
            const receiverUserSocket = profiles[receiverUser._id.toString()]

            if (user?.readyState === openConnectionState)
                user.send(stringMessageUser);

            if (receiverUserSocket?.readyState === openConnectionState)
                receiverUserSocket.send(stringMessageReceiverUser);
        }

    } catch (error) {
        let stringMessage = '';
        console.log(error.message)

        if (error.name === 'SyntaxError') {
            const message = 'Operação não pode ser processada - sintaxe inválida!'
            stringMessage = getStringMessage('error', message, 400);
        }

        if (error instanceof CustomErrors)
            stringMessage = getStringMessage('error', error.message, error.code);

        if (profiles[userId]?.readyState === openConnectionState)
            return profiles[userId].send(stringMessage);
    }
}

const connectMessage = async (ws, req) => {
    try {
        const authorization = req.header('Authorization');
        const user = await getAuthenticateUser(authorization);

        if (user.code)
            throw new CustomErrors(user.message, user.code);

        const userId = user._id.toString();
        profiles[userId] = ws

        // handle receveid message 
        ws.on('message', (message) => handleReceveidMessages(userId, ws.OPEN, message));

        // send lists of all recent messages
        const listMessage = await getListMessages(userId);
        const stringMessage = getStringMessage('success', listMessage, 200, 'get-last-messages');

        if (ws.readyState === ws.OPEN)
            ws.send(stringMessage);

        // delete websocket
        ws.on('close', () => delete profiles[userId]);

    } catch (error) {
        console.log(error.message)
        if (error instanceof CustomErrors) {
            const stringMessage = getStringMessage('error', error.message, error.code);

            if (ws.readyState === ws.OPEN)
                ws.send(stringMessage);

            return
        }

        const message = 'Ocorreu um erro inesperado ao servidor, tente mais tarde!';
        const code = 500;
        const stringMessage = getStringMessage('error', message, code);

        if (ws.readyState === ws.OPEN)
            ws.send(stringMessage);
    }
}

const messageController = {
    connectMessage
};

export default messageController
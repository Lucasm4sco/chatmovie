import Requests, { getSocket } from "../utils/requestsAPI.js";

const getMessageSocket = async () => {
    const headers = await Requests.getHeaderWithAuthorization();
    const messageSocket = getSocket('message', '', null, { headers });
    return messageSocket
}

const actionGetMessage = (id, socket) => {
    const objGetMessage = { action: 'get-message', id_user: id.toString() };
    socket.send(JSON.stringify(objGetMessage));
}

const actionSendMessage = (message, id, socket) => {
    const objSendMessage = { action: 'send-message', id_user: id.toString(), message };
    socket.send(JSON.stringify(objSendMessage));
}

const eventMessage = (socket, dispatch, messageActions) => {
    socket.onmessage = (event) => {
        const objMessage = JSON.parse(event.data);

        if (objMessage.type === 'error')
            return dispatch(messageActions.setError(objMessage.message));

        if (objMessage.action === 'get-last-messages')
            return dispatch(messageActions.setLastMessages(objMessage.message));

        if (objMessage.action === 'get-message')
            return dispatch(messageActions.setMessages(objMessage.message));

        if (objMessage.action === 'send-message' || objMessage.action === 'receive-message')
            return dispatch(messageActions.updateMessages(objMessage.message))
    }
}

const messageService = {
    getMessageSocket,
    actionGetMessage,
    actionSendMessage,
    eventMessage
}

export default messageService
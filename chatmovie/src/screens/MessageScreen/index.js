import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { ActivityIndicator as Spinner } from "react-native";
import { ContainerBody, ContainerForm, ContainerScreen, HeaderMessage, Input, ImageProfile, UserName, ButtonClose, ButtonSendMessage, TextWithoutMessage, TextMessage, MessageComponent, TimeMessage, ContainerMessages } from "./styles";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { connectWebSocket, messageActions } from "../../slices/messageSlice";
import { decryptText } from "../../utils/cripto";
import Requests from '../../utils/requestsAPI.js';
import messageService from "../../services/messageService";

import imgUser from '../../assets/icons/user.png'

const RenderMessages = ({ messages, userMessage }) => {
    if (!messages)
        return null

    if (messages.length === 0)
        return <TextWithoutMessage> Seja o primeiro a enviar uma mensagem. </TextWithoutMessage>

    return messages.messages.map(message => {
        const infoMessage = JSON.parse(decryptText(message, messages.key));
        const isMyMessage = userMessage._id.toString() !== infoMessage.id_user;
        const dateMessage = new Date(infoMessage.date);
        const timeMessage = dateMessage.getHours() + ':' + dateMessage.getMinutes().toString().padStart(2, '0');

        return (
            <MessageComponent key={message} isMyMessage={isMyMessage}>
                <TextMessage>{infoMessage.content}</TextMessage>
                <TimeMessage>{timeMessage}</TimeMessage>
            </MessageComponent>
        )
    })
}

const MessageScreen = ({ route, navigation }) => {
    const { user } = route.params;
    const { messageSocket, loading, infoMessage } = useSelector(state => state.message);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const containerMessagesRef = useRef();

    useEffect(() => {
        if (!dispatch)
            return

        if (!messageSocket) {
            dispatch(connectWebSocket());
            return
        }

        if (!messageSocket.onmessage) {
            messageService.eventMessage(messageSocket, dispatch, messageActions);
        }

        if (messageSocket.readyState === messageSocket.OPEN && !infoMessage) {
            dispatch(messageActions.setLoading(true));
            messageService.actionGetMessage(user._id, messageSocket);
        }

        return () => {
            dispatch(messageActions.resetMessages());
        }

    }, [dispatch, messageSocket, messageSocket?.readyState]);

    const sendMessage = () => {
        if (messageSocket.readyState === messageSocket.OPEN)
            messageService.actionSendMessage(message, user._id, messageSocket);

        setMessage('');
    }

    if (!user)
        return null

    return (
        <ContainerScreen>
            <HeaderMessage>
                <ImageProfile
                    source={user.profile_picture ? {
                        uri: Requests.getURLImage('perfil', user.profile_picture)
                    } : imgUser}
                />
                <UserName numberOfLines={1}>{user.user_name}</UserName>
                <ButtonClose
                    underlayColor='rgba(18,18,18,0.8)'
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="close" size={26} color="white" />
                </ButtonClose>
            </HeaderMessage>
            <ContainerBody
                ref={containerMessagesRef}
                contentContainerStyle={{ flexDirection: 'column-reverse' }}
                onContentSizeChange={() => containerMessagesRef.current.scrollToEnd({ animated: true })}
                onLayout={() => containerMessagesRef.current.scrollToEnd({ animated: true })}
            >
                {loading ? (
                    <Spinner
                        size="large"
                        color="red"
                        animating
                        style={{ margin: 15 }}
                    />
                ) : (
                    <RenderMessages messages={infoMessage} userMessage={user} />
                )}
            </ContainerBody>
            <ContainerForm>
                <Input
                    autoCapitalize="sentences"
                    value={message || ''}
                    onChangeText={(text) => setMessage(text)}
                    onSubmitEditing={sendMessage}
                    
                />
                <ButtonSendMessage
                    onPress={sendMessage}
                    activeOpacity={0.8}
                    underlayColor='#8B0000'
                >
                    <Ionicons name="md-send-sharp" size={24} color="white" />
                </ButtonSendMessage>
            </ContainerForm>
        </ContainerScreen >
    )
}

export default MessageScreen;
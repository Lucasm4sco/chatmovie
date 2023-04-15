import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { ActivityIndicator as Spinner, TouchableOpacity } from "react-native"
import { CardMessage, ContainerMessages, ContainerRow, ImageProfileUser, MessageNotVisualized, TextMessage, UserName, TextWithoutMessage, CenterContent } from "./styles.js";
import { connectWebSocket, messageActions } from "../../slices/messageSlice.js";
import { decryptText } from "../../utils/cripto";
import userService from "../../services/userService.js";
import Requests from "../../utils/requestsAPI.js";
import messageService from "../../services/messageService.js";

import imgIconUser from '../../assets/icons/user.png';

const RenderCard = ({ dataMessage, idUser, navigation }) => {
    const [user, setUser] = useState(null);
    const [imageProfile, setImageProfile] = useState(imgIconUser);
    const memberId = dataMessage.members.filter(userMember => userMember != idUser)[0];
    const encryptedMessage = dataMessage.messages?.[0];
    const key = dataMessage.key;
    const message = JSON.parse(decryptText(encryptedMessage, key));
    const isVisualized = message.id_user == idUser ? true : message.visualized;

    useEffect(() => {
        const loadDataUser = async () => {
            const userData = await userService.getUserProfile(memberId);

            if (userData.profile_picture)
                setImageProfile({
                    uri: Requests.getURLImage('perfil', userData.profile_picture)
                })

            setUser(userData);
        }

        loadDataUser()
    }, [])

    if (!user)
        return

    return (
        <CardMessage
            onPress={() => navigation.navigate('Message', { user })}
        >
            <>
                <ContainerRow width='100' content='space-between'>
                    <ContainerRow width='80' content='flex-start'>
                        <ImageProfileUser
                            source={imageProfile}
                        />
                        <UserName numberOfLines={1}>
                            {user.user_name}
                        </UserName>
                    </ContainerRow>
                    {!isVisualized && <MessageNotVisualized />}
                </ContainerRow>
                <TextMessage numberOfLines={1}>{message.content}</TextMessage>
            </>
        </CardMessage>
    )
}

const ListMessagesScreen = ({ navigation }) => {
    const { messageSocket, lastMessages, loading } = useSelector(state => state.message);
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (dispatch && !messageSocket && user)
            dispatch(connectWebSocket());

        if (messageSocket && !messageSocket.onmessage)
            messageService.eventMessage(messageSocket, dispatch, messageActions);

    }, [dispatch, messageSocket])

    return (
        <ContainerMessages
            contentContainerStyle={{
                minHeight: '100%',
                alignItems: 'center',
                paddingTop: 2,
                paddingHorizontal: 5,
                paddingBottom: 110
            }}
        >
            {loading ? (
                <Spinner
                    size="large"
                    color="red"
                    animating
                    style={{ margin: 20 }}
                />
            ) : (
                lastMessages.length ? (
                    lastMessages.map((message) =>
                        <RenderCard
                            key={message.messages}
                            dataMessage={message}
                            idUser={user._id.toString()}
                            navigation={navigation}
                        />
                    )
                ) : (
                    <CenterContent>
                        <TextWithoutMessage color='#aaa'>
                            Você ainda não possui mensagens
                        </TextWithoutMessage>
                        <TouchableOpacity>
                            <TextWithoutMessage color='red'>Enviar primeira mensagem</TextWithoutMessage>
                        </TouchableOpacity>
                    </CenterContent>
                )
            )}
        </ContainerMessages>
    )
}

export default ListMessagesScreen
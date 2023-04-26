import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ContainerScreen, CenterContent, TextWithoutMessage, CardUser, Header, ButtonGoBack, TextColorRed, ImageProfileUser, UserName } from "./styles";
import { getFriends } from "../../slices/userSlice";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import userService from "../../services/userService";
import Requests from "../../utils/requestsAPI";

import imgIconUser from '../../assets/icons/user.png';

const RenderCard = ({ navigation, id }) => {
    const [user, setUser] = useState(null);
    const [imageProfile, setImageProfile] = useState(imgIconUser);

    useEffect(() => {
        const loadDataUser = async () => {
            const userData = await userService.getUserProfile(id);

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
        <CardUser
            onPress={() => navigation.navigate('Message', { user })}
        >
            <>
                <ImageProfileUser
                    source={imageProfile}
                />
                <UserName numberOfLines={1}>
                    {user.user_name}
                </UserName>
            </>
        </CardUser>
    )
}

const ListFriendsMessageScreen = ({ navigation }) => {
    const { friends } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if(dispatch)
            dispatch(getFriends())
    }, [dispatch])

    if (!friends?.length)
        return (
            <>
                <Header>
                    <ButtonGoBack
                        activeOpacity={0.6}
                        underlayColor='rgba(204, 22, 22, 0.78)'
                        onPress={() => navigation.goBack()}
                    >
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </ButtonGoBack>
                </Header>
                <ContainerScreen
                    contentContainerStyle={{
                        minHeight: '100%',
                        alignItems: 'center',
                        padding: 5
                    }}
                >
                    <CenterContent>
                        <TextWithoutMessage>
                            Você ainda não tem amigos
                            <TouchableOpacity 
                                onPress={() => navigation.navigate('Add')}
                                style={{margin: 0, padding: 15}}
                            >
                                <TextColorRed>adicionar amigos</TextColorRed>
                            </TouchableOpacity>
                        </TextWithoutMessage>
                    </CenterContent>
                </ContainerScreen>
            </>

        )

    return (
        <>
            <Header>
                <ButtonGoBack
                    activeOpacity={0.6}
                    underlayColor='rgba(204, 22, 22, 0.78)'
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="arrowleft" size={24} color="white" />
                </ButtonGoBack>
            </Header>
            <ContainerScreen
                contentContainerStyle={{
                    minHeight: '100%',
                    alignItems: 'center',
                    paddingTop: 2,
                    paddingHorizontal: 5,
                    paddingBottom: 110
                }}
            >
                {friends.map(friendId => <RenderCard id={friendId} key={friendId} navigation={navigation} />)}
            </ContainerScreen>
        </>
    )
}

export default ListFriendsMessageScreen;
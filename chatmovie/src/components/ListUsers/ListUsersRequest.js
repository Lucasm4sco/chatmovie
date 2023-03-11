import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import userService from "../../services/userService";
import { ContainerUsers, CardUserRequest, ContainerInfoUser, UserImage, UserNameCardRequest, ContainerButtons, ButtonAcionRequest, TextButtonAction } from "./styles"
import Requests from "../../utils/requestsAPI";

import imgUserIcon from '../../assets/icons/user.png';

const RenderCard = ({ navigation, id }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            const user = await userService.getUserProfile(id);
            setUser(user);
        }
        loadUser()
    }, [])

    if(!user)
        return null

    return (
        <CardUserRequest>
            <ContainerInfoUser width='100' autoHeight>
                {user?.profile_picture ? (
                    <UserImage
                        source={{
                            uri: Requests.getURLImage('perfil', user.profile_picture)
                        }}
                    />
                ) : (
                    <UserImage source={imgUserIcon} />
                )}
                <UserNameCardRequest>
                    {user?.user_name}
                </UserNameCardRequest>
            </ContainerInfoUser>
            <ContainerButtons>
                <ButtonAcionRequest
                    activeOpacity={0.6}
                    bgCollor='#000'
                >
                    <TextButtonAction>Rejeitar</TextButtonAction>
                </ButtonAcionRequest>
                <ButtonAcionRequest
                    activeOpacity={0.6}
                    bgCollor='#94090d'
                >
                    <TextButtonAction>Aceitar</TextButtonAction>
                </ButtonAcionRequest>
            </ContainerButtons>
        </CardUserRequest>
    )
}

const ListUsersRequest = ({ navigation }) => {
    const { friend_requests } = useSelector(state => state.user);

    return (
        <ContainerUsers
            contentContainerStyle={{
                paddingHorizontal: 20,
                paddingBottom: 100,
                alignItems: 'center'
            }}
        >
            {friend_requests.length ? (
                friend_requests.map(id => <RenderCard key={id} id={id} navigation={navigation} />)
            ) : (
                <></>
            )}
        </ContainerUsers>
    )
}

export default ListUsersRequest
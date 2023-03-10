import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { ActivityIndicator as Spinner } from "react-native"
import { ContainerUsers, CardUser, ContainerInfoUser, UserImage, UserName, ContainerAddIcon, ButtonAdd } from "./styles"
import { AntDesign, Feather } from '@expo/vector-icons'
import userService from "../../services/userService"
import Requests from "../../utils/requestsAPI"
import imgUserIcon from '../../assets/icons/user.png'

const HandleAddIcon = ({ navigation, user }) => {
    const { friend_requests_sent, friend_requests_loading } = useSelector(state => state.user);

    const requestAlreadySentToUser = friend_requests_sent?.includes(user?._id.toString());
    const sendingRequestToUser = friend_requests_loading?.[user?._id.toString()]

    if (requestAlreadySentToUser)
        return <Feather name="clock" size={26} color="#847E7E" />

    if (sendingRequestToUser)
        return <Spinner size="large" color='#999999' animating />

    return (
        <ButtonAdd
        >
            <AntDesign name="adduser" size={26} color="white" />
        </ButtonAdd>
    )
}

const ListUsers = ({ navigation }) => {
    const [listUsers, setListUsers] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const users = await userService.getListUsers();
            if (users.errors)
                console.log(users.errors[0]);

            setListUsers(users)
        }

        loadData()
    }, [])

    return (
        <ContainerUsers
            contentContainerStyle={{
                paddingHorizontal: 20,
                paddingBottom: 100,
                alignItems: 'center'
            }}
        >
            {listUsers.map(user => (
                <CardUser key={user?._id?.toString()} >
                    <>
                        <ContainerInfoUser>
                            {user?.profile_picture ? (
                                <UserImage source={{
                                    uri: Requests.getURLImage('perfil', user.profile_picture)
                                }} />
                            ) : (
                                <UserImage source={imgUserIcon} />
                            )}
                            <UserName numberOfLines={1}>
                                {user.user_name}
                            </UserName>
                        </ContainerInfoUser>
                        <ContainerAddIcon>
                            <HandleAddIcon
                                user={user}
                                navigation={navigation}
                            />
                        </ContainerAddIcon>
                    </>
                </CardUser>
            ))}
        </ContainerUsers>
    )
}

export default ListUsers
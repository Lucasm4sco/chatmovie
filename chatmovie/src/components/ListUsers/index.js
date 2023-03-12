import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getFriends, sendFriendRequest } from "../../slices/userSlice";
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator as Spinner } from "react-native"
import { ContainerUsers, CardUser, ContainerInfoUser, UserImage, UserName, ContainerAddIcon, ButtonAdd } from "./styles"
import { AntDesign, Feather } from '@expo/vector-icons'

import userService from "../../services/userService"
import Requests from "../../utils/requestsAPI"
import imgUserIcon from '../../assets/icons/user.png'

const HandleAddIcon = ({ user, dispatch }) => {
    const { friend_requests_sent, friend_requests_loading } = useSelector(state => state.user);
    const requestAlreadySentToUser = friend_requests_sent?.includes(user?._id.toString());
    const sendingRequestToUser = friend_requests_loading?.[user?._id.toString()]

    if (requestAlreadySentToUser)
        return <Feather name="clock" size={26} color="#847E7E" />

    if (sendingRequestToUser)
        return <Spinner size="large" color='#999999' animating />

    return (
        <ButtonAdd
            onPress={() => dispatch(sendFriendRequest(user._id))}
        >
            <AntDesign name="adduser" size={26} color="white" />
        </ButtonAdd>
    )
}

const ListUsers = ({ navigation }) => {
    const [allUsers, setAllUsers] = useState([]);
    const [listUsers, setListUsers] = useState([]);
    const { search_user } = useSelector(state => state.user);
    const [intervalRequest, setIntervalRequest] = useState(null);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    useEffect(() => {
        const loadData = async () => {
            const users = await userService.getListUsers();
            if (users.errors)
                return console.log(users.errors[0]);

            setAllUsers(users)
            setListUsers(users)
        }

        loadData()
    }, [])

    useEffect(() => {
        const regex = new RegExp(search_user, 'ig');
        const filterUsersBySearch = allUsers.filter(user => {
            const userMatchesSearch = user.user_name.match(regex) || user.name.match(regex);
            return userMatchesSearch
        })
        setListUsers(filterUsersBySearch);
    }, [search_user, allUsers])

    // make requests API in some interval
    useEffect(() => {
        if (isFocused)
            return setIntervalRequest(setInterval(async () => {
                const users = await userService.getListUsers();
                const changeUserList = JSON.stringify(users) !== JSON.stringify(allUsers);

                if (users.errors)
                    return console.log(users.errors[0]);

                if(changeUserList){
                    setAllUsers(users);
                    dispatch(getFriends())
                }
                    
            }, 5000))

        clearInterval(intervalRequest)
    }, [isFocused])


    return (
        <ContainerUsers
            contentContainerStyle={{
                paddingHorizontal: 20,
                paddingBottom: 100,
                alignItems: 'center'
            }}
        >
            {listUsers.map(user => (
                <CardUser
                    key={user?._id?.toString()}
                    onPress={() => navigation.navigate('UserProfile', { user })}
                >
                    <>
                        <ContainerInfoUser width='85'>
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
                                dispatch={dispatch}
                            />
                        </ContainerAddIcon>
                    </>
                </CardUser>
            ))}
        </ContainerUsers>
    )
}

export default ListUsers
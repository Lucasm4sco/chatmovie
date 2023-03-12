import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ContainerUsers, CardUserRequest, ContainerInfoUser, UserImage, UserNameCardRequest, ContainerButtons, ButtonAcionRequest, TextButtonAction } from "./styles"
import { acceptFriendRequest, rejectFriendRequest } from "../../slices/userSlice";
import userService from "../../services/userService";
import Requests from "../../utils/requestsAPI";

import imgUserIcon from '../../assets/icons/user.png';

const RenderCard = ({ navigation, user }) => {
    const { friend_requests_loading } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleRequest = (action, id) => {
        const actions = {
            accept: () => dispatch(acceptFriendRequest(id)),
            reject: () => dispatch(rejectFriendRequest(id))
        }

        const existingRequest = actions[action];
        const isLoadingRequest = friend_requests_loading[id]

        if (existingRequest && !isLoadingRequest)
            existingRequest()
    }

    return (
        <CardUserRequest
            onPress={() => navigation.navigate('UserProfile', { user })}
        >
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
                    onPress={() => handleRequest('reject', user._id)}
                >
                    <TextButtonAction>Rejeitar</TextButtonAction>
                </ButtonAcionRequest>
                <ButtonAcionRequest
                    activeOpacity={0.6}
                    bgCollor='#94090d'
                    onPress={() => handleRequest('accept', user._id)}
                >
                    <TextButtonAction>Aceitar</TextButtonAction>
                </ButtonAcionRequest>
            </ContainerButtons>
        </CardUserRequest>
    )
}

const ListUsersRequest = ({ navigation }) => {
    const { friend_requests, search_user } = useSelector(state => state.user);
    const [allFriendRequests, setAllFriendRequests] = useState([]);
    const [listUsers, setListUsers] = useState([]);
    

    useEffect(() => {
        const loadUserRequests = async () => {
            const allFriendRequests = [];

            for (let id of friend_requests) {
                const userData = await userService.getUserProfile(id);
                allFriendRequests.unshift(userData);
            }

            setAllFriendRequests(allFriendRequests);
            setListUsers(allFriendRequests);
        }

        loadUserRequests()
    }, [friend_requests])

    useEffect(() => {
        const regex = new RegExp(search_user, 'ig');
        const filterUsersBySearch = allFriendRequests.filter(user => {
            const userMatchesSearch = user.user_name.match(regex) || user.name.match(regex);
            return userMatchesSearch
        })
        setListUsers(filterUsersBySearch);
    }, [search_user])

    return (
        <ContainerUsers
            contentContainerStyle={{
                paddingHorizontal: 20,
                paddingBottom: 100,
                alignItems: 'center'
            }}
        >
            {friend_requests.length ? (
                listUsers.map(user => <RenderCard key={user?._id?.toString()} user={user} navigation={navigation} />)
            ) : (
                <></>
            )}
        </ContainerUsers>
    )
}

export default ListUsersRequest
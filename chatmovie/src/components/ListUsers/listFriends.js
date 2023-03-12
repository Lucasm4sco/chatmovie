import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { ContainerUsers, CardUser, ContainerInfoUser, UserImage, UserNameCardRequest } from "./styles"
import userService from "../../services/userService";
import Requests from "../../utils/requestsAPI"

import imgUserIcon from '../../assets/icons/user.png'

const RenderCard = ({ navigation, user }) => {
    return (
        <CardUser
            onPress={() => navigation.navigate('UserProfile', { user })}
        >
            <ContainerInfoUser width='100'>
                {user.profile_picture ? (
                    <UserImage
                        source={{
                            uri: Requests.getURLImage('perfil', user.profile_picture)
                        }}
                    />
                ) : (
                    <UserImage source={imgUserIcon} />
                )}
                <UserNameCardRequest>{user.user_name}</UserNameCardRequest>
            </ContainerInfoUser>
        </CardUser>
    )
}

const ListFriends = ({ navigation }) => {
    const { friends, search_user } = useSelector(state => state.user);
    const [allFriends, setAllFriends] = useState([]);
    const [listFriends, setListFriends] = useState([]);

    useEffect(() => {
        const loadUserFriends = async () => {
            const allUserFriends = [];

            for(let id of friends){
                const userData = await userService.getUserProfile(id);
                allUserFriends.unshift(userData);
            }

            setAllFriends(allUserFriends);
            setListFriends(allUserFriends);
        }

        loadUserFriends()
    }, [friends])

    useEffect(() => {
        const regex = new RegExp(search_user, 'ig');
        const filterUsersBySearch = allFriends.filter(user => {
            const userMatchesSearch = user.user_name.match(regex) || user.name.match(regex);
            return userMatchesSearch
        })
        setListFriends(filterUsersBySearch);
    }, [search_user])

    return (
        <ContainerUsers
            contentContainerStyle={{
                paddingHorizontal: 20,
                paddingBottom: 100,
                alignItems: 'center'
            }}
        >
            {friends.length ? (
                listFriends.map(user => (
                    <RenderCard key={user?._id?.toString()} user={user} navigation={navigation} />
                ))
            ) : (
                <></>
            )}
        </ContainerUsers>
    )
}

export default ListFriends
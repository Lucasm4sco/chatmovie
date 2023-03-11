import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { ContainerUsers, CardUser, ContainerInfoUser, UserImage, UserNameCardRequest } from "./styles"
import userService from "../../services/userService";
import Requests from "../../utils/requestsAPI"

import imgUserIcon from '../../assets/icons/user.png'

const RenderCard = ({ navigation, id }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            const user = await userService.getUserProfile(id)
            setUser(user);
        }
        loadUser()
    }, [])

    if(!user)
        return null

    return (
        <CardUser>
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
    const { friends } = useSelector(state => state.user);

    return (
        <ContainerUsers
            contentContainerStyle={{
                paddingHorizontal: 20,
                paddingBottom: 100,
                alignItems: 'center'
            }}
        >
            {friends.length ? (
                friends.map(id => <RenderCard key={id} id={id} navigation={navigation} />)
            ) : (
                <></>
            )}
        </ContainerUsers>
    )
}

export default ListFriends
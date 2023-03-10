import { ContainerUsers, CardUser, ContainerInfoUser, UserImage, UserName } from "./styles"

import imgUserIcon from '../../assets/icons/user.png'

const ListFriends = () => {
    return (
        <ContainerUsers
            contentContainerStyle={{
                paddingHorizontal: 20,
                paddingBottom: 100,
                alignItems: 'center'
            }}
        >
            <CardUser>
                <ContainerInfoUser width='100'>
                    <UserImage source={imgUserIcon} />
                    <UserName>Qualquer_um</UserName>
                </ContainerInfoUser>
            </CardUser>
            <CardUser>
                <ContainerInfoUser width='100'>
                    <UserImage source={imgUserIcon} />
                    <UserName>Qualquer_outro</UserName>
                </ContainerInfoUser>
            </CardUser>
        </ContainerUsers>
    )
}

export default ListFriends
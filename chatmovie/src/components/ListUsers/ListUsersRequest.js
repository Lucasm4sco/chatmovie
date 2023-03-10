import { ContainerUsers, CardUserRequest, ContainerInfoUser, UserImage, UserNameCardRequest, ContainerButtons, ButtonAcionRequest, TextButtonAction } from "./styles"

import imgUserIcon from '../../assets/icons/user.png';

const ListUsersRequest = () => {
    return (
        <ContainerUsers
            contentContainerStyle={{
                paddingHorizontal: 20,
                paddingBottom: 100,
                alignItems: 'center'
            }}
        >
            <CardUserRequest>
                <ContainerInfoUser width='100' autoHeight>
                    <UserImage source={imgUserIcon} />
                    <UserNameCardRequest>
                        Lucasm4sco
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
        </ContainerUsers>
    )
}

export default ListUsersRequest
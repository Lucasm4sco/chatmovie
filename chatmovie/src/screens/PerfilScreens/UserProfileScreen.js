import { ButtonGoBack } from "./stylesEditPerfil";
import { Header } from "./stylesEditPerfil";
import { Container, LimitContainer, CoverImage, CenterContent, PerfilPicture, UserName, PerfilName, BioContainer } from "./styles";
import { AntDesign } from '@expo/vector-icons';
import Requests from "../../utils/requestsAPI";

import iconeUser from '../../assets/icons/user.png';

const UserProfileScreen = ({ navigation, route }) => {
    const { user } = route.params;

    const coverImage = user.cover_image ? {
        uri: Requests.getURLImage('capa', user.cover_image)
    } : ''
    const profilePicture = user.profile_picture ? {
        uri: Requests.getURLImage('perfil', user.profile_picture)
    } : iconeUser

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
            <Container
                contentContainerStyle={{
                    alignItems: 'center',
                    paddingTop: 5,
                    paddingBottom: 90
                }}
            >
                <LimitContainer>
                    <CoverImage
                        source={coverImage}
                    />
                    <CenterContent>
                        <PerfilPicture source={profilePicture} />
                    </CenterContent>
                    <PerfilName>{user.name}</PerfilName>
                    <UserName>{'@' + user.user_name}</UserName>
                    <BioContainer>
                        {user.bio ? user.bio : 'Nenhuma bio definida ainda.'}
                    </BioContainer>
                </LimitContainer>
            </Container>
        </>
    )
};

export default UserProfileScreen;
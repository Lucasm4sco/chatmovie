import { ButtonGoBack } from "./stylesEditPerfil";
import { Container, LimitContainer } from "./styles";
import { AntDesign } from '@expo/vector-icons';

const UserProfileScreen = ({ navigation }) => {
    return (
        <>
            <Header>
                <ButtonGoBack
                    activeOpacity={0.6}
                    underlayColor='rgba(204, 22, 22, 0.78)'
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="close" size={24} color="white" />
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

                </LimitContainer>
            </Container>
        </>
    )
};

export default UserProfileScreen;
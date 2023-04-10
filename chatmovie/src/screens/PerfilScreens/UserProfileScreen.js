import { useState, useEffect } from 'react';
import { ActivityIndicator as Spinner } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { ButtonGoBack } from "./stylesEditPerfil";
import { Container, LimitContainer, CoverImage, CenterContent, PerfilPicture, UserName, PerfilName, BioContainer, ContainerRow, Button, TextButton, TitleSection, WithoutMovies } from "./styles";
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Header } from "./stylesEditPerfil";
import ListMovieRow from '../../components/ListMovieRow';
import userService from '../../services/userService';
import Requests from "../../utils/requestsAPI";
import iconeUser from '../../assets/icons/user.png';
import movieService from '../../services/movieService';

const HandleStateUser = ({ user, navigation }) => {
    const { friends, friend_requests_sent, friend_requests } = useSelector(state => state.user);
    const isFriend = friends?.findIndex(id => id.toString() === user._id.toString()) !== -1;
    const friendRequestReceived = friend_requests?.findIndex(id => id.toString() === user._id.toString()) !== -1;
    const requestAlreadySentToUser = friend_requests_sent?.findIndex(id => id.toString() === user._id.toString()) !== -1;
    const dispatch = useDispatch();

    if (isFriend)
        return (
            <Button
                bgColor='red'
                onPress={() => navigation.navigate('Message', { user })}
            >
                <>
                    <TextButton>Mensagem</TextButton>
                    <MaterialCommunityIcons name="email-outline" size={24} color="white" />
                </>
            </Button>
        )

    if (friendRequestReceived)
        return (
            <>
                <Button bgColor='#252525'>
                    <>
                        <TextButton>
                            Rejeitar
                        </TextButton>
                    </>
                </Button>
                <Button bgColor='red'>
                    <>
                        <TextButton>
                            Aceitar
                        </TextButton>
                    </>
                </Button>
            </>
        )

    if (requestAlreadySentToUser)
        return (
            <Button bgColor='#000'>
                <>
                    <TextButton>Aguardando</TextButton>
                    <Feather name="clock" size={24} color="white" />
                </>
            </Button>
        )

    return (
        <Button bgColor='#133463'>
            <>
                <TextButton>Enviar solicitação</TextButton>
                <AntDesign name="adduser" size={24} color="white" />
            </>
        </Button>
    )
}

const UserProfileScreen = ({ navigation, route }) => {
    const { user } = route.params;
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [loading, setLoading] = useState(false)
    const coverImage = user.cover_image ? {
        uri: Requests.getURLImage('capa', user.cover_image)
    } : ''
    const profilePicture = user.profile_picture ? {
        uri: Requests.getURLImage('perfil', user.profile_picture)
    } : iconeUser

    useEffect(() => {
        const loadFavoriteMovies = async () => {
            setLoading(true);
            const movies = await userService.getFavoriteMovies(user._id.toString());

            for (let id_movie of movies?.movies) {
                const movieDetails = await movieService.getMovieDetails(id_movie);
                setFavoriteMovies(prev => [...prev, movieDetails])
            }

            setLoading(false);
        };

        loadFavoriteMovies()
    }, []);

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
                    <ContainerRow>
                        <HandleStateUser user={user} navigation={navigation} />
                    </ContainerRow>
                    <BioContainer>
                        {user.bio ? user.bio : 'Nenhuma bio definida ainda.'}
                    </BioContainer>
                    {loading ? (
                        <Spinner
                            style={{ margin: 20 }}
                            size="large"
                            color="red"
                            animating
                        />
                    ) : (
                        favoriteMovies.length && !favoriteMovies.errors ? (
                            <ListMovieRow
                                title='Filmes favoritos'
                                items={favoriteMovies}
                                isPoster
                            />
                        ) : (
                            <>
                                <TitleSection>Filmes favoritos:</TitleSection>
                                <WithoutMovies>Nenhum filme favoritado.</WithoutMovies>
                            </>
                        )
                    )}
                </LimitContainer>
            </Container>
        </>
    )
};

export default UserProfileScreen;
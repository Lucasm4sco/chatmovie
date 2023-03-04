import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useFocusEffect } from '@react-navigation/native';
import { getCurrentProfile, resetUpdate } from "../../slices/userSlice";
import { Container, CoverImage, LimitContainer, PerfilPicture, CenterContent, PerfilName, UserName, BioContainer, ContainerRow, Button, TextButton, TitleSection, WithoutMovies } from "./styles";
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import Requests from "../../utils/requestsAPI";

import iconeUser from '../../assets/icons/user.png';
import ListMovieRow from "../../components/ListMovieRow";
import LoadingComponent from '../../components/LoadingComponent';

const PerfilScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { user, loading, favorite_movies } = useSelector(state => state.user);
    const [coverImage, setCoverImage] = useState('');
    const [profilePicture, setProfilePicture] = useState(iconeUser);

    useEffect(() => {
        dispatch(getCurrentProfile());
    }, [dispatch])

    useEffect(() => {
        if (!user || !Object.keys(user).length)
            return

        if (user.cover_image)
            setCoverImage({
                uri: Requests.getURLImage('capa', user.cover_image)
            });

        if (user.profile_picture)
            setProfilePicture({
                uri: Requests.getURLImage('perfil', user.profile_picture)
            });

    }, [user])

    useFocusEffect(() => {
        dispatch(resetUpdate())
    })

    if (loading)
        return <LoadingComponent />

    return (
        <Container
            contentContainerStyle={{
                minHeight: '100%',
                justifyContent: 'center',
                padding: 5,
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
                <PerfilName>{user?.name}</PerfilName>
                <UserName>{'@' + user?.user_name}</UserName>
                <ContainerRow>
                    <Button
                        bgColor='#252525'
                        onPress={() => navigation.navigate('EditProfile', { user })}
                    >
                        <MaterialCommunityIcons name="account-edit-outline" size={24} color="white" />
                        <TextButton>Editar</TextButton>
                    </Button>
                    <Button
                        bgColor='#133463'
                    >
                        <Feather name="users" size={20} color="white" />
                        <TextButton>Amigos</TextButton>
                    </Button>
                </ContainerRow>
                <BioContainer editable={false}>
                    {user?.bio ? user.bio : 'Nenhuma bio definida ainda.'}
                </BioContainer>
                {favorite_movies.length ? (
                    <ListMovieRow
                        title='Filmes favoritos'
                        items={favorite_movies}
                        isPoster
                    />
                ) : (
                    <>
                        <TitleSection>Filmes favoritos:</TitleSection>
                        <WithoutMovies>Nenhum filme favoritado ainda.</WithoutMovies>
                    </>
                )}
            </LimitContainer>
        </Container>
    )
}

export default PerfilScreen
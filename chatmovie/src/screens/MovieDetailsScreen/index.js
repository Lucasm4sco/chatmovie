import { useEffect, useState, useMemo } from "react";
import { StatusBar, TouchableOpacity } from "react-native"
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL_IMAGE } from "../../utils/requestsAPI";
import { AntDesign } from '@expo/vector-icons';
import { addFavoriteMovie, removeFavoriteMovie } from "../../slices/userSlice";
import movieService from "../../services/movieService";

import { Container, ButtonFavorite, ImageMovie, TitleMovie, ContainerGenres, Genre, SubTitle, TextYearMovie, DescriptionMovie, ViewLimitContent, TextShowMore } from "./styles";

import LoadingComponent from "../../components/LoadingComponent";
import HeaderGoBack from "../../components/HeaderGoBack";
import ListMovieRow from "../../components/ListMovieRow";


const MovieDetailsScreen = ({ navigation, route }) => {
    const { id } = route.params;
    const { user, favorite_movies } = useSelector(state => state.user);
    const [loading, setLoading] = useState(false);
    const [movieDetails, setMovieDetails] = useState(null);
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [urlImage, setUrlImage] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const [numberOfLines, setNumberOfLines] = useState(3);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadDataMovie = async () => {
            setLoading(true);
            const movieDetails = await movieService.getMovieDetails(id);
            setMovieDetails(movieDetails);
            setLoading(false);
        }

        const loadDataRecommendedMovies = async () => {
            const recommendedMovies = await movieService.getRecommendedMovies(id);
            setRecommendedMovies(recommendedMovies);
        }

        loadDataMovie();
        loadDataRecommendedMovies();
        // reset number Of Lines when refreshing screen
        setNumberOfLines(3);
    }, [id])

    useEffect(() => {
        if (!movieDetails)
            return

        const urlImage = movieDetails.backdrop_path || movieDetails.poster_path;
        setUrlImage(`${BASE_URL_IMAGE}/original${urlImage}`);
    }, [movieDetails])

    const MemoizedLoadingComponent = useMemo(() =>
        <LoadingComponent style={{ paddingTop: StatusBar.currentHeight + 20 }} />
        , [])

    if (loading)
        return MemoizedLoadingComponent

    const handleTextLayout = ({ nativeEvent }) => setShowMore(nativeEvent.lines.length > 3)

    const handleShowMoreButton = () => numberOfLines === 3 ? setNumberOfLines(0) : setNumberOfLines(3)

    const handleFavoriteMovies = (id) => {
        const isAlreadyFavorite = favorite_movies.includes(id);

        if (isAlreadyFavorite)
            return dispatch(removeFavoriteMovie(id));

        dispatch(addFavoriteMovie(id));
    }

    return (
        <>
            <HeaderGoBack navigation={navigation} >
                {user && (
                    <ButtonFavorite
                        activeOpacity={0.6}
                        onPress={() => handleFavoriteMovies(movieDetails?.id)}
                    >
                        {favorite_movies.includes(movieDetails?.id) ? (
                            <AntDesign name="heart" size={24} color="white" />
                        ) : (
                            <AntDesign name="hearto" size={24} color="white" />
                        )}
                    </ButtonFavorite>
                )}
            </HeaderGoBack>
            <Container
                contentContainerStyle={{ alignItems: 'center' }}
            >

                <ImageMovie
                    source={{ uri: urlImage }}
                />
                <TitleMovie>{movieDetails?.name || movieDetails?.title}</TitleMovie>
                <ContainerGenres>
                    {movieDetails?.genres.map((genre) => (
                        <Genre key={genre.name}>{genre.name}</Genre>
                    ))}
                </ContainerGenres>
                <ViewLimitContent>
                    <SubTitle>Descrição</SubTitle>
                    {movieDetails?.release_date && (
                        <TextYearMovie>
                            {new Date(movieDetails.release_date).getFullYear()}
                        </TextYearMovie>
                    )}
                </ViewLimitContent>
                <DescriptionMovie
                    numberOfLines={numberOfLines}
                    onTextLayout={handleTextLayout}
                    textAlign={movieDetails?.overview ? 'justify' : 'center'}
                >
                    {movieDetails?.overview ? movieDetails.overview.trim() : 'Não foi encontrado descrição.'}
                </DescriptionMovie>
                {showMore && (
                    <ViewLimitContent>
                        <TouchableOpacity
                            onPress={handleShowMoreButton}
                        >
                            <TextShowMore>
                                {numberOfLines === 3 ? 'Ver mais' : 'Ver menos'}
                            </TextShowMore>
                        </TouchableOpacity>
                    </ViewLimitContent>
                )}
                <ListMovieRow
                    title='Filmes Recomendados'
                    items={recommendedMovies.results}
                    isPoster
                />
            </Container>
        </>
    )
}

export default MovieDetailsScreen
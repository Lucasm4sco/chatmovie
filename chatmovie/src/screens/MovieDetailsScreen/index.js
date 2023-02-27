import { useEffect, useState, useCallback } from "react";
import { StatusBar, TouchableOpacity } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetails, getRecommendedMovies } from "../../slices/movieSlice";
import { BASE_URL_IMAGE } from "../../utils/requestsAPI";

import { Container, ImageMovie, TitleMovie, ContainerGenres, Genre, SubTitle, TextYearMovie, DescriptionMovie, ViewLimitContent, TextShowMore } from "./styles";

import LoadingComponent from "../../components/LoadingComponent";
import HeaderGoBack from "../../components/HeaderGoBack";
import ListMovieRow from "../../components/ListMovieRow";

const MovieDetailsScreen = ({ navigation, route }) => {
    const [urlImage, setUrlImage] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const [numberOfLines, setNumberOfLines] = useState(3);
    const { id } = route.params;
    const { loadingDetails, movieDetails, recommendedMovies } = useSelector(state => state.movies);
    const dispatch = useDispatch();

    const MemoizedSkeletonContent = useCallback(() =>
        <LoadingComponent style={{ paddingTop: StatusBar.currentHeight + 20 }} />
        , [])

    useEffect(() => {
        setNumberOfLines(3);
        dispatch(getMovieDetails(id));
        dispatch(getRecommendedMovies(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (!movieDetails)
            return

        const urlImage = movieDetails.backdrop_path || movieDetails.poster_path;
        setUrlImage(`${BASE_URL_IMAGE}/original${urlImage}`);
    }, [movieDetails])

    if (loadingDetails)
        return <MemoizedSkeletonContent />

    const handleTextLayout = ({ nativeEvent }) => setShowMore(nativeEvent.lines.length > 3)

    const handleShowMoreButton = () => numberOfLines === 3 ? setNumberOfLines(0) : setNumberOfLines(3)

    return (
        <Container
            contentContainerStyle={{ alignItems: 'center' }}
        >
            <HeaderGoBack navigation={navigation} />
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
    )
}

export default MovieDetailsScreen
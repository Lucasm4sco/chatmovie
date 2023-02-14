import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomeList } from "../../slices/movieSlice";
import { FlatList, TouchableOpacity } from "react-native";

import { Container, CenterContent, ListMovieSection, TitleSection, ImageMovie } from "./styles";

import LoadingComponent from '../../components/LoadingComponent';
import CarouselComponent from "../../components/CarouselComponent";

const HomeScreen = () => {
    const [chooseTrendingMovies, setChooseTrendingMovies] = useState([]);
    const { movies, loading } = useSelector(state => state.movies);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHomeList());
    }, [dispatch]);

    useEffect(() => {
        if (!movies?.length)
            return

        const moviesArray = movies.filter(movie => movie.slug === 'trending')[0]?.items?.results || [];
        const choose = new Set();

        while (choose.size <= 5)
            choose.add(moviesArray[Math.floor(Math.random() * moviesArray.length)]);

        setChooseTrendingMovies([...choose])
    }, [movies]);

    if (loading)
        return <LoadingComponent />

    const renderItem = ({ item }) => {
        const urlImage = item.poster_path || item.backdrop_path;

        return (
            <TouchableOpacity
                activeOpacity={0.6}
            >
                <ImageMovie
                    source={{ uri: `https://image.tmdb.org/t/p/w500${urlImage}` }}
                />
            </TouchableOpacity>
        )
    }

    return (
        <Container>
            <CenterContent>
                <CarouselComponent movies={chooseTrendingMovies} />
            </CenterContent>
            {movies.map((movie, i) => (
                <ListMovieSection key={i}>
                    <TitleSection>{movie.title}</TitleSection>
                    <FlatList
                        horizontal
                        data={movie.items.results}
                        renderItem={renderItem}
                        keyExtractor={item => item.name || item.title}
                    />
                </ListMovieSection>
            ))}
        </Container>
    )
}

export default HomeScreen;
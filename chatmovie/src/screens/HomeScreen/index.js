import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomeList } from "../../slices/movieSlice";

import { Container, CenterContent } from "./styles";

import LoadingComponent from '../../components/LoadingComponent';
import CarouselComponent from "../../components/CarouselComponent";
import ListMovieRow from "../../components/ListMovieRow";

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

    return (
        <Container
            contentContainerStyle={{ paddingBottom: 100 }}
        >
            <CenterContent>
                <CarouselComponent movies={chooseTrendingMovies} />
            </CenterContent>
            {movies.map((movie, i) => (
                <ListMovieRow
                    key={i}
                    isPoster
                    title={movie.title}
                    items={movie.items.results}
                />
            ))}
        </Container>
    )
}

export default HomeScreen;
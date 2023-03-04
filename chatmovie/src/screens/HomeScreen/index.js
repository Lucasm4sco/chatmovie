import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentProfile } from '../../slices/userSlice';
import { useAuth } from '../../hooks/useAuth.js';
import { Container, CenterContent } from "./styles";
import movieService from "../../services/movieService";

import LoadingComponent from '../../components/LoadingComponent';
import CarouselComponent from "../../components/CarouselComponent";
import ListMovieRow from "../../components/ListMovieRow";

const HomeScreen = () => {
    const [chooseTrendingMovies, setChooseTrendingMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const { auth } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const dataMovies = await movieService.getHomeList();
            setLoading(false);
            setMovies(dataMovies);
        }
        loadData();
    }, []);

    useEffect(() => {
        if (auth)
            dispatch(getCurrentProfile())
    }, [auth])

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
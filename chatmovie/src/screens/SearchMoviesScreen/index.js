import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar as StatusBarConfig, ActivityIndicator as Spinner } from "react-native";
import { Container, ButtonGoBack, ContainerHeader, ViewLimitContent, SearchBar, SearchBarContainer, ButtonSearch, TitleQuery, TextRed, WithoutMovies } from "./styles";
import { getSearchMovies, reset, setQuerySearch } from "../../slices/movieSlice";
import { Feather, AntDesign } from '@expo/vector-icons';

import CardMovie from "../../components/CardMovie";

const SearchMoviesScreen = ({ navigation }) => {
    const [searchMovie, setSearchMovie] = useState('');
    const [query, setQuery] = useState('');

    const [withoutMovie, setWithoutMovie] = useState(false);
    const dispatch = useDispatch();
    const { search } = useSelector(state => state.movies);

    const navigationGoBack = () => {
        dispatch(reset());
        navigation.goBack();
    }

    const handleSearch = () => {
        const separateWords = searchMovie.split(' ');
        const filterWords = separateWords.filter(word => word !== '');
        const query = filterWords.join('+');
        setQuery(query);
    }

    useEffect(() => {
        if (!query)
            return

        dispatch(setQuerySearch(searchMovie.trim()));
        dispatch(getSearchMovies(query));
        setSearchMovie('');
    }, [query])

    useEffect(() => {
        if (!search.movies.results)
            return setWithoutMovie(false);

        setWithoutMovie(search.movies.results.length === 0);
    }, [search.movies]);

    return (
        <>
            <ContainerHeader paddingTop={StatusBarConfig.currentHeight}>
                <ButtonGoBack
                    activeOpacity={0.6}
                    onPress={navigationGoBack}
                >
                    <AntDesign name="arrowleft" size={28} color="white" />
                </ButtonGoBack>
            </ContainerHeader>
            <Container
                contentContainerStyle={{ alignItems: 'center' }}
            >
                <ViewLimitContent>
                    <SearchBarContainer>
                        <SearchBar
                            value={searchMovie || ''}
                            onChangeText={(text) => setSearchMovie(text)}
                            onSubmitEditing={handleSearch}
                            cursorColor='red'
                            selectionColor='#441a19'
                            inputMode='search'
                            autoFocus
                        />
                        <ButtonSearch
                            activyOpacity={0.6}
                            onPress={handleSearch}
                        >
                            <Feather name="search" size={24} color="white" />
                        </ButtonSearch>
                    </SearchBarContainer>
                    {search.query && <TitleQuery>Você pesquisou por: <TextRed>{search.query}</TextRed></TitleQuery>}
                    {search.loading && <Spinner
                        size="large"
                        color="red"
                        style={{marginVertical: 50}}
                        animating
                    />}
                    {search.movies.results?.map((movie, i) =>
                        <CardMovie key={i} movie={movie} navigation={navigation} />
                    )}
                    {withoutMovie &&
                        <WithoutMovies>Não foi encontrado resultado para sua pesquisa.</WithoutMovies>
                    }
                </ViewLimitContent>
            </Container>
        </>
    )
}

export default SearchMoviesScreen;
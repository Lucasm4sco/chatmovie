import { useState } from "react";
import { StatusBar as StatusBarConfig, ActivityIndicator as Spinner } from "react-native";
import { Container, ButtonGoBack, ContainerHeader, ViewLimitContent, SearchBar, SearchBarContainer, ButtonSearch, TitleQuery, TextRed, WithoutMovies } from "./styles";
import { Feather, AntDesign } from '@expo/vector-icons';
import movieService from "../../services/movieService";

import CardMovie from "../../components/CardMovie";

const SearchMoviesScreen = ({ navigation }) => {
    const [query, setQuery] = useState('');
    const [showQuery, setShowQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);

    const searchMovies = async (query) => {
        const movies = await movieService.getSearchMovies(query);
        return movies.results || [];
    }

    const handleSearch = async () => {
        if(!query)
            return

        setLoading(true);
        const separateWords = query.split(' ');
        const filterWords = separateWords.filter(word => word !== '');
        const formattedQuery = filterWords.join('+');
        
        const movies = await searchMovies(formattedQuery);
        setLoading(false);
        setShowQuery(query);
        setQuery('');
        setMovies(movies);
    }

    return (
        <>
            <ContainerHeader paddingTop={StatusBarConfig.currentHeight}>
                <ButtonGoBack
                    activeOpacity={0.6}
                    onPress={() => navigation.goBack()}
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
                            value={query || ''}
                            onChangeText={(text) => setQuery(text)}
                            onSubmitEditing={handleSearch}
                            cursorColor='red'
                            selectionColor='#441a19'
                            inputMode='search'
                            placeholder='Pesquisar por filmes...'
                            placeholderTextColor='#aaa'
                            autoFocus
                        />
                        <ButtonSearch
                            activyOpacity={0.6}
                            onPress={handleSearch}
                        >
                            <Feather name="search" size={24} color="white" />
                        </ButtonSearch>
                    </SearchBarContainer>
                    {showQuery && <TitleQuery>Você pesquisou por: <TextRed>{showQuery}</TextRed></TitleQuery>}
                    {loading && <Spinner
                        size="large"
                        color="red"
                        style={{marginVertical: 50}}
                        animating
                    />}
                    {movies.map((movie, i) =>
                        <CardMovie key={i} movie={movie} navigation={navigation} />
                    )}
                    {showQuery && movies.length === 0 &&
                        <WithoutMovies>Não foi encontrado resultado para sua pesquisa.</WithoutMovies>
                    }
                </ViewLimitContent>
            </Container>
        </>
    )
}

export default SearchMoviesScreen;
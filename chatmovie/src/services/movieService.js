import TMDB from "../data/tmdb";

const getHomeList = async () => {
    const listHome = await TMDB.getListHome();
    return listHome;
}

const getMovieDetails = async (id) => {
    const movieDetails = await TMDB.getDetails('movie', id);
    return movieDetails;
}

const getRecommendedMovies = async (id) => {
    const recommendedMovies = await TMDB.getRecommended('movie', id);
    return recommendedMovies;
}

const getSearchMovies = async(query) => {
    const foundMovies = await TMDB.getSearch('movie', query);
    return foundMovies;
}

const movieService = {
    getHomeList,
    getMovieDetails,
    getRecommendedMovies,
    getSearchMovies
}

export default movieService;
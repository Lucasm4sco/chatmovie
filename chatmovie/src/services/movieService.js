import Requests from "../utils/requestsAPI";

const getHomeList = async () => {
    const listHome = await Requests.makeGET('movies');
    return listHome;
}

const getMovieDetails = async (id) => {
    const movieDetails = await Requests.makeGET('movies', '/' + id);
    return movieDetails;
}

const getRecommendedMovies = async (id) => {
    const recommendedMovies = await Requests.makeGET('movies', '/' + id + '/recommendations');
    return recommendedMovies;
}

const movieService = {
    getHomeList,
    getMovieDetails,
    getRecommendedMovies
}

export default movieService;
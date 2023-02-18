import { getListHome, getDetails, getRecommended, getSearch } from "../data/tmdb.js";

const getMoviesHome = async (req, res) => {
    try {
        const listHome = await getListHome();
        return res.status(200).json(listHome);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ errors: ['Não foi possível completar a requisição'] });
    }
}

const getDetailsMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const isNumber = !isNaN(Number(id));

        if (!isNumber)
            return res.status(400).json({ errors: ['Solicitação inválida.'] });

        const dataMovie = await getDetails('movie', id);
        return res.status(200).json(dataMovie);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ errors: ['Não foi possível completar a requisição'] });
    }
}

const getRecommendedMovies = async (req, res) => {
    try {
        const { id } = req.params;
        const isNumber = !isNaN(Number(id));

        if (!isNumber)
            return res.status(400).json({ errors: ['Solicitação inválida.'] });

        const dataMovie = await getRecommended('movie', id);
        return res.status(200).json(dataMovie);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ errors: ['Não foi possível completar a requisição'] });
    }
}

const getSearchMovie = async (req, res) => {
    try {
        const { query } = req.query;

        if(!query)
            return res.status(400).json({ errors: ['Solicitação inválida.'] });

        const dataSeach = await getSearch('movie', query);
        return res.status(200).json(dataSeach);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ errors: ['Não foi possível completar a requisição'] });
    }
}

const MovieController = {
    getMoviesHome,
    getDetailsMovie,
    getRecommendedMovies,
    getSearchMovie
}

export default MovieController;
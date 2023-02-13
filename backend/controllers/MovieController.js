import { getListHome } from "../data/tmdb.js";

const getMoviesHome = async (req, res) => {
    try {
        const listHome = await getListHome();
        return res.status(200).json(listHome);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({errors: ['Não foi possível completar a requisição']});
    }
}


const MovieController = {
    getMoviesHome
}

export default MovieController;
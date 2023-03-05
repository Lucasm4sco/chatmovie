import { makeRequestTMDB } from "../utils/requestsAPI.js";

const getListHome = async () => {
    return [
        {
            slug: 'toprated',
            title: 'Mais votados',
            items: await makeRequestTMDB('/movie/top_rated')
        },
        {
            slug: 'trending',
            title: 'Em Alta',
            items: await makeRequestTMDB('/trending/movie/week')
        },
        {
            slug: 'action',
            title: 'Ação',
            items: await makeRequestTMDB('/discover/movie', 'with_genres=28')
        },
        {
            slug: 'comedy',
            title: 'Comédia',
            items: await makeRequestTMDB('/discover/movie', 'with_genres=35')
        },
        {
            slug: 'horror',
            title: 'Terror',
            items: await makeRequestTMDB('/discover/movie', 'with_genres=27')
        },
        {
            slug: 'romance',
            title: 'Romance',
            items: await makeRequestTMDB('/discover/movie', 'with_genres=10749')
        },
        {
            slug: 'documentary',
            title: 'Documentários',
            items: await makeRequestTMDB('/discover/movie', 'with_genres=99')
        }
    ]
}

const getDetails = async (type, id) => {
    const data = await makeRequestTMDB(`/${type}/${id}`);
    return data;
}

const getRecommended = async (type, id) => {
    const recommended = await makeRequestTMDB(`/${type}/${id}/recommendations`);
    return recommended;
}

const getSearch = async (type, query) => {
    const dataSearch = await makeRequestTMDB(`/search/${type}`, 'query=' + query);
    return dataSearch;
}

const TMDB = {
    getListHome,
    getDetails,
    getRecommended,
    getSearch
}

export default TMDB
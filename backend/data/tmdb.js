import { makeRequestTMDB } from "../utils/request.js";

export const getListHome = async () => {
    return [
        {
            slug: 'toprated',
            title: 'Mais votados',
            items: await makeRequestTMDB('/movie/top_rated')
        },
        {
            slug: 'trending',
            title: 'Em Alta',
            items: await makeRequestTMDB('/trending/all/week')
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
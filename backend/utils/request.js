import fetch from 'node-fetch';
import * as dotenv from 'dotenv';

globalThis.fetch = fetch;
dotenv.config();

const URL_BASE = "https://api.themoviedb.org/3";
const API_KEY_TMDB = process.env.API_KEY_TMDB;

export const makeRequestTMDB = async (path, filter = '') => {
    if (filter)
        filter += '&'

    const URL = `${URL_BASE}${path}?${filter}language=pt-BR&api_key=${API_KEY_TMDB}`;

    return await fetch(URL)
        .then(res => res.json())
        .catch(err => err);
}
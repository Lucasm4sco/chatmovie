import axios from 'axios';
import { getToken } from './storage.js';
import { API_KEY_TMDB } from '@env';

export const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p';
const BASE_URL = 'http://192.168.2.199:5000';
const BASE_URL_TMBD = "https://api.themoviedb.org/3";
const REQUESTS_ENDPOINTS = {
    users: '/api/users',
    movies: '/api/movies'
}

export const makeRequestTMDB = async (path, filter = '') => {
    if (filter)
        filter += '&'

    const URL = `${BASE_URL_TMBD}${path}?${filter}language=pt-BR&api_key=${API_KEY_TMDB}`;

    return await axios.get(URL)
        .then(res => res.data)
        .catch(err => err.response.data);
}

const makeGET = async (type, endpoint = '', config = {}) => {
    const data = await axios.get(BASE_URL + REQUESTS_ENDPOINTS[type] + endpoint, config)
        .then(response => response.data)
        .catch(err => err.response.data);

    return data;
}

const makePOST = async (type, endpoint = '', data, config = {}) => {
    const response = await axios.post(BASE_URL + REQUESTS_ENDPOINTS[type] + endpoint, data, config)
        .then(response => response.data)
        .catch(err => err.response.data);

    return response
}

const makePUT = async (type, endpoint = '', data, config = {}) => {
    const response = await axios.put(BASE_URL + REQUESTS_ENDPOINTS[type] + endpoint, data, config)
        .then(response => response.data)
        .catch(err => err.response.data);

    return response;
}

const getURLImage = (type, endpoint) => `${BASE_URL}/${type}/${endpoint}`

const getHeaderWithAuthorization = async () => {
    const bearer_token = `Bearer ${await getToken()}`
    const headers = { Authorization: bearer_token };
    return headers
}

const Requests = {
    makeGET,
    makePOST,
    makePUT,
    getURLImage,
    getHeaderWithAuthorization
}

export default Requests;
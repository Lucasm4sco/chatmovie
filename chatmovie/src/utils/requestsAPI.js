import axios from 'axios';
import { getToken } from './storage.js';

export const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p';
const BASE_URL = 'http://192.168.2.199:5000';
const REQUESTS_ENDPOINTS = {
    users: '/api/users',
    movies: '/api/movies'
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
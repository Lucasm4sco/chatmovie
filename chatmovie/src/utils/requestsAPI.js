import axios from 'axios';

export const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p';
const BASE_URL = 'http://192.168.2.199:5000';
const REQUESTS_ENDPOINTS = {
    users: '/api/users',
    movies: '/api/movies'
}

const makeGET = async (type, endpoint = '') => {
    const data = await axios.get(BASE_URL + REQUESTS_ENDPOINTS[type] + endpoint)
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

const Requests = {
    makeGET,
    makePOST
}

export default Requests;
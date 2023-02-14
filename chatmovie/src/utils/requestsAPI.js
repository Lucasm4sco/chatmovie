import axios from 'axios';

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

const Requests = {
    makeGET
}

export default Requests;
import Requests from '../utils/requestsAPI';
import { getData } from '../utils/storage';

const getDataStorage = async () => {
    return await getData('user');
}

const Register = async (data) => {
    const response = await Requests.makePOST('users', '/register', data);
    return response
}

const Login = async(data) => {
    const response = await Requests.makePOST('users', '/login', data);
    return response
}

const authService = {
    getDataStorage,
    Register,
    Login
}

export default authService;
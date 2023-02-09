import { getData } from '../utils/storage';

const getDataStorage  = async () => {
    return await getData();
}

const authService = {
    getDataStorage
}

export default authService;
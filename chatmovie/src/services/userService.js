import Requests from "../utils/requestsAPI";

const getCurrentProfile = async (id) => {
    const userData = await Requests.makeGET('users', '/profile', {
        headers: await Requests.getHeaderWithAuthorization()
    });
    return userData;
}

const updateUserProfile = async (data) => {
    const headers = await Requests.getHeaderWithAuthorization();
    headers['Content-Type'] = 'multipart/form-data';
    const userData = await Requests.makePUT('users', '/profile', data, { headers });
    return userData;
}

const getFavoriteMovies = async (id, page = 1) => {
    const endpoint = `/${id}/movies?page=${page}`
    const favorite_movies = await Requests.makeGET('users', endpoint, {
        headers: await Requests.getHeaderWithAuthorization()
    })
    return favorite_movies;
}

const getFriends = async () => {
    const friendsData = await Requests.makeGET('users', '/friends', {
        headers: await Requests.getHeaderWithAuthorization()
    });
    return friendsData
}

const userService = {
    getCurrentProfile,
    updateUserProfile,
    getFavoriteMovies,
    getFriends
};

export default userService;
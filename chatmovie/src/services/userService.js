import Requests from "../utils/requestsAPI";

const getCurrentProfile = async (id) => {
    const userData = await Requests.makeGET('users', '/profile', { 
        headers: await Requests.getHeaderWithAuthorization() 
    });
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
    getFavoriteMovies,
    getFriends
};

export default userService;
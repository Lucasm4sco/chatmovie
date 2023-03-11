import Requests from "../utils/requestsAPI";

const getCurrentProfile = async () => {
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

const sendFriendRequest = async (id) => {
    const friendsData = await Requests.makePOST('users', '/friends', {
        id_recipient_user: id
    }, {
        headers: await Requests.getHeaderWithAuthorization()
    });
    return friendsData
}

const getListUsers = async () => {
    const listUsers = await Requests.makeGET('users', '/', {
        headers: await Requests.getHeaderWithAuthorization()
    });
    return listUsers
}

const getUserProfile = async (id) => {
    const userProfile = await Requests.makeGET('users', '/' + id, {
        headers: await Requests.getHeaderWithAuthorization()
    })
    return userProfile;
}

const userService = {
    getCurrentProfile,
    updateUserProfile,
    getFavoriteMovies,
    getFriends,
    sendFriendRequest,
    getListUsers,
    getUserProfile
};

export default userService;
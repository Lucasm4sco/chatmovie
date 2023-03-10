import Requests from "../utils/requestsAPI";

const getUserProfile = async (id) => {
    const userProfile = await Requests.makeGET('users', '/' + id, {
        headers: await Requests.getHeaderWithAuthorization()
    })

    return userProfile;
}

const profilesService = {
    getUserProfile
}

export default profilesService;
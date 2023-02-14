import Requests from "../utils/requestsAPI";

const getHomeList = async () => {
    const listHome = await Requests.makeGET('movies');
    return listHome;
}

const movieService = {
    getHomeList
}

export default movieService;
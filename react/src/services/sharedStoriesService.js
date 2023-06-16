import axios from "axios";

const addStory = (payload) => {
    const config = {
        method: "POST",
        url: "https://api.remotebootcamp.dev/api/entities/stories",
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-type": "application/json" }
    };
    return axios(config).then((response) => {
        return {
            id: response.data.item,
            ...payload,
        };
    });
};

const editStory = (id, payload) => {
    const config = {
        method: "PUT",
        url: `https://api.remotebootcamp.dev/api/entities/stories/${id}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-type": "application/json" }
    };
    return axios(config);
}

const getStory = (id) => {
    const config = {
        method: "GET",
        url: `https://api.remotebootcamp.dev/api/entities/stories/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-type": "application/json" }
    };
    return axios(config);
}

const getStories = () => {
    const config = {
        method: "GET",
        url: "https://api.remotebootcamp.dev/api/entities/stories",
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-type": "applicaton/json" }
    };
    return axios(config);

}

const sharedStoryService = { addStory, editStory, getStory, getStories };
export default sharedStoryService;
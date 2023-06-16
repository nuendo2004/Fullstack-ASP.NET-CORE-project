import axios from "axios"; 
import { API_HOST_PREFIX, onGlobalSuccess, onGlobalError } from "./serviceHelpers";

const endpoint = `${API_HOST_PREFIX}/api/actors`
const endpoint2 = `${API_HOST_PREFIX}/api/actorsbatch`

const addActor = (payload) => {
    const config = {
        method: "POST", 
        url: endpoint,
        data: payload, 
        withCredentials: true, 
        crossdomain: true, 
        headers: {
            "Content-Type": "application/json"
        },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAllActors = () => {
    const config = {
        method: "GET", 
        url: endpoint,
        withCredentials: true, 
        crossdomain: true, 
        headers: {
            "Content-Type": "application/json"
        },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getPaginatedActors = (pageIndex) => {
    const config = {
        method: "GET", 
        url: `${endpoint2}/paginate?pageIndex=${pageIndex}&pageSize=3`,
        withCredentials: true, 
        crossdomain: true, 
        headers: {
            "Content-Type": "application/json"
        },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
}

const updateActor = (payload, id) => {
    const config = {
        method: "PUT", 
        url: `${endpoint}/${id}`,
        data: payload, 
        withCredentials: true, 
        crossdomain: true, 
        header: {
            "Content-Type": "application/json"
        }, 
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
}

const deleteActor = (id, modifier) => {
    const config = {
        method: "DELETE", 
        url: `${endpoint}/${id}`,
        data: modifier,
        withCredentials: true,
        crossdomain: true, 
        header: {
            "Content-Type": "application/json"
        },        
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
}

const searchByCreator = (pageIndex, creator) => {
    const config = {
        method: "GET", 
        url: `${endpoint2}/search?pageIndex=${pageIndex}&pageSize=3&creator=${creator}`,
        withCredentials: true, 
        crossdomain: true, 
        headers: {
            "Content-Type": "application/json"
        },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
}

const searchByActorName = (pageIndex, actorName) => {
    const config = {
        method: "GET", 
        url: `${endpoint2}/search?pageIndex=${pageIndex}&pageSize=3&actorName=${actorName}`,
        withCredentials: true, 
        crossdomain: true, 
        headers: {
            "Content-Type": "application/json"
        },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
}


const actorsEditService = {
    addActor,
    getAllActors,
    updateActor,
    deleteActor,
    getPaginatedActors,
    searchByCreator,
    searchByActorName,
}

export default actorsEditService;
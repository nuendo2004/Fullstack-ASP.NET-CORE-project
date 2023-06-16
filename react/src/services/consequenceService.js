import axios from "axios";
import {
    API_HOST_PREFIX,
    onGlobalSuccess,
    onGlobalError,
} from "./serviceHelpers";

const endpoint = `${API_HOST_PREFIX}/api/consequences`;

let addConsequence = (payload) =>{
    const config={
        method : "POST",
        url: endpoint,
        data: payload,
        withCredentials: true, 
        crossdomain: true, 
        headers: {"Content-Type": "application/json"},
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError)
};

const updateConsequence = (id, payload) =>{
    const config = {
        method: "PUT", 
        url: endpoint + `/${id}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: {"Content-Type": "application/json"},
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError)
}

const paginateConsequences = (pageIndex, pageSize)=>{
    const config = {
        method: "GET", 
        url: endpoint + `/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        withCredentials: true, 
        crossdomain: true,
        headers: {"Content-Type":"application/json"}
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError)
};

const getConsequenceByZoneId=(zoneId)=>{
    const config = {
        method: "GET",
        url: `${endpoint}/zone/${zoneId}`,
        withCredentials: true,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError)
}

const consequenceService = {addConsequence, updateConsequence, paginateConsequences, getConsequenceByZoneId};
export default consequenceService;

import axios from "axios";
import { onGlobalError, onGlobalSuccess,API_HOST_PREFIX } from "./serviceHelpers";

const addActorAccount =(payload)=>{
    const config = {
        method:"POST",
        url: `${API_HOST_PREFIX}/api/actoraccounts`,
        data: payload,
        withCredentials: true,
        crossdomain : true,
        headers: { "Content-Type": "application/json" },
    }
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
}

const getAllActors =()=>{
    const config = {
        method:"GET",
        url: `${API_HOST_PREFIX}/api/actors/`,
        withCredentials: true,
        crossdomain : true,
        headers: { "Content-Type": "application/json" },
    }
    return axios(config).then(onGlobalSuccess).catch(onGlobalError)
}

const actorAccountService = { addActorAccount, getAllActors}
export default actorAccountService;
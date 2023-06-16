import axios from "axios";
import { API_HOST_PREFIX, onGlobalSuccess, onGlobalError } from "./serviceHelpers";

const endpoint  = `${API_HOST_PREFIX}/api/actorsbatch`

const actorBatchAdd = (payload) => {    
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

const lokiActorService = {
    actorBatchAdd,
}

export default lokiActorService;
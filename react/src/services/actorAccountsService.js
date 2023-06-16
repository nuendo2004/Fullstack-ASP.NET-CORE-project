import axios from "axios";
import {
    API_HOST_PREFIX,
    onGlobalSuccess,
    onGlobalError,
} from "./serviceHelpers";

const endpoint = `${API_HOST_PREFIX}/api/actoraccounts`;

const getAcocuntByZoneId = (zoneId) => {
    const config={
        method : "GET",
        url: `${endpoint}/zone/${zoneId}`,
        withCredentials: true,
        crossdomain: true,
        header: {"Content-Type": "application/json"},
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError)
};

const actorAccountsService = {getAcocuntByZoneId}

export default actorAccountsService;
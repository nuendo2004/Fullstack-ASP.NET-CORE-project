import axios from "axios";
import {
  API_HOST_PREFIX,
  onGlobalError,
  onGlobalSuccess,
} from "./serviceHelpers";

const endpoint = `${API_HOST_PREFIX}/api/newsletters`;

const getPaged = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let getSearch = (pageIndex, pageSize, searchQuery) => {
  const config = {
    method: "GET",
    url: `${endpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${searchQuery}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "content-type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const newsletterService = { getPaged, getSearch };
export default newsletterService;

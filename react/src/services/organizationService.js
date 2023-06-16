import axios from "axios";
import {
  API_HOST_PREFIX,
  onGlobalError,
  onGlobalSuccess,
} from "./serviceHelpers";

const endpoint = `${API_HOST_PREFIX}/api/organizations`;

const getAll = () => {
  const config = {
    method: "GET",
    url: `${endpoint}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getById = (id) => {
  const config = {
    method: "GET",
    url: `${endpoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const add = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint}`,
    withCredentials: true,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const addV2 = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint}/v2`,
    withCredentials: true,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const GetOrgByCurrentUser = () => {
  const config = {
    method: "GET",
    url: `${endpoint}/"orgLookUp"`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const organizationByUserId = (id) => {
  const config = {
    method: "GET",
    url: `${endpoint}/user?pageIndex=0&pageSize=5&userId=${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getTotalUsers = () => {
  const config = {
    method: "GET",
    url: `${endpoint}/totalUsers`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getTotalTrainees = () => {
  const config = {
    method: "GET",
    url: `${endpoint}/totalTrainees`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const organizationsService = {
  getAll,
  add,
  addV2,
  organizationByUserId,
  GetOrgByCurrentUser,
  getById,
  getTotalUsers,
  getTotalTrainees,
};

export default organizationsService;

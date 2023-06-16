import axios from "axios";
import {
  API_HOST_PREFIX,
  onGlobalSuccess,
  onGlobalError,
} from "./serviceHelpers";

const endpoint = `${API_HOST_PREFIX}/api/traineeaccounts`;

let getAllTraineeAccounts = () => {
  const config = {
    method: "GET",
    url: endpoint,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let getTraineeAccountDropdowns = () => {
  const config = {
    method: "GET",
    url: `${endpoint}/dropdowns`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let getTraineeAccountsById = (id) => {
  const config = {
    method: "GET",
    url: `${endpoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let getTraineeAccountsTraineeId = (pageIndex, pageSize, traineeId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/traineeid?pageIndex=${pageIndex}&pageSize=${pageSize}&traineeId=${traineeId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let getTraineeAccountsByTraineeIdandZoneId = (traineeId, zoneId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/traineeid/${traineeId}/zoneid/${zoneId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let getTraineeAccountsZoneIdPaged = (pageIndex, pageSize, zoneId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/zoneid?pageIndex=${pageIndex}&pageSize=${pageSize}&zoneId=${zoneId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let getTraineeAccountsZoneId = (zoneId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/zoneid/${zoneId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let searchTraineeAccounts = (pageIndex, pageSize, zoneId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/zoneid?pageIndex=${pageIndex}&pageSize=${pageSize}&zoneId=${zoneId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let addTraineeAccount = (payload) => {
  const config = {
    method: "POST",
    url: endpoint,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let updateTraineeAccountUsername = (payload) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/username`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let updateTraineeAccountStatus = (payload) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/status`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let updateTraineeAccountAvatar = (payload) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/avatar`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const updateTraineeAccountPassword = (payload) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/recover`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const loginTraineeAccount = (payload) => {
  const config = {
    method: "POST",
    data: payload,
    url: `${endpoint}/login`,
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getTraineeAccountByUserIdAndZoneId = (zoneId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/${zoneId}/username`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export {
  loginTraineeAccount,
  getAllTraineeAccounts,
  getTraineeAccountDropdowns,
  getTraineeAccountsById,
  getTraineeAccountsTraineeId,
  getTraineeAccountsByTraineeIdandZoneId,
  getTraineeAccountsZoneIdPaged,
  getTraineeAccountsZoneId,
  searchTraineeAccounts,
  addTraineeAccount,
  updateTraineeAccountUsername,
  updateTraineeAccountStatus,
  updateTraineeAccountAvatar,
  updateTraineeAccountPassword,
  getTraineeAccountByUserIdAndZoneId,
};

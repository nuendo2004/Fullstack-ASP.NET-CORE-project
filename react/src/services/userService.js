import axios from "axios";
import * as helper from "./serviceHelpers";
import sabioDebug from "sabio-debug";

const endpoint = `${helper.API_HOST_PREFIX}/api/users`;

const _logger = sabioDebug.extend("userService");

const registerNewUser = (payload) => {
  _logger("registerNewUser is executing", payload);
  const config = {
    method: "POST",
    data: payload,
    url: endpoint,
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const loginUser = (payload) => {
  _logger("loginUser is executing", payload);
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
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const currentUser = () => {
  _logger("currentUser is executing");
  const config = {
    method: "GET",
    url: `${endpoint}/current`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getUserById = (id) => {
  _logger("getUserById executing", id);
  const config = {
    method: "GET",
    url: `${endpoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const logoutUser = () => {
  _logger("logoutUser executing");
  const config = {
    method: "GET",
    url: `${endpoint}/logout`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const confirmUser = (token, email) => {
  _logger("confirmUser executing", token, email);
  const config = {
    method: "PUT",
    url: `${endpoint}/confirm?token=${token}&email=${email}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const forgotPassword = (payload) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/forgot`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const changePassword = (payload) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/changepassword`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const changeOrg = (orgId) => {
  const config = {
    method: "POST",
    url: `${endpoint}/changeorg?orgId=${orgId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const changeTrainee = (traineeId) => {
  _logger("changeTrainee is executing", traineeId);
  const config = {
    method: "POST",
    url: `${endpoint}/changetrainee?traineeId=${traineeId}`,
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getStatusTotals = () => {
  _logger("getStatusTotals running");
  const config = {
    method: "GET",
    url: `${endpoint}/status/totals`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getStatusOverTime = () => {
  _logger("getStatusOverTime running");
  const config = {
    method: "GET",
    url: `${endpoint}/status/overTime`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};
const allUsersPaginated = (pageIndex, pageSize) => {
  _logger("allUsers executing");
  const config = {
    method: "GET",
    url: `${endpoint}/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getAll = () => {
  _logger("getAll executing");
  const config = {
    method: "GET",
    url: `${endpoint}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}

const userService = {
  registerNewUser,
  loginUser,
  currentUser,
  getUserById,
  logoutUser,
  confirmUser,
  forgotPassword,
  changePassword,
  changeOrg,
  getStatusTotals,
  getStatusOverTime,
  changeTrainee,
  allUsersPaginated,
  getAll
};
export default userService;

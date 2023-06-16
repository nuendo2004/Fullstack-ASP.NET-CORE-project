import axios from "axios";
import {
  API_HOST_PREFIX,
  onGlobalError,
  onGlobalSuccess,
} from "./serviceHelpers";
import debug from "sabio-debug";
const _logger = debug.extend("demoAccountsService");

const endpoint = `${API_HOST_PREFIX}/api/demoaccounts`;

const getActive = () => {
  _logger("getActive is running");
  const config = {
    method: "GET",
    url: `${endpoint}/active`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const createAccount = (payload) => {
  _logger("Create account is running");
  const config = {
    method: "POST",
    data: payload,
    url: `${endpoint}?toEmail=${payload}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getDemoByUserId = (createdBy) => {
  _logger("Get account is running");
  const config = {
    method: "GET",
    data: createdBy,
    url: `${endpoint}/userId/${createdBy}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const demoAccountsService = {
  getActive,
  createAccount,
  getDemoByUserId,
};

export default demoAccountsService;

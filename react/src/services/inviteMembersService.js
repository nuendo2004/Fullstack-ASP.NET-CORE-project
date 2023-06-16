import axios from "axios";
import {
  onGlobalError,
  onGlobalSuccess,
  API_HOST_PREFIX,
} from "./serviceHelpers";

const endpoint = { inviteMemberUrl: `${API_HOST_PREFIX}/api/invitemembers` };

const signUpMember = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint.inviteMemberUrl}/signup`,
    data: payload,
    withCredentials: true,
    crossDomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getPendingOverTime = () => {
  const config = {
    method: "GET",
    url: `${endpoint.inviteMemberUrl}/status/overTime`,
    withCredentials: true,
    crossDomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const inviteMemberService = {
  signUpMember,
  getPendingOverTime,
};

export default inviteMemberService;

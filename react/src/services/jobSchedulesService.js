import axios from "axios";
import {
  API_HOST_PREFIX,
  onGlobalSuccess,
  onGlobalError,
} from "./serviceHelpers";

const addJobSchedule = (payload) => {
  const config = {
    method: "POST",
    url: `${API_HOST_PREFIX}/api/jobschedules`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const updateJobSchedule = (payload, id) => {
  const config = {
    method: "PUT",
    url: `${API_HOST_PREFIX}/api/jobschedules/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAllJobs = () => {
  const config = {
    method: "GET",
    url: `${API_HOST_PREFIX}/api/jobschedules`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const chronJobService = { addJobSchedule, updateJobSchedule, getAllJobs };

export default chronJobService;

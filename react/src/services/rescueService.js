import axios from "axios";
import {
  API_HOST_PREFIX,
  onGlobalError,
  onGlobalSuccess,
} from "./serviceHelpers";

const endpoint = `${API_HOST_PREFIX}/api/rescue`;

const addRescueReport = (payload) => {
  const config = {
    method: "POST",
    url: endpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getReportByTraineeId = (pageIndex, pageSize, id) => {
  const config = {
    method: "GET",
    url: `${endpoint}/trainee/${id}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossDomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const rescueService = { addRescueReport, getReportByTraineeId };
export default rescueService;

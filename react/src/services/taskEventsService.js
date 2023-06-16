import axios from "axios";
import * as helper from "./serviceHelpers";

const endpoint = `${helper.API_HOST_PREFIX}/api/taskevents`;

const createNewTaskEvent = (payload) => {
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

const getAll = () => {
  const config = {
    method: "GET",
    url: endpoint,
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getPaged = (pageIndex) => {
  const config = {
    method: "GET",
    url: `${endpoint}/paginate?pageIndex=${pageIndex}&pageSize=4`,
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getWinLossDrawRecord = (entityId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/record/${entityId}`,
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const taskEventsService = {
  createNewTaskEvent,
  getAll,
  getPaged,
  getWinLossDrawRecord,
};
export default taskEventsService;

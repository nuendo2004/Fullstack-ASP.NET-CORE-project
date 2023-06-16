import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
} from "./serviceHelpers";

let getAccessLogs = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${API_HOST_PREFIX}/api/accesslogs/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let insertAccessLogs = (formData) => {
  const config = {
    method: "POST",
    url: `${API_HOST_PREFIX}/api/accesslogs`,
    data: formData,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let getAccessLogsByDate = (pageIndex, pageSize, startDate, endDate) => {
  const config = {
    method: "GET",
    url: `${API_HOST_PREFIX}/api/accesslogs/dated?pageIndex=${pageIndex}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let searchAccessLogs = (pageIndex, pageSize, query) => {
  const config = {
    method: "GET",
    url: `${API_HOST_PREFIX}/api/accesslogs/search?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let getAccessLogsByEntityOrAccess = (
  pageIndex,
  pageSize,
  entityTypeId,
  accessStatusId
) => {
  const config = {
    method: "GET",
    url: `${API_HOST_PREFIX}/api/accesslogs/entityaccess?pageIndex=${pageIndex}&pageSize=${pageSize}&entitytypeid=${entityTypeId}&accessstatusid=${accessStatusId}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let logActivity = (payload) => {
  const config = {
    method: "POST",
    url: `${API_HOST_PREFIX}/api/accesslogs/log`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const accessLogsService = {
  getAccessLogs,
  getAccessLogsByDate,
  searchAccessLogs,
  getAccessLogsByEntityOrAccess,
  insertAccessLogs,
};

export { logActivity };

export default accessLogsService;

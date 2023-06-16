import axios from "axios";
import {
  API_HOST_PREFIX,
  onGlobalSuccess,
  onGlobalError,
} from "./serviceHelpers";

const endpoint = `${API_HOST_PREFIX}/api/zonegroups`;

let addZoneGroup = (payload) => {
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

let updateZoneGroup = (payload, id) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getZoneGroupById = (id) => {
  const config = {
    method: "GET",
    url: `${endpoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getZoneGroupByZoneId = (pageIndex, pageSize, zoneId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/paginatebyzoneid/?pageIndex=${pageIndex}&pageSize=${pageSize}&zoneId=${zoneId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const searchZoneGroupByZoneId = (pageIndex, pageSize, zoneId, query) => {
  const config = {
    method: "GET",
    url: `${endpoint}/searchpaginatebyzoneid/?pageIndex=${pageIndex}&pageSize=${pageSize}&zoneId=${zoneId}&query=${query}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const zoneGroupService = {
  addZoneGroup,
  updateZoneGroup,
  getZoneGroupById,
  getZoneGroupByZoneId,
  searchZoneGroupByZoneId,
};
export default zoneGroupService;

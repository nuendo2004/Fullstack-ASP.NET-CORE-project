import axios from "axios";
import * as helper from "./serviceHelpers";
import debug from "sabio-debug";
const _logger = debug.extend("zonesService");
const endpoint = `${helper.API_HOST_PREFIX}/api/zones/`;

let addZone = (payload) => {
  const config = {
    method: "POST",
    url: endpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

let getZoneById = (id) => {
  const config = {
    method: "GET",
    url: `${endpoint}${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updateZone = (payload, id) => {
  const config = {
    method: "PUT",
    url: `${endpoint}${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updateZoneStatus = (id, newStatus) => {
  const config = {
    method: "PUT",
    url: `${endpoint}${id}/status/${newStatus}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const deleteZone = (id) => {
  const config = {
    method: "DELETE",
    url: `${endpoint}${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

let getZoneByStatusPaged = (statusId, pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}status/${statusId}/paged?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

let getZoneByStatus = (statusId) => {
  const config = {
    method: "GET",
    url: `${endpoint}status/${statusId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getZoneByType = (typeId, pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}type/${typeId}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getZoneByStatusAndByType = (statusId, typeId, pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}status/${statusId}/type/${typeId}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getPaginated = (pageIndex, pageSize) => {
  const config = {
    method: "GET",

    url: `${endpoint}paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const searchPaginated = (pageIndex, pageSize, query) => {
  const config = {
    method: "GET",
    url: `${endpoint}search?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getAll = () => {
  _logger("getAllFiring.....");
  const config = {
    method: "GET",
    url: endpoint,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const zonesService = {
  addZone,
  getZoneById,
  updateZone,
  updateZoneStatus,
  deleteZone,
  getZoneByStatusPaged,
  getZoneByStatus,
  getZoneByType,
  getPaginated,
  getZoneByStatusAndByType,
  searchPaginated,
  getAll,
};

export default zonesService;

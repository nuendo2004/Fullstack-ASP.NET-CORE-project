import axios from "axios";
import * as serviceHelpers from "./serviceHelpers";

const baseUrl = `${serviceHelpers.API_HOST_PREFIX}/api/securityevents`;

const createSecurityEvent = (payload) => {
  const config = {
    method: "POST",
    data: payload,
    url: baseUrl,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(serviceHelpers.onGlobalSuccess)
    .catch(serviceHelpers.onGlobalError);
};

const getOrganizations = (payload) => {
  const config = {
    method: "POST",
    url: `${serviceHelpers.API_HOST_PREFIX}/api/lookups`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(serviceHelpers.onGlobalSuccess)
    .catch(serviceHelpers.onGlobalError);
};

const getOrganizationStats = (id) => {
  const config = {
    method: "GET",
    url: `${baseUrl}/organizations/stats/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(serviceHelpers.onGlobalSuccess)
    .then((response) => {
      return {
        id: id,
        data: response,
      };
    })
    .catch(serviceHelpers.onGlobalError);
};

const securityEventsService = {
  createSecurityEvent,
  getOrganizations,
  getOrganizationStats,
};

export default securityEventsService;

const getSecurityEventByZone=(pageIndex, pageSize, zoneId )=>{
  const config={
    method: "GET",
    url: `${baseUrl}/zone/${zoneId}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(serviceHelpers.onGlobalSuccess)
    .catch(serviceHelpers.onGlobalError);

  };

  const getSecurityEventByTrainee=(traineeId, pageIndex, pageSize)=>{
    const config={
      method: "GET",
      url: `${baseUrl}/trainee/${traineeId}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config)
      .then(serviceHelpers.onGlobalSuccess)
      .catch(serviceHelpers.onGlobalError);
  
    }

  
export {createSecurityEvent, getSecurityEventByZone, getSecurityEventByTrainee, getOrganizations, getOrganizationStats} 
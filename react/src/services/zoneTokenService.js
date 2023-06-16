import axios from "axios";
import * as helper from "./serviceHelpers";

const endpoint = `${helper.API_HOST_PREFIX}/api/zonetokens/`;

let addToken = (payload) => {
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

let getAllTokens = () => {
  const config = {
    method: "GET",
    url: endpoint,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

let getByTokenTypeId = (typeId, pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}typeid?typeId=${typeId}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

let getToken = (token) => {
  const config = {
    method: "GET",
    url: endpoint + token,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const zoneTokenService = {
  addToken,
  getAllTokens,
  getToken,
  getByTokenTypeId,
};

export default zoneTokenService;

import axios from "axios";
import { onGlobalSuccess, onGlobalError } from "../serviceHelpers.js";

const getSinoNumbers = () => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/entities/krSinoNumbers",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getNativeNumbers = () => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/entities/krNativeNumbers",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const editSinoNumbers = (id) => {
  const config = {
    method: "PUT",
    url: `https://api.remotebootcamp.dev/api/entities/krSinoNumbers/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const editNativeNumbers = (id) => {
  const config = {
    method: "PUT",
    url: `https://api.remotebootcamp.dev/api/entities/krNativeNumbers/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getSinoNumberById = (id) => {
  const config = {
    method: "GET",
    url: `https://api.remotebootcamp.dev/api/entities/krSinoNumbers/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getNativeNumberById = (id) => {
  const config = {
    method: "GET",
    url: `https://api.remotebootcamp.dev/api/entities/krNativeNumbers/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const krNumbersService = { getSinoNumbers, getNativeNumbers, editSinoNumbers, editNativeNumbers, getSinoNumberById, getNativeNumberById };
export default krNumbersService;
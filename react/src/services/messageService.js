import axios from "axios";
import { onGlobalError, onGlobalSuccess } from "./serviceHelpers";

const API = process.env.REACT_APP_API_HOST_PREFIX;

const messageService = {
  endpoint: `${API}/api/messages`,
};

const getConversation = (chatName) => {
  const config = {
    method: "GET",
    url: `${messageService.endpoint}/conversation?chatname=${chatName}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getByZoneGroupId = (zoneGroupId) => {
  const config = {
    method: "GET",
    url: `${messageService.endpoint}/zonegroup/${zoneGroupId}`,
    crossdomain: true,
    header: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const addMessage = (payload) => {
  const config = {
    method: "POST",
    url: messageService.endpoint,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export { getConversation, addMessage, getByZoneGroupId };

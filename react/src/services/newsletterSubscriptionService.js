import axios from "axios";
import {
  API_HOST_PREFIX,
  onGlobalError,
  onGlobalSuccess,
} from "./serviceHelpers";

const endpoint = `${API_HOST_PREFIX}/api/newslettersubscriptions`;

const addSubscription = (payload) => {
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

const getEmails = (isSubscribedBool) => {
  const config = {
    method: "GET",
    url: `${endpoint}/subscribed/${isSubscribedBool}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getEmailsByDate = (startDate, endDate) => {
  const config = {
    method: "GET",
    url: `${endpoint}/datetime?startDate=${startDate}&endDate=${endDate}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getEmailsPaged = (pageIndex, pageSize, isSubscribedBool) => {
  const config = {
    method: "GET",
    url: `${endpoint}/paged/subscribed/${isSubscribedBool}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const searchEmailsPaged = (pageIndex, pageSize, isSubscribedBool, query) => {
  const config = {
    method: "GET",
    url: `${endpoint}/search/subscribed/${isSubscribedBool}?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const updateSubscription = (payload) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/subscribed`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const newsletterSubscriptionService = {
  addSubscription,
  getEmails,
  updateSubscription,
  getEmailsPaged,
  searchEmailsPaged,
  getEmailsByDate,
};
export default newsletterSubscriptionService;

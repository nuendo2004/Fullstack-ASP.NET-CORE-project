import axios from "axios";
import * as serviceHelpers from "./serviceHelpers";

const endpoint = `${serviceHelpers.API_HOST_PREFIX}/api/stripe`;

const createSubscription = (id) => {
  const config = {
    method: "POST",
    url: `${endpoint}/subscription?priceId=${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(serviceHelpers.onGlobalSuccess)
    .catch(serviceHelpers.onGlobalError);
};

const getSubs = () => {
  const config = {
    method: "GET",
    url: `${endpoint}/subscriptionall`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(serviceHelpers.onGlobalSuccess)
    .catch(serviceHelpers.onGlobalError);
};

const addSubscriptionData = (id) => {
  const config = {
    method: "POST",
    url: `${endpoint}/success?session_id=${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(serviceHelpers.onGlobalSuccess)
    .catch(serviceHelpers.onGlobalError);
};

const sessionService = { createSubscription, getSubs, addSubscriptionData };

export default sessionService;

import axios from "axios";
import {
  API_HOST_PREFIX,
  onGlobalSuccess,
  onGlobalError,
} from "./serviceHelpers";

const googleAnalyticsEndpoint = `${API_HOST_PREFIX}/api/analytics`;

const GoogleAnalytics = (payload) => {
  const config = {
    method: "POST",
    data: payload,
    url: googleAnalyticsEndpoint,
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export { GoogleAnalytics };

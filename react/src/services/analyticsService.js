import axios from "axios";
import {
  API_HOST_PREFIX,
  onGlobalError,
  onGlobalSuccess,
} from "./serviceHelpers";
import debug from "sabio-debug";
const _logger = debug.extend("analyticsService");

const endpoint = `${API_HOST_PREFIX}/api/analytics`;

const getStats = () => {
  _logger("getStats is running");
  const config = {
    method: "GET",
    url: `${endpoint}/stats`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const analyticsService = {
  getStats,
};

export default analyticsService;

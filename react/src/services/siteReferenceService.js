import axios from "axios";
import {
  API_HOST_PREFIX,
  onGlobalSuccess,
  onGlobalError,
} from "./serviceHelpers";

const endpoint = `${API_HOST_PREFIX}/api/sitereferences`;

const getSummary = () => {
  const config = {
    method: "GET",
    url: `${endpoint}/summary`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const SiteReferenceService = {
  getSummary,
};

export default SiteReferenceService;

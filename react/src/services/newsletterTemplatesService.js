import axios from "axios";
import {
  API_HOST_PREFIX,
  onGlobalError,
  onGlobalSuccess,
} from "./serviceHelpers";

const endpoint = `${API_HOST_PREFIX}/api/newslettertemplates`;

const getPaged = () => {
  const config = {
    method: "GET",
    url: `${endpoint}/paged?pageIndex=0&pageSize=10`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const newsletterTemplatesService = { getPaged };
export default newsletterTemplatesService;

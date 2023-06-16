import axios from "axios";
import * as serviceHelpers from "./serviceHelpers";

const endpoint = `${serviceHelpers.API_HOST_PREFIX}/api/emails`;
const contactUs = (message) => {
  const config = {
    method: "POST",
    data: message,
    url: `${endpoint}/contact`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(serviceHelpers.onGlobalSuccess)
    .catch(serviceHelpers.onGlobalError);
};
const contactService = { contactUs };
export default contactService;

import axios from "axios";
import * as serviceHelpers from "./serviceHelpers";

const endpoint = `${serviceHelpers.API_HOST_PREFIX}/api/files`;

const fileUpload = (files) => {
  const config = {
    method: "POST",
    data: files,
    url: `${endpoint}/upload`,
    crossdomain: true,
    headers: { "Content-Type": "multipart/form-data" },
  };
  return axios(config)
    .then(serviceHelpers.onGlobalSuccess)
    .catch(serviceHelpers.onGlobalError);
};
const uploadService = { fileUpload };
export default uploadService;

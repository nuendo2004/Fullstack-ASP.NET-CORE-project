import axios from "axios";
import * as helper from "./serviceHelpers";
import sabioDebug from "sabio-debug";

const endpoint = `${helper.API_HOST_PREFIX}/api/emails/`;

const _logger = sabioDebug.extend("emailService");

const phishingEmail = (payload) => {
  _logger("phishing email being sent", payload);
  const config = {
    method: "POST",
    data: payload,
    url: `${endpoint}/phishing`,
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const demoAccountCreate = (payload) => {
  _logger("Demo account email being sent", payload);
  const config = {
    method: "POST",
    data: payload,
    url: `${endpoint}/demoaccount`,
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const confirmTrainee = (token) => {
  _logger("confirmTrainee executing", token);
  const config = {
    method: "PUT",
    url: `${endpoint}/confirm?token=${token}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const emailService = {
  phishingEmail,
  confirmTrainee,
  demoAccountCreate,
};
export default emailService;

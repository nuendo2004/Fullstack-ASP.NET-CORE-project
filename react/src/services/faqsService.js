import axios from "axios";
import {
  API_HOST_PREFIX,
  onGlobalSuccess,
  onGlobalError,
} from "./serviceHelpers";

import debug from "sabio-debug";

const _logger = debug.extend("faqsService");

const endpoint = `${API_HOST_PREFIX}/api/faqs`;
const lookUpPoint = `${API_HOST_PREFIX}/api/lookups`;

const getAllCategorys = () => {
  _logger("Select All Categories");
  const config = {
    method: "GET",
    url: lookUpPoint,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAllFaqs = () => {
  _logger("Select All Faqs");
  const config = {
    method: "GET",
    url: endpoint,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getFaqByCatId = (CategoryId) => {
  _logger("Edit Faqs", CategoryId);
  const config = {
    method: "GET",
    url: `${endpoint}/${CategoryId}`,

    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const faqUpdate = (FaqUpdateRequest, id) => {
  _logger("jobs is searching");
  const config = {
    method: "PUT",
    url: `${endpoint}/${id}`,
    data: FaqUpdateRequest,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const faqAdd = (FaqAddRequest) => {
  _logger("Add Faqs");
  const config = {
    method: "POST",
    url: `${endpoint}`,
    data: FaqAddRequest,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const faqDeleteById = (id) => {
  _logger("Get Faq", id);
  const config = {
    method: "GET",
    url: `${endpoint}/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const faqsService = {
  getAllCategorys,
  getAllFaqs,
  getFaqByCatId,
  faqUpdate,
  faqAdd,
  faqDeleteById,
};

export default faqsService;

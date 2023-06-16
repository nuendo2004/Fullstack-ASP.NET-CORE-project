import axios from "axios";
import * as helper from "./serviceHelpers";

const endpoint = `${helper.API_HOST_PREFIX}/api/surveys`;

const getSurveys = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossDomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updateSurvey = (payload) => {
  const config = {
    method: "PUT",
    data: payload,
    url: `${endpoint}/${payload.id}`,
    withCredentials: true,
    crossDomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const searchSurveys = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint}/search`,
    data: payload,
    withCredentials: true,
    crossDomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const deleteSurvey = (payload) => {
  const config = {
    method: "PUT",
    data: payload,
    url: `${endpoint}/${payload}/delete`,
    withCredentials: true,
    crossDomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getSurveyDetailsById = (id) => {
  const config = {
    method: "GET",
    url: `${endpoint}/${id}/details`,
    withCredentials: true,
    crossDomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const addSurvey = (payload) => {
  const config = {
    method: "POST",
    url: endpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};


const surveyService = {
  getSurveys,
  updateSurvey,
  searchSurveys,
  deleteSurvey,
  getSurveyDetailsById,
  addSurvey
};

export default surveyService;

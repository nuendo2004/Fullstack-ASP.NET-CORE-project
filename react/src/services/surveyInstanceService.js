import axios from "axios";
import {
  API_HOST_PREFIX,
  onGlobalError,
  onGlobalSuccess,
} from "./serviceHelpers";

const endpoint = `${API_HOST_PREFIX}/api/surveys/instances`;

const getSurveyInstances = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getSurveyInstanceById = (id) => {
    const config = {
      method: "GET",
      url: `${endpoint}/${id}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
  
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };

  const getSurveyInstanceDetailsById = (id) => {
    const config = {
      method: "GET",
      url: `${endpoint}/${id}/details`,
      withCredentials: true,
      crossdomain: true,
      headers: {"Content-Type": "application/json"},
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError)
  };

const surveyInstanceService = {
    getSurveyInstances,
    getSurveyInstanceById,
    getSurveyInstanceDetailsById,
};

export default surveyInstanceService;
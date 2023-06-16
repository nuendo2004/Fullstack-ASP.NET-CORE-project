import axios from "axios";

import {
  API_HOST_PREFIX,
  onGlobalError,
  onGlobalSuccess,
} from "./serviceHelpers";

const endpoint = `${API_HOST_PREFIX}/api/surveys/answers`;

const getSurveyAnswerByInstanceId = (id) => {
  const config = {
    method: "GET",
    url: `${endpoint}/instance/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const addSurveyAnswers = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const surveyAnswerService = {
  getSurveyAnswerByInstanceId,
  addSurveyAnswers,
};

export default surveyAnswerService;

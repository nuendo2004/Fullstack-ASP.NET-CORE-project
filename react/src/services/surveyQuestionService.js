import axios from "axios";
import {
  API_HOST_PREFIX,
  onGlobalSuccess,
  onGlobalError,
} from "./serviceHelpers";

const endpoint = `${API_HOST_PREFIX}/api/surveyquestions`;

const addQuestion = (payload) => {
  const config = {
    method: "POST",
    url: endpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAllQuestions = (pageIndex, pageSize) => {
 
  const config = {
    method: "GET",
    url: `${endpoint}/pagination/?pageIndex=${pageIndex}&&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
      return axios(config).then(onGlobalSuccess).catch(onGlobalError)
}

const getQuestionById = (id) => {
 
  const config = {
    method: "GET",
    url: `${endpoint}/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
      return axios(config).then(onGlobalSuccess).catch(onGlobalError)
}

const deleteSurveyQuestionById = (id) => {
  const config = {
    method: "DELETE",
    url:  `${endpoint}/${id}`,
    withCredentials: true,
    crossDomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const surveyQuestionService = {
  addQuestion,
  getAllQuestions,
  getQuestionById,
  deleteSurveyQuestionById
};
  


export default surveyQuestionService;

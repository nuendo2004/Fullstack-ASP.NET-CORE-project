import axios from "axios";
import logger from "sabio-debug";
import * as helper from "./serviceHelpers";

const _logger = logger.extend("TraineesService");
const endpoint = `${helper.API_HOST_PREFIX}/api/trainees`;

let addTrainees = (payload) => {
  _logger("Add Trainees", payload);

  const config = {
    method: "POST",
    data: payload,
    url: `${endpoint}`,
    withCredentials: true,
    crossDomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};
let updateTrainees = (payload) => {
  _logger("Update Trainees", payload);

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
let getTrainees = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossDomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getTraineeById = (id) => {
  const config = {
    method: "GET",
    url: `${endpoint}/${id}`,
    withCredentials: true,
    crossDomain: true,
    header: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

let getTraineesByOrganization = (pageIndex, pageSize, orgaId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/organizationId/${orgaId}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossDomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};
const getTraineesByZoneGroup = (id) => {
  const config = {
    method: "GET",
    url: `${endpoint}/zonegroup/${id}`,
    withCredentials: true,
    crossDomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

let getTraineesByTrainingUnitIdV2 = (trainingUnitId) => {
    const config = {
        method: "GET",
        url: `${endpoint}/trainingunit/${trainingUnitId}`,
        withCredentials: true,
        crossDomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}
let getTraineesByUserId = (userId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/userid/${userId}`,
    withCredentials: true,
    crossDomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};
let getTraineesByTrainingUnitId = (trainingUnitId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/TrainingUnitId/${trainingUnitId}`,
    withCredentials: true,
    crossDomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};
const traineesService = {
  addTrainees,
  updateTrainees,
  getTrainees,
  getTraineesByOrganization,
  getTraineesByTrainingUnitId,
  getTraineesByUserId,
  getTraineeById,
  getTraineesByZoneGroup,

  getTraineesByTrainingUnitIdV2,
};

export default traineesService;

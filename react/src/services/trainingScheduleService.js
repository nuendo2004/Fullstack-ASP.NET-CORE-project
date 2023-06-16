import axios from "axios";
import * as helper from "./serviceHelpers";

const endpoint = `${helper.API_HOST_PREFIX}/api/trainingSchedules`;

const getById = (id) => {
  const config = {
    method: "GET",
    url: `${endpoint}/${id}`,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const create = (payload) => {
  const config = {
    method: "POST",
    url: endpoint,
    data: payload,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const update = (payload, id) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/${id}`,
    data: payload,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const archive = (id) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/delete/${id}`,
    data: id,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getByTrainingUnitId = (pageIndex, pageSize, id) => {
  const config = {
    method: "GET",
    url: `${endpoint}/paginate/trainingUnit?pageIndex=${pageIndex}&pageSize=${pageSize}&trainingUnitId=${id}`,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getByCreatedBy = (trainingUnitId, pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}/paginate/user?pageIndex=${pageIndex}&pageSize=${pageSize}&createdBy=${trainingUnitId}`,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const createdByNoPagination = () => {
  const config = {
    method: "GET",
    url: `${endpoint}/current`,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const trainingScheduleService = {
  getById,
  create,
  update,
  archive,
  getByCreatedBy,
  getByTrainingUnitId,
  createdByNoPagination,
};
export default trainingScheduleService;

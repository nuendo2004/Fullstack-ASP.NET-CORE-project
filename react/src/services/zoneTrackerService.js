import axios from "axios";
import * as helper from "./serviceHelpers";

const endpoint = `${helper.API_HOST_PREFIX}/api/zonetracker`;

const config = (method, url, body) => {
  const axiosConfig = {
    method: method,
    url: `${endpoint}${url}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  if (body) axiosConfig.data = body;
  return axiosConfig;
};

const logCurrentActivity = (payload) => {
  return axios(config("POST", "", payload))
    .then(helper.onGlobalSuccess)
    .catch(helper.onGlobalError);
};
const getAllRecords = (index, size, orgId, hasRecordOnly) => {
  const url = `?pageIndex=${index}&pageSize=${size}&orgId=${orgId}&hasRecordOnly=${hasRecordOnly}`;
  return axios(config("GET", url))
    .then(helper.onGlobalSuccess)
    .catch(helper.onGlobalError);
};

const getRecordByTraineeId = (index, size, traineeId) => {
  const url = `/${traineeId}?pageIndex=${index}&pageSize=${size}`;
  return axios(config("GET", url))
    .then(helper.onGlobalSuccess)
    .catch(helper.onGlobalError);
};
const getRecordByTraineeIdQuery = (
  index,
  size,
  traineeId,
  start,
  end,
  zone = 0
) => {
  const url = `/${traineeId}/pagination?pageIndex=${index}&pageSize=${size}&dateStart=${start}&dateEnd=${end}&zoneId=${zone}`;
  return axios(config("GET", url))
    .then(helper.onGlobalSuccess)
    .catch(helper.onGlobalError);
};

const getRecordByZoneId = (index, size, traineeId, zoneId) => {
  const url = `/${traineeId}/${zoneId}?pageIndex=${index}&pageSize=${size}`;
  return axios(config("GET", url))
    .then(helper.onGlobalSuccess)
    .catch(helper.onGlobalError);
};

const getRecordByTrainingUnitId = (
  index,
  size,
  trainingUnitId,
  hasRecordOnly
) => {
  const url = `/trainingunit?pageIndex=${index}&pageSize=${size}&trainingUnitId=${trainingUnitId}&hasRecordOnly=${hasRecordOnly}`;
  return axios(config("GET", url))
    .then(helper.onGlobalSuccess)
    .catch(helper.onGlobalError);
};
const getTrainingUnitByOrgId = (index, size, trainingUnitId) => {
  const url = `/tu?pageIndex=${index}&pageSize=${size}&tuId=${trainingUnitId}`;
  return axios(config("GET", url))
    .then(helper.onGlobalSuccess)
    .catch(helper.onGlobalError);
};
const getTrainingUnitsByOrgIdV3 = (orgId, hasStudent) => {
  const config = {
    method: "GET",
    url: `${helper.API_HOST_PREFIX}/api/trainingunits/organization/nopagination/${orgId}?query=2&hasStudent=${hasStudent}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const getUserInfo = () => {
  return axios.get("https://ipapi.co/json/");
};

const getZoneChartData = (traineeId) => {
  const url = `/chart?traineeId=${traineeId}`;
  return axios(config("GET", url))
    .then(helper.onGlobalSuccess)
    .catch(helper.onGlobalError);
};

export {
  logCurrentActivity,
  getAllRecords,
  getRecordByTraineeId,
  getRecordByZoneId,
  getRecordByTrainingUnitId,
  getTrainingUnitByOrgId,
  getTrainingUnitsByOrgIdV3,
  getUserInfo,
  getZoneChartData,
  getRecordByTraineeIdQuery,
};

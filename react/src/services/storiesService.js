import axios from "axios";
import {
  API_HOST_PREFIX,
  onGlobalSuccess,
  onGlobalError,
} from "./serviceHelpers";

const endpoint = `${API_HOST_PREFIX}/api/sharestories`;

const getAllStories = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}&IsApproved=true`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getUnapprovedStories = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}&IsApproved=false`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getStoryById = (storyId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/${storyId}`,

    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const getStoryBySearch = (pageIndex, pageSize, values) => {
  const config = {
    method: "GET",
    url: `${API_HOST_PREFIX}/api/sharestories/search?pageIndex=${pageIndex}&pageSize=${pageSize}&Query=${values}`,

    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const storyUpdate = (id, storyUpdateRequest) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/${id}`,
    data: storyUpdateRequest,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const storyApproval = (id, storyUpdateRequest) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/approval/${id}`,
    data: storyUpdateRequest,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const storyAdd = (storyAddRequest) => {
  const config = {
    method: "POST",
    url: endpoint,
    data: storyAddRequest,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const storyDeleteById = (id) => {
  const config = {
    method: "DELETE",
    url: `${endpoint}/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const storyService = {
  getAllStories,
  getUnapprovedStories,
  getStoryById,
  getStoryBySearch,
  storyUpdate,
  storyAdd,
  storyDeleteById,
  storyApproval,
};

export default storyService;

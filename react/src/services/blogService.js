import axios from "axios";
import {
  API_HOST_PREFIX,
  onGlobalSuccess,
  onGlobalError,
} from "./serviceHelpers";

const endpoint = `${API_HOST_PREFIX}/api/blogs`;

const addBlog = (payload) => {
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

const getAllBlogs = (
  pageIndex,
  pageSize,
  isApproved,
  isPublished,
  isDeleted
) => {
  const config = {
    method: "GET",
    url: `${endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}&isApproved=${isApproved}&isPublished=${isPublished}&isDeleted=${isDeleted}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getByType = (
  blogTypeById,
  pageIndex,
  pageSize,
  isApproved,
  isPublished,
  isDeleted
) => {
  const config = {
    method: "GET",
    url: `${endpoint}/type/${blogTypeById}?pageIndex=${pageIndex}&pageSize=${pageSize}&isApproved=${isApproved}&isPublished=${isPublished}&isDeleted=${isDeleted}`,
    withCredentials: true,
    crossdomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const editBlog = (payload, id) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const updateApproval = (id, isApproved) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/${id}/approval?isApproved=${isApproved}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(() => {
      return { id };
    })
    .catch(onGlobalError);
};

const getById = (id) => {
  const config = {
    method: "GET",
    url: `${endpoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const blogService = {
  addBlog,
  getAllBlogs,
  getByType,
  editBlog,
  updateApproval,
  getById,
};

export default blogService;

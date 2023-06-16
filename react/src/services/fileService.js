import axios from "axios";
import { onGlobalError, onGlobalSuccess, API_HOST_PREFIX } from "./serviceHelpers";
const endpoint = `${API_HOST_PREFIX}/api/files`;

const getByUserId = (pageIndex, pageSize, userId) => {
  const config = {
      method:"GET",
      url: `${endpoint}/createdby?pageIndex=${pageIndex}&pageSize=${pageSize}&userId=${userId}`,
      withCredentials: true,
      crossdomain : true,
      headers: { "Content-Type": "application/json" },
  }
  return axios(config).then(onGlobalSuccess).catch(onGlobalError)
}

const getAllPaginated = (pageIndex, pageSize) => {
    const config = {
        method:"GET",
        url: `${endpoint}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        withCredentials: true,
        crossdomain : true,
        headers: { "Content-Type": "application/json" },
    }
    return axios(config).then(onGlobalSuccess).catch(onGlobalError)
}

const getAllFiles = () => {
  const config = {
      method:"GET",
      url: `${endpoint}/all`,
      withCredentials: true,
      crossdomain : true,
      headers: { "Content-Type": "application/json" },
  }
  return axios(config).then(onGlobalSuccess).catch(onGlobalError)
}

const search = (pageIndex, pageSize, query, queryType) => {
    const config = {
      method: "GET",
      url: `${endpoint}/search/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}&queryType=${queryType}`,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
  
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };

  const getDeletedFiles = (pageIndex, pageSize, userId) => {
    const config = {
        method:"GET",
        url: `${endpoint}/deleted?pageIndex=${pageIndex}&pageSize=${pageSize}&userId=${userId}`,
        withCredentials: true,
        crossdomain : true,
        headers: { "Content-Type": "application/json" },
    }
    return axios(config).then(onGlobalSuccess).catch(onGlobalError)
}
const getDeletedFilesAdmin = (pageIndex, pageSize) => {
  const config = {
      method:"GET",
      url: `${endpoint}/deletedAdmin?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      withCredentials: true,
      crossdomain : true,
      headers: { "Content-Type": "application/json" },
  }
  return axios(config).then(onGlobalSuccess).catch(onGlobalError)
}

const fileService = {
     getByUserId  
    ,getAllPaginated
    ,search
    ,getAllFiles
    ,getDeletedFiles
    ,getDeletedFilesAdmin
}


export default fileService
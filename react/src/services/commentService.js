import axios from "axios";
import { API_HOST_PREFIX, onGlobalSuccess, onGlobalError} from "./serviceHelpers"

const endpoint = `${API_HOST_PREFIX}/api/comments`;

let addComment = (payload) => {
  const config = {
    method: "POST",
    url: endpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError)
};

let selectByEntityId = (entityId, entityTypeId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/?EntityId=${entityId}&EntityTypeId=${entityTypeId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let updateComment = (payload, id) => {
    const config = {
      method: "PUT",
      url: `${endpoint}/${id}`,
      withCredentials: true,
      data:payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(() =>{
      return id;
    }).catch(onGlobalError);
  };

  let deleteComment = (id) => {
    const config = {
      method: "DELETE",
      url: `${endpoint}/${id}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(() =>{
      return id
    }).catch(onGlobalError);
  };
  
  const commentService = {
    addComment, updateComment, selectByEntityId , deleteComment
  }
  export default commentService;
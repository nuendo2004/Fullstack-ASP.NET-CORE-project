import axios from "axios";
import * as helper from "./serviceHelpers";

const entitiesEndpoint = "https://api.remotebootcamp.dev/api/entities";

const getPodcasts = () => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/entities/podcasts",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess);
};

const updatePodcast = (entityName, id, payload) => {
  const config = {
    method: "PUT",
    url: `${entitiesEndpoint}/${entityName}/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
    data: payload,
  };
  return axios(config);
};

const addPodcast = (entityName, payload) => {
  const config = {
    method: "POST",
    url: `${entitiesEndpoint}/${entityName}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let deletePodcast = (id) => {
  const config = {
    method: "DELETE",
    url: `https://api.remotebootcamp.dev/api/entities/podcasts/${id}`,
    withCredentials: true,
    crossOriginIsolated: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(() => id);
};

export { getPodcasts, updatePodcast, addPodcast, deletePodcast };

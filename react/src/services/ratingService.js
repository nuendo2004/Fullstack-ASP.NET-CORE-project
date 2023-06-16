import axios from "axios";
import * as serviceHelpers from "./serviceHelpers";
import debug from "sabio-debug";
const _logger = debug.extend("Ratings");

const endpoint = `${serviceHelpers.API_HOST_PREFIX}/api/ratings/`;

const addRating = (payload) => {
  _logger("payload ->", payload);
  const config = {
    method: "POST",
    url: endpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-type": "application/json" },
  };
  return axios(config)
    .then(() => payload)
    .catch(serviceHelpers.onGlobalError);
};

const getRatingAverage = (entityTypeId, entityId) => {
  const config = {
    method: "GET",
    url: `${endpoint}average?EntityTypeId=${entityTypeId}&EntityId=${entityId}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config)
    .then(serviceHelpers.onGlobalSuccess)
    .catch(serviceHelpers.onGlobalError);
};

const ratingService = { addRating, getRatingAverage };
export default ratingService;

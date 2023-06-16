import axios from "axios";
import debug from "sabio-debug";

const _logger = debug.extend("LocationService");

var endpoint = "https://localhost:50001/api/locations";
var endpointLookUp = "https://localhost:50001/api/lookups";

_logger(endpoint);

let getStates = () => {
  const config = {
    method: "GET",
    url: endpointLookUp + `/states`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "applications/json" },
  };
  return axios(config);
};
let addLocation = (payload) => {
  const config = {
    method: "POST",
    data: payload,
    url: endpoint,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let updateLocation = (payload) => {
  const config = {
    method: "PUT",
    data: payload,
    url: endpoint + `/${payload.id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

let getUserAddresses = () => {
  const config = {
    method: "GET",
    url: endpoint + `/user`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "applications/json" },
  };
  return axios(config);
};

let deleteAddress = (id) => {
  const config = {
    method: "DELETE",
    url: endpoint + `/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "applications/json" },
  };
  return axios(config);
};

const locationService = {
  getStates,
  addLocation,
  updateLocation,
  getUserAddresses,
  deleteAddress,
};

export default locationService;

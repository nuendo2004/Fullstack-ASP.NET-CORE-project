import axios from "axios";

// This service demonstrates the use of javascript classes.
// You do not need to use classes in services files. you can continue to use separate funcitons that you export together as 1 object or
// export as individual functions.

let {
  REACT_APP_API_HOST_PREFIX: API,
  REACT_APP_API_NODE_HOST_PREFIX: NODE_API,
} = process.env;

class CarService {
  constructor(host) {
    this.host = host;
  }

  getById = (id) => {
    const config = {
      method: "GET",
      url: `${this.host}/api/cars/${id}`,
      headers: { "Content-Type": "application/json" },
    };

    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  getAll = () => {
    const config = {
      method: "GET",
      url: `${this.host}/api/cars`,
      headers: { "Content-Type": "application/json" },
    };

    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  create = (payload) => {
    const config = {
      method: "POST",
      url: `${this.host}/api/cars`,
      data: payload,
      headers: { "Content-Type": "application/json" },
    };

    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  update = (id, payload) => {
    const config = {
      method: "PUT",
      url: `${this.host}/api/cars/${id}`,
      data: payload,
      headers: { "Content-Type": "application/json" },
    };

    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  remove = (id) => {
    const config = {
      method: "DELETE",
      url: `${this.host}/api/cars/${id}`,
      headers: { "Content-Type": "application/json" },
    };

    return axios(config).then(this.handleSuccess).catch(this.handleError);
  };

  handleSuccess = (res) => {
    return res.data;
  };

  handleError = (error) => {
    return Promise.reject(error);
  };
}

export const nodeCarService = new CarService(NODE_API);
export const netCarService = new CarService(API);

export default { nodeCarService, netCarService };

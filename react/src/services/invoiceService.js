import axios from "axios";
import * as serviceHelpers from "./serviceHelpers";

const endpoint = `${serviceHelpers.API_HOST_PREFIX}/api/stripe`;

const createInvoice = (id) => {
  const config = {
    method: "POST",
    url: `${endpoint}/invoice?invoiceId=${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(serviceHelpers.onGlobalSuccess)
    .catch(serviceHelpers.onGlobalError);
};

const getInvoices = (id) => {
  const config = {
    method: "GET",
    url: `${endpoint}/invoices?customerId=${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(serviceHelpers.onGlobalSuccess)
    .catch(serviceHelpers.onGlobalError);
};

const invoiceService = { createInvoice, getInvoices };

export default invoiceService;

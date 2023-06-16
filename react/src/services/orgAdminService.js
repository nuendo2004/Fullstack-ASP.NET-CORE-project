import axios from "axios";
import * as helper from "./serviceHelpers";
import sabioDebug from "sabio-debug";

const endpoint = `${helper.API_HOST_PREFIX}/api/orgAdmin`;

const _logger = sabioDebug.extend("orgAdminService");

const getOrgAdminData = (orgId, numberSelection) => {
  _logger("getOrgAdminData executing", orgId, numberSelection);
  const config = {
    method: "GET",
    url: `${endpoint}/orgAdminData?orgId=${orgId}&numberSelection=${numberSelection}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const orgAdminService = {
  getOrgAdminData,
};
export default orgAdminService;

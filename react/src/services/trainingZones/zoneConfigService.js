import axios from "axios";
import { API_HOST_PREFIX, onGlobalError, onGlobalSuccess } from "services/serviceHelpers";


const getByOrgId = (pageIndex,pageSize,organizationId) => {

    const config = {
      method: "GET",
      url: `${API_HOST_PREFIX}/api/zoneConfig/organizationId/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}&organizationId=${organizationId}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
}
    const getBySpeedId = (pageIndex,pageSize,organizationId,speedCategoryId) => {

        const config = {
          method: "GET",
          url: `${API_HOST_PREFIX}/api/zoneConfig/speedCategory/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}&organizationId=${organizationId}&speedCategoryId=${speedCategoryId}`,
          withCredentials: true,
          crossdomain: true,
          headers: { "Content-Type": "application/json" }
        };
        return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };
  const getBySpreadId = (pageIndex,pageSize,organizationId,spreadLevelId) => {
 const config = {
      method: "GET",
      url:`${API_HOST_PREFIX}/api/zoneConfig/spreadLevel/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}&organizationId=${organizationId}&spreadLevelId=${spreadLevelId}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  }

const getById=(id)=>{
    const config = {
        method: "GET",
        url: `${API_HOST_PREFIX}/api/zoneConfig/${ id }`,
        data: id,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
      };
    
      return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  }
  const addZone=(payload)=>{
    const config = {
      method: "POST",
      url: `${API_HOST_PREFIX}/api/zoneConfig`,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };

  const updateZone=(payload)=>{
    const config = {
      method: "PUT",
      url: `${API_HOST_PREFIX}/api/zoneConfig/${payload.id}`,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
}

    const deleteZone =(id)=>{
  
  
        const config = {
          method: "DELETE",
          url: `${API_HOST_PREFIX}/api/zoneConfig/zoneconfigdelete/${ id }`,
          data: id,
          withCredentials: true,
          crossdomain: true,
          headers: { "Content-Type": "application/json" }
        };
        return axios(config).then(()=>{
          return id;
        })
        }

        
        const getSpread = () => {

          const config = {
            method: "GET",
            url: `${API_HOST_PREFIX}/api/lookups/spreadlevels`,
            withCredentials: true,
            crossdomain: true,
            headers: { "Content-Type": "application/json" }
          };
        
          return axios(config).then(onGlobalSuccess).catch(onGlobalError);
        };
      
        const getSpeed = (payload) => {

          const config = {
            method: "POST",
            url: `${API_HOST_PREFIX}/api/lookups`,
            data:payload,
            withCredentials: true,
            crossdomain: true,
            headers: { "Content-Type": "application/json" }
          };
        
          return axios(config).then(onGlobalSuccess).catch(onGlobalError);
        };


export {getById,getByOrgId,getBySpeedId,getBySpreadId,addZone,updateZone,deleteZone,getSpread,getSpeed}
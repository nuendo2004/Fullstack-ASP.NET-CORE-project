using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.TrainingZones;
using Sabio.Models.Requests.TrainingZones;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Security.Policy;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/zoneConfig")]
    [ApiController]
    public class ZoneConfigController : BaseApiController
    {
        private IZoneConfigServices _services = null;
        private IAuthenticationService<int> _authService=null;
    public ZoneConfigController(IZoneConfigServices services, IAuthenticationService<int> authService,ILogger<ZoneConfigController> logger): base(logger)
        {
            _services = services;
            _authService = authService;
        }

        [HttpGet("organizationId/paginate")]
        public ActionResult<ItemResponse<Paged<ZoneThreatConfigurationRules>>> Pagination(int pageIndex, int pageSize, int organizationId)
        {
            ActionResult result = null;
            try
            {
                Paged<ZoneThreatConfigurationRules> paged = _services.Pagination(pageIndex, pageSize,  organizationId);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));

                }
        
                else
                {
                    ItemResponse<Paged<ZoneThreatConfigurationRules>> response = new ItemResponse<Paged<ZoneThreatConfigurationRules>>();
                    response.Item = paged;
                    result = Ok200(response);

                }
            }
            catch (Exception ex)
            {
               Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.ToString()));
            }
            return result;

        }


        [HttpGet("speedCategory/paginate")]
        public ActionResult<ItemResponse<Paged<ZoneThreatConfigurationRules>>> PaginationSpeed(int pageIndex, int pageSize, int organizationId,int speedCategoryId)
        {
           ActionResult result = null;
           try
          {
                Paged<ZoneThreatConfigurationRules> paged = _services.PaginationSpeed(pageIndex, pageSize, organizationId, speedCategoryId);
                if (paged == null)
                  {
                   result = NotFound404(new ErrorResponse("Records Not Found"));
                 }
                else
                {
                    ItemResponse<Paged<ZoneThreatConfigurationRules>> response = new ItemResponse<Paged<ZoneThreatConfigurationRules>>();
                    response.Item = paged;
                    result = Ok200(response);

                }
            }
            catch (Exception ex)
            {
               Logger.LogError(ex.ToString());
               result = StatusCode(500, new ErrorResponse(ex.ToString()));
            }
            return result;

        }

        [HttpGet("{id:int}")]
        public ActionResult GetById(int id)
        {
            ActionResult result = null;
            try {

                ZoneThreatConfigurationRules u = _services.Get(id);
                if (u == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));
                }
                else
                {
                    ItemResponse<ZoneThreatConfigurationRules> response = new ItemResponse<ZoneThreatConfigurationRules>();
                    response.Item = u;
                    result = Ok200(response);
                }
                }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.ToString()));
            }
            return result;


        }

        [HttpGet("spreadLevel/paginate")]
        public ActionResult<ItemResponse<Paged<ZoneThreatConfigurationRules>>> PaginationSpread(int pageIndex, int pageSize, int organizationId, int spreadLevelId)
        {
            ActionResult result = null;
            try
            {
                Paged<ZoneThreatConfigurationRules> paged = _services.PaginationSpread(pageIndex, pageSize, organizationId, spreadLevelId);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));

                }
                else
                {
                    ItemResponse<Paged<ZoneThreatConfigurationRules>> response = new ItemResponse<Paged<ZoneThreatConfigurationRules>>();
                    response.Item = paged;
                    result = Ok200(response);

                }

            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.ToString()));
            }
            return result;

        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(ZoneConfigAddRequest model)
        {
            ObjectResult result;

            try
            {
                int userId = _authService.GetCurrentUserId();
            int id = _services.Add(model,userId);
            ItemResponse<int> response = new ItemResponse<int>();
            response.Item = id;
                result = Created201(response);
            }
            catch (Exception ex)
            {
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }

            return result;
        }

        [HttpDelete("zoneconfigdelete/{id:int}")]
        public ActionResult<ItemResponse<int>> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                 _services.Delete(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Generic Error:${ex.Message}");
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);

        }

        [HttpPut("{id:int}")]
        public ActionResult<ItemResponse<int>> UpdateAll(ZoneConfigUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                _services.Update(model, userId);
             response = new SuccessResponse();
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Geeneric Error:${ex.Message}");
                base.Logger.LogError(ex.ToString());    
            }

            return StatusCode(code,response);

        }


        
    }
}

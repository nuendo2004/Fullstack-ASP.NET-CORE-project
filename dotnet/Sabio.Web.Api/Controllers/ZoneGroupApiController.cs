using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Utilities;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Organizations;
using Sabio.Models.Enums;
using Sabio.Models.Requests;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Security.Policy;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/zonegroups")]
    [ApiController]
    public class ZoneGroupApiController : BaseApiController
    {
        private IZoneGroupService _zoneGroupService = null;
        private IAuthenticationService<int> _authenticationService = null;

        public ZoneGroupApiController(IZoneGroupService service
            , ILogger<ZoneGroupApiController> logger
            , IAuthenticationService<int> authenticationService) : base(logger)
        {
            _zoneGroupService = service;
            _authenticationService = authenticationService;
        }

        [HttpPost]
        [Authorize(Roles = "Trainee,OrgAdmin,OrgTrainer,SysAdmin")]
        public ActionResult<ItemResponse<int>> Create(ZoneGroupAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authenticationService.GetCurrentUserId();

                int id = _zoneGroupService.AddZoneGroup(model, userId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }

            return result;
        }

        [HttpPut("{id:int}")]
        [Authorize(Roles = "Trainee,OrgAdmin,OrgTrainer,SysAdmin")]
        public ActionResult<SuccessResponse> Update(ZoneGroupUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authenticationService.GetCurrentUserId();
                _zoneGroupService.UpdateZoneGroup(model, userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Trainee,OrgAdmin,OrgTrainer,SysAdmin")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authenticationService.GetCurrentUserId();
                _zoneGroupService.DeleteZoneGroup(id, userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("{id:int}")]
        [Authorize(Roles = "Trainee,OrgAdmin,OrgTrainer,SysAdmin")]
        public ActionResult<ItemResponse<ZoneGroup>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                ZoneGroup aZoneGroup = _zoneGroupService.GetZoneGroupById(id);

                if (aZoneGroup == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<ZoneGroup> { Item = aZoneGroup };
                }
            }
            catch (Exception ex)
            {

                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }

            return StatusCode(iCode, response);

        }

        [HttpGet("paginatebyzoneid")]
        [Authorize(Roles = "Trainee,OrgAdmin,OrgTrainer,SysAdmin")]
        public ActionResult<ItemResponse<Paged<ZoneGroup>>> GetZoneGroupsByZoneId(int pageIndex, int pageSize, int zoneId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<ZoneGroup> page = _zoneGroupService.GetZoneGroupsByZoneId(pageIndex, pageSize, zoneId);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<ZoneGroup>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                 base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);

        }

        [HttpGet("searchpaginatebyzoneid")]
        [Authorize(Roles = "Trainee,OrgAdmin,OrgTrainer,SysAdmin")]
        public ActionResult<ItemResponse<Paged<ZoneGroup>>> SearchZoneGroupsByZoneId(int pageIndex, int pageSize, int zoneId, string query)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<ZoneGroup> page = _zoneGroupService.SearchZoneGroupsByZoneId(pageIndex, pageSize, zoneId, query);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<ZoneGroup>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);

        }

        [HttpGet("paginate")]
        [Authorize(Roles = "Trainee,OrgAdmin,OrgTrainer,SysAdmin")]
        public ActionResult<ItemResponse<Paged<ZoneGroup>>> GetZoneGroups(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<ZoneGroup> page = _zoneGroupService.GetAllZoneGroups(pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<ZoneGroup>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);

        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Organizations;
using Sabio.Models.Enums;
using Sabio.Models.Requests.Organizations;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/organizations")]
    [ApiController]
    public class OrganizationApiController : BaseApiController
    {
        private IOrganizationService _service = null;
        private IAuthenticationService<int> _autService = null;

        public OrganizationApiController(IOrganizationService service,
            ILogger<OrganizationApiController> logger,
            IAuthenticationService<int> autService) : base(logger)
        {
            _service = service;
            _autService = autService;
        }

        [HttpGet]
        [Authorize(Roles = "SysAdmin, OrgAdmin")]
        public ActionResult<ItemResponse<List<Organization>>> GetAll()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<Organization> list = _service.GetAll();

                if(list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                    response = new ItemResponse<List<Organization>>() { Item = list };
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("{id:int}")]
        [Authorize(Roles = "SysAdmin, OrgAdmin")]
        public ActionResult<ItemResponse<Organization>> Get(int id)
        {
            int code = 200;
            Organization org = null;
            BaseResponse response = null;

            try
            {
                org = _service.Get(id);

                if (org == null)
                {
                    code = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                    response = new ItemResponse<Organization>() { Item = org };
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }


        [HttpGet("user")]
        [Authorize(Roles = "Trainee,Costumer,SysAdmin, OrgAdmin")]
        public ActionResult<ItemResponse<Paged<Organization>>> GetByUserId(int pageIndex, int pageSize, int userId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Organization> pagedList = _service.GetByUserId(pageIndex, pageSize, userId);

                if (pagedList == null)
                {
                    code = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                    response = new ItemResponse<Paged<Organization>>() { Item = pagedList };
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "SysAdmin, OrgAdmin")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            int userId = _autService.GetCurrentUserId();
            BaseResponse response = null;

            try
            {
                _service.Delete(id, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpPost]
        [Authorize(Roles = "SysAdmin, OrgAdmin")]
        public ActionResult<ItemResponse<int>> Create(OrganizationAddRequest model)
        {
            ObjectResult result;

            try
            {
                int userId = _autService.GetCurrentUserId();
                int id = _service.Add(model, userId);
                ItemResponse<int> response = new ItemResponse<int> { Item = id };
                result = Created201(response);
            }
            catch(Exception ex)
            {
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }

            return result;
        }

        [HttpPost("v2")]
        [Authorize(Roles = "SysAdmin, OrgAdmin")]
        public ActionResult<ItemResponse<int>> CreateV2(OrganizationAddRequestV2 model)
        {
            ObjectResult result;

            try
            {
                int userId = _autService.GetCurrentUserId();
                int id = _service.AddV2(model, userId);
                ItemResponse<int> response = new ItemResponse<int> { Item = id };
                result = Created201(response);
            }
            catch (Exception ex)
            {
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }

            return result;
        }

        [HttpGet("search")]
        [Authorize(Roles = "SysAdmin, OrgAdmin")]
        public ActionResult<ItemResponse<Paged<Organization>>> Search(int pageIndex, int pageSize, string query)
        {
            int code = 200;
            Paged<Organization> pagedList = null;
            BaseResponse response = null;

            try
            {
                pagedList = _service.Search(pageIndex, pageSize, query);

                if (pagedList == null)
                {
                    code = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                    response = new ItemResponse<Paged<Organization>>() { Item = pagedList };
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpPut("{id:int}")]
        [Authorize(Roles = "SysAdmin, OrgAdmin")]
        public ActionResult<SuccessResponse> Update(OrganizationUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _autService.GetCurrentUserId();
                _service.Update(model, userId);
                response = new SuccessResponse();
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("{orgLookUp}")]
        [Authorize(Roles = "SysAdmin, OrgAdmin")]
        public ActionResult<ItemsResponse<LookUp>> GetOrgByCurrentUser()
        {

            int code = 200;
            BaseResponse response = null;
            try
            {
                int userId = _autService.GetCurrentUserId();
                List<LookUp> list = _service.GetOrgLookUpById(userId);



                if (list == null)
                {
                    code = 404;

                    response = new ErrorResponse("App resource not found");

                }
                else
                {
                    response = new ItemsResponse<LookUp> { Items = list };

                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("totalUsers")]
        [Authorize(Roles = "SysAdmin, OrgAdmin")]
        public ActionResult<ItemsResponse<OrgUserData>> GetTotalUsers()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<OrgUserData> list = _service.GetTotalUsers();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemsResponse<OrgUserData> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);
        }

        [HttpGet("totalTrainees")]
        [Authorize(Roles = "SysAdmin, OrgAdmin")]
        public ActionResult<ItemsResponse<OrgUserData>> GetTotalTrainees()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<OrgUserData> list = _service.GetTotalTrainees();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemsResponse<OrgUserData> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);
        }
    }
}
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Enums;
using Sabio.Models.Requests.ActorAccountRequests;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Net.Security;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/actoraccounts")]

    [ApiController]
    public class ActorAccountsApiController : BaseApiController
    {
        private IActorAccountServices _service = null;
        private IAuthenticationService<int> _authService = null;

        public ActorAccountsApiController(IActorAccountServices services
              ,ILogger<ActorAccountsApiController> logger
              ,IAuthenticationService<int> authService): base(logger)
        {
            _service = services;
            _authService = authService;
        }
        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<ActorAccount>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                ActorAccount actorAccount = _service.GetById(id);
                if(actorAccount == null)
                {
                    code = 404;
                    response = new ErrorResponse("App not found");
                }
                else
                {
                    response = new ItemResponse<ActorAccount> { Item = actorAccount };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
       
        [HttpGet("actorid/{actorid:int}")]
        public ActionResult<ItemResponse<Paged<ActorAccount>>>PaginateByActorId(int actorId,int pageIndex,int pageSize)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<ActorAccount> pagedList = _service.GetByActorId(actorId, pageIndex,pageSize);
                if (pagedList == null)
                {
                    code = 404;
                }
                else
                {
                    response = new ItemResponse<Paged<ActorAccount>> { Item = pagedList };
                }
            }
            catch (Exception ex)
            {
                code=500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("zoneid/{id:int}")]
        public ActionResult<ItemsResponse<ActorAccount>>SelectAllByZoneId(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                List<ActorAccount> actAcc = _service.GetByZoneId(id);
                if(actAcc == null)
                {
                    code = 404;
                    response = new ErrorResponse("App not Found");
                }
                else
                {
                    response = new ItemsResponse<ActorAccount> { Items = actAcc };
                }
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(ActorAccountAddRequest model)
        {
            ObjectResult result = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.Add(model, userId);

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
        [Authorize(Roles = "SysAdmin")]
        public ActionResult<SuccessResponse> Update(ActorAccountUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.Update(model,userId);
                response = new SuccessResponse();
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpPut("{id:int}/status")]
        [Authorize(Roles = "SysAdmin")]
        public ActionResult<SuccessResponse> UpdateStatus(ActorAccountStatusUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdateStatus(model,userId);
                response = new SuccessResponse();
            }
            catch(Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
    }
}

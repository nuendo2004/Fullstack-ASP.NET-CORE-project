using Amazon.Runtime.Internal.Util;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Consequences;
using Sabio.Models.Requests.Consequences;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/consequences")]
    [ApiController]
    public class ConsequenceApiController : BaseApiController
    {
        private IConsequenceService _service = null;
        private IAuthenticationService<int> _authService = null;

        public ConsequenceApiController(
            IConsequenceService service,
            ILogger<PingApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Consequence>> GetById(int id)
        {
            int code = 200;

            BaseResponse response = null;

            try
            {
                Consequence consequence = _service.GetById(id);
                if(consequence == null)
                {
                    code = 404;
                    response = new ErrorResponse("Record Not Found");
                }
                else
                {
                    response = new ItemResponse<Consequence>() { Item = consequence };
                }
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(ConsequenceAddRequest model)
        {
            int code = 500;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.AddConsequence(model, userId);
                code = 201;
                response = new ItemResponse<int>()
                {
                    Item = id
                };
            }
            catch (Exception ex)
            {
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());

            }
            return StatusCode(code, response);
        }

        [HttpGet("actor/{actorId:int}")]
        public ActionResult<ItemResponse<Paged<Consequence>>> GetByActorId (int pageIndex, int pageSize, int actorId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Consequence> paged = _service.GetByActorId(pageIndex, pageSize, actorId);
                if(paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Record Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<Consequence>>()
                    {
                        Item = paged
                    };
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

        [HttpGet("zone/{ZoneId:int}")]
        public ActionResult<ItemsResponse<Consequence>> GetByZoneId(int zoneId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<Consequence> consequence = _service.GetByZoneId(zoneId);
                if(consequence == null)
                {
                    code = 404;
                    response = new ErrorResponse("Record Not Found");
                }
                else
                {
                    response = new ItemsResponse<Consequence>
                    {
                        Items = consequence
                    };
                }
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Consequence>>> Pagination(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<Consequence> paged = _service.Paged(pageIndex, pageSize);
                if(paged == null)
                {
                    code = 400;
                    response = new ErrorResponse("Records Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<Consequence>> { Item = paged};                
                }
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(ConsequenceUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdateConsequence(model, userId);
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

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                //userId for who modified it(record still there, not actually delted)?
                _service.UpdateDeleteConsequence(id);
                response = new SuccessResponse();
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.ToString());
            }
            return StatusCode(code, response);
        }
    }
}

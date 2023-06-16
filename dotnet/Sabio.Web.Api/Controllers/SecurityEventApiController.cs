using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Services.Interfaces;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using Sabio.Models.Requests;
using System;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.SecurityEvents;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Sabio.Models.Enums;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/securityevents")]
    [ApiController]
    public class SecurityEventApiController : BaseApiController
    {

        private ISecurityEventService _securityEventsService = null;
        private IAuthenticationService<int> _authService = null;
        public SecurityEventApiController(
            ISecurityEventService service,
            ILogger<PingApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _securityEventsService = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(SecurityEventAddRequest model)
        {
            int code = 500;
            BaseResponse response = null;

            try
            {
                int id = _securityEventsService.Create(model);
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

        [HttpGet("zone/{zoneId:int}")]
        public ActionResult<ItemResponse<Paged<SecurityEvent>>> GetByZoneId(int zoneId, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<SecurityEvent> paged = _securityEventsService.GetByZoneId(zoneId, pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found");
                }
                else
                {
                    response = new ItemResponse<Paged<SecurityEvent>>()
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

        [HttpGet("user")]
        public ActionResult<ItemResponse<Paged<SecurityEvent>>> GetByUserId(int userId, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<SecurityEvent> paged = _securityEventsService.GetByUserId(userId, pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found");
                }
                else
                {
                    response = new ItemResponse<Paged<SecurityEvent>>()
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

        [HttpGet("trainingunit")]
        public ActionResult<ItemResponse<Paged<SecurityEvent>>> GetByTrainingUnitId(int trainingUnitId, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<SecurityEvent> paged = _securityEventsService.GetByTrainingUnitId(trainingUnitId, pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found");
                }
                else
                {
                    response = new ItemResponse<Paged<SecurityEvent>>()
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

        [HttpGet("trainee/{traineeId:int}")]
        public ActionResult<ItemResponse<Paged<SecurityEvent>>> GetByTraineeId(int traineeId, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<SecurityEvent> paged = _securityEventsService.GetByTraineeId(traineeId, pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found");
                }
                else
                {
                    response = new ItemResponse<Paged<SecurityEvent>>()
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

        [HttpGet("traineeaccount")]
        public ActionResult<ItemResponse<Paged<SecurityEvent>>> GetByTraineeAccountId(int traineeAccountId, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<SecurityEvent> paged = _securityEventsService.GetByTraineeAccountId(traineeAccountId, pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found");
                }
                else
                {
                    response = new ItemResponse<Paged<SecurityEvent>>()
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

        [HttpGet("organizations/stats/{id:int}")]
        [Authorize(Roles = "SysAdmin")]
        public ActionResult<ItemsResponse<SecurityEventOrgStats>> GetOrganizationStats(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<List<SecurityEventOrgStats>> list = _securityEventsService.GetOrganizationStats(id);
                
                if(list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemsResponse<List<SecurityEventOrgStats>> { Items = list };
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
    }
}

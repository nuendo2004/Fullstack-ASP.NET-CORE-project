using Amazon.Runtime.Internal.Util;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain.JobSchedules;
using Sabio.Models.Requests.JobSchedules;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Data;
using System.Runtime.CompilerServices;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/jobschedules")]
    [ApiController]
    public class JobScheduleApiController : BaseApiController
    {

        private IJobScheduleService _service = null;
        private IAuthenticationService<int> _authService = null;

        public JobScheduleApiController(IJobScheduleService service, ILogger<PingApiController> logger, IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(JobScheduleAddRequest model)
        {
            int code = 500;
            BaseResponse response = null;
            int userId = _authService.GetCurrentUserId();

            try
            {
                int id = _service.Add(model, userId);
                code = 201;
                response = new ItemResponse<int>() { Item = id };
            }
            catch(Exception ex)
            {
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(JobScheduleUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            int userId = _authService.GetCurrentUserId();

            try
            {
                _service.Update(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet]
        public ActionResult<ItemResponse<JobSchedulesPending>> GetPending()
        {
            BaseResponse response = null;
            int code = 200;

            try
            {
                JobSchedulesPending jobSchedulesPending = _service.GetAllPending();

                if (jobSchedulesPending == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }

                else
                {
                    response = new ItemResponse<JobSchedulesPending>() { Item = jobSchedulesPending };
                   
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

        [HttpDelete("{id:int}")]
        public ActionResult Delete(int id)
        {
            int userId = _authService.GetCurrentUserId();
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Delete(id, userId);
                response = new SuccessResponse();
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
    }
}

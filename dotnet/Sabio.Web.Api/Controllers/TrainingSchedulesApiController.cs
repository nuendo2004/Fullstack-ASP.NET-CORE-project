using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.TrainingScheduleRequests;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/trainingschedules")]
    [ApiController]
    public class TrainingSchedulesApiController : BaseApiController
    {
        private ITrainingScheduleService _service = null;
        private IAuthenticationService<int> _authService = null;

        public TrainingSchedulesApiController(ITrainingScheduleService service,
            ILogger<TrainingSchedulesApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }


        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<TrainingSchedule>> Get(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                TrainingSchedule trainingSchedule = _service.Get(id);

                if (trainingSchedule == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<TrainingSchedule> { Item = trainingSchedule };
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
        [HttpGet("current")] 
        public ActionResult<ItemsResponse<TrainingSchedule>> GetNonePagination()
        {
            int iCode = 200;    
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                List<TrainingSchedule> schedules = _service.GetAllNonePagination(userId);
                if (schedules.Count == 0)
                {
                    iCode = 404;
                    response = new ErrorResponse("No training schedule found");
                }
                else
                     response = new ItemsResponse<TrainingSchedule> { Items = schedules };

            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(iCode, response) ;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Add(TrainingScheduleAddRequest model)
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
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result;
        }

        [HttpPut("delete/{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.Delete(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(TrainingScheduleUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {

                int userId = _authService.GetCurrentUserId();

                _service.Update(model, userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("paginate/user")]
        public ActionResult<ItemResponse<Paged<TrainingSchedule>>> GetAllCreatedBy(int pageIndex, int pageSize, int createdBy)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<TrainingSchedule> page = _service.GetAllCreatedBy(pageIndex, pageSize, createdBy);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<TrainingSchedule>> { Item = page };
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

        [HttpGet("paginate/trainingUnit")]
        public ActionResult<ItemResponse<Paged<TrainingSchedule>>> GetAllByTrainingUnitId(int pageIndex, int pageSize, int trainingUnitId)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<TrainingSchedule> page = _service.GetAllByTrainingUnitId(pageIndex, pageSize, trainingUnitId);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<TrainingSchedule>> { Item = page };
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
  

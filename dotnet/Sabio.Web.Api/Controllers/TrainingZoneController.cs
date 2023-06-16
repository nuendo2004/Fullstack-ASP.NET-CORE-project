using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Sabio.Data.Providers;
using Sabio.Models.Domain.TrainingZones;
using Sabio.Models.Enums;
using Sabio.Models.Requests.TrainingZones;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Security.Policy;

namespace Sabio.Web.Api.Controllers

{
    [Route("api/trainingZones")]
    [ApiController]
    public class TrainingZoneController : BaseApiController
    {
        private ITrainingZonesServices _service = null;
        private IAuthenticationService<int> _authService = null;
        public TrainingZoneController(ITrainingZonesServices service, IAuthenticationService<int> authService, ILogger<TrainingZoneController> logger) : base(logger)
        {
            _service = service;
            _authService = authService;
        }
        [HttpGet("trainees/{traineeId:int}")]
        [Authorize(Roles = "Trainee,OrgAdmin,OrgTrainer,SysAdmin")]
        public ActionResult GetById(int traineeId)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Training u = _service.GetTrainee(traineeId);
                if (u == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found");
                }
                else
                {
                    response = new ItemResponse<Training>() { Item = u };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Generic Error:${ex.Message}");
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);
        }

        [HttpGet("trainingunits/{trainingUnitId:int}")]
        [Authorize(Roles = "Trainee,OrgAdmin,OrgTrainer,SysAdmin")]
        public ActionResult GetByUnit(int trainingUnitId)
        {   int code = 200;
            BaseResponse response = null;
            try
            {
                Training u = _service.GetUnit(trainingUnitId);
                if (u == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found");
                }
                else
                {
                    response = new ItemResponse<Training>() { Item = u };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Generic Error:${ex.Message}");
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);
        }
        [HttpGet("trainingunits/{trainingUnitId:int}/zones/{zoneId:int}")]
        [Authorize(Roles = "Trainee,OrgAdmin,OrgTrainer,SysAdmin")]
        public ActionResult GetByZone(int trainingUnitId, int zoneId)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Training u = _service.Get(trainingUnitId, zoneId);
                if (u == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found");
                }
                else
                {
                   response = new ItemResponse<Training>() { Item = u };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Generic Error:${ex.Message}");
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }
         [HttpDelete("trainingunits/{trainingUnitId:int}/zones/{zoneId:int}")]
        [Authorize(Roles = "Trainee,OrgAdmin,OrgTrainer,SysAdmin")]
        public ActionResult<SuccessResponse> Delete(int trainingUnitId, int ZoneId)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.Delete(trainingUnitId, ZoneId, userId);
                 response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code=500;
                response = new ErrorResponse($"Generic Error:${ex.Message}");
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code,response);        
        }
        [HttpPost]
        [Authorize(Roles = "Trainee,OrgAdmin,OrgTrainer,SysAdmin")]
        public ActionResult<ItemResponse<int>> Create(TrainingZonesAddRequest model)
        {
            ObjectResult result;
            try
            {
                int userId = _authService.GetCurrentUserId();
            int id = _service.Add(model,userId);
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
    }
}

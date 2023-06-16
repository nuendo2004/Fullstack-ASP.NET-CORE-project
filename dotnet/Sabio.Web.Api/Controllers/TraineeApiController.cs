using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Trainees;
using Sabio.Models.Requests.Trainees;
using Sabio.Services;
using Sabio.Services.Security;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/trainees")]
    [ApiController]
    public class TraineeApiController: BaseApiController
    {
        private ITraineeService _service = null;
        private IAuthenticationService<int> _authService = null;
        public TraineeApiController(ITraineeService service
            , ILogger<TraineeApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }




        [HttpGet("{id:int}")]
        [Authorize(Roles = "OrgAdmin,OrgTrainer,SysAdmin,Trainee")]
        public ActionResult<ItemResponse<Trainee>> Get(int id)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                Trainee trainee = _service.Get(id);
                if (trainee == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Trainee> { Item = trainee };
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

        [HttpGet("unitid/{TrainingUnitId:int}")]
        public ActionResult<ItemsResponse<Trainee>> GetByTrainingUnitId1(int trainingUnitId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<Trainee> trainee = _service.GetByTrainingUnitId1(trainingUnitId);

                if (trainee == null)
                {
                    code = 404;
                    response = new ErrorResponse("Record Not Found");
                }
                else
                {
                    response = new ItemsResponse<Trainee> { Items = trainee };
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

        [HttpGet("userid/{id:int}")]
        [Authorize(Roles = "OrgAdmin,OrgTrainer,SysAdmin,Trainee")]
        public ActionResult<ItemResponse<Trainee>> GetByUserId(int id)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                Trainee trainee = _service.GetByUserId(id);
                if (trainee == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Trainee> { Item = trainee };
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
        [HttpGet("userids/{userId:int}")]
        [Authorize(Roles = "OrgAdmin,OrgTrainer,SysAdmin,Trainee")]
        public ActionResult<ItemsResponse<Trainee>> GetByTraineesUserId(int userId)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                List<Trainee> list = _service.GetTraineesByUserId(userId);
                if (list == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemsResponse<Trainee> { Items = list };
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
        [HttpGet("trainingunitid/{trainingUnitId:int}")]
        [Authorize(Roles = "OrgAdmin,OrgTrainer,SysAdmin,Trainee")]
        public ActionResult<ItemResponse<TraineesV2>> GetByTrainingUnitId(int trainingUnitId)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                List<TraineesV2> list = _service.GetByTrainingUnitId(trainingUnitId);
                if (list == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("TrainingUnit Resource not found.");
                }
                else
                {
                    response = new ItemsResponse<TraineesV2> { Items = list };
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

        [HttpGet("zonegroup/{zoneGroupId:int}")]
        public ActionResult<ItemsResponse<TraineeGroupMember>> GetByZoneGroupId(int zoneGroupId)
        {

            int code = 200;
            BaseResponse response = null;

            try
            {
                List<TraineeGroupMember> trainees = _service.GetByZoneGroupId(zoneGroupId);
                if (trainees == null)
                {
                    code = 404;
                    response = new ErrorResponse("Trainees not found");
                }
                else
                {
                    response = new ItemsResponse<TraineeGroupMember>
                    {
                        Items = trainees
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
        

        [HttpGet("trainingunit/{trainingUnitId:int}")]
        [Authorize(Roles = "OrgAdmin,OrgTrainer,SysAdmin")]
        public ActionResult<ItemResponse<List<TraineeV3>>> GetByTrainingUnitIdV2(int trainingUnitId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<TraineeV3> list = _service.GetByTrainingUnitIdV2(trainingUnitId);
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<List<TraineeV3>> { Item = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpPut("{id:int}")]
        [Authorize(Roles = "OrgAdmin,OrgTrainer,SysAdmin")]
        public ActionResult<ItemResponse<int>> UpdateTrainee(TraineeUpdateRequest model)
        {

            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                _service.UpdateTrainee(model, userId);

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
        [Authorize(Roles = "OrgAdmin,OrgTrainer,SysAdmin,Trainee")]
        public ActionResult<ItemResponse<int>> AddTrainee(TraineeAddRequest model)
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


        [HttpGet("organizationid/{organizationId:int}")]
        public ActionResult<ItemResponse<Paged<Trainee>>> GetByOrganzationId(int pageIndex, int pageSize, int organizationId)

        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<Trainee> paged = _service.GetByOrganizationIdPaged(pageIndex, pageSize, organizationId);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Trainee>> { Item = paged };
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

        [HttpGet("paginate")]
        [Authorize(Roles = "OrgAdmin,OrgTrainer,SysAdmin,Trainee")]
        public ActionResult<ItemResponse<Paged<Trainee>>> GetTraineeByPage(int pageIndex, int pageSize)

        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<Trainee> paged = _service.Pagination(pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Trainee>> { Item = paged };
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
        [Authorize(Roles = "OrgAdmin,OrgTrainer,SysAdmin,Trainee")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.Delete(id, userId);
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


    }
}
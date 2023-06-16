using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System.Data.SqlClient;
using System;
using Sabio.Models.Domain.TrainingUnits;
using System.Collections.Generic;
using Sabio.Models.Requests.TrainingUnits;
using Sabio.Models;
using System.Drawing.Printing;
using Sabio.Models.Domain.TrainingZones;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/trainingunits")]
    [ApiController]
    public class TrainingUnitApiController : BaseApiController
    {
        private ITrainingUnitService _service = null;
        private IAuthenticationService<int> _authService = null;
        public TrainingUnitApiController(ITrainingUnitService service
            , ILogger<TrainingUnitApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet("")]
        public ActionResult<ItemsResponse<TrainingUnit>> GetAll()
        {

            int code = 200;
            BaseResponse response = null;
            try
            {
                List<TrainingUnit> list = _service.GetAll();



                if (list == null)
                {
                    code = 404;

                    response = new ErrorResponse("TrainingUnits App not responding");

                }
                else
                {
                    response = new ItemsResponse<TrainingUnit> { Items = list };

                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }


        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<TrainingUnit>> GetById(int id)
        {

            int iCode = 200;

            BaseResponse response = null;

            try
            {
                TrainingUnit trainingUnit = _service.GetById(id);


                if (trainingUnit == null)
                {

                    iCode = 404;
                    response = new ErrorResponse("TrainingUnit Id not responding.");

                }
                else
                {
                    response = new ItemResponse<TrainingUnit> { Item = trainingUnit };


                }
            }


            catch (Exception ex)
            {
                iCode = 404;
                base.Logger.LogError(ex.ToString());

                response = new ErrorResponse($"Generic Errors {ex.Message}");



            }

            return StatusCode(iCode, response);
        }

        [HttpGet("{primaryTrainer}")]
        public ActionResult<ItemsResponse<TrainingUnitPrimaryTrainer>> GetPrimaryTrainer()
        {

            int code = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                List<TrainingUnitPrimaryTrainer> list = _service.GetByPrimaryTrainerId(userId);



                if (list == null)
                {
                    code = 404;

                    response = new ErrorResponse("App resource not found");

                }
                else
                {
                    response = new ItemsResponse<TrainingUnitPrimaryTrainer> { Items = list };

                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("organization/{orgId:int}")]
        public ActionResult<ItemResponse<Paged<TrainingUnit>>> GetSearchPage(int pageIndex, int pageSize, int query, int orgId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<TrainingUnit> page = _service.GetByOrgId(pageIndex, pageSize, query, orgId);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Organization Id App Resource not responding.");
                }
                else
                {
                    response = new ItemResponse<Paged<TrainingUnit>> { Item = page };
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

        [HttpGet("organization/nopagination/{orgId:int}")]
        public ActionResult<List<TrainingUnit>> GetNoPagination(bool hasStudent, int query, int orgId)
        {
            int code = 200;
            BaseResponse response;
            List<TrainingUnit> trainingUnits;
            try
            {   
                if (hasStudent)
                {
                    trainingUnits = _service.GetByOrgIdV3HasStudent(query, orgId);
                }
                else
                {
                    trainingUnits = _service.GetByOrgIdV3(query, orgId);
                }

                if (trainingUnits.Count == 0)
                {
                    code = 404;
                    response = new ErrorResponse("No training unit found in this organization.");
                }
                else
                {
                    response = new ItemsResponse<TrainingUnit> { Items = trainingUnits };
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

        [HttpPost("")]
        public ActionResult<ItemResponse<int>> Create(TrainingUnitAddRequest model)
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

        [HttpPut("{id:int}")]
        public ActionResult<ItemResponse<int>> Update(TrainingUnitUpdateRequest model)
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
        
        [HttpPut("{id:int}/status/statusId")]
        public ActionResult<ItemResponse<int>> UpdateStatus(TrainingUnitBaseUpdateRequest model )
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdateStatus(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

    }

}
        
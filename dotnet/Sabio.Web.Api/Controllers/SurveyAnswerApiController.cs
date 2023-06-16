using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Services.Interfaces;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Models.Domain.Surveys.Instances;
using Sabio.Web.Models.Responses;
using System;
using Sabio.Models;
using Sabio.Models.Requests.SurveysInstancesRequests;
using Sabio.Models.Requests.SurveyAnswers;
using Microsoft.AspNetCore.Authorization;
using Sabio.Models.Enums;
using Sabio.Models.Domain.Surveys.Answers;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/surveys/answers")]
    [ApiController]
    public class SurveyAnswerApiController : BaseApiController
    {
        private ISurveyAnswerService _service = null;
        private IAuthenticationService<int> _authService = null;

        public SurveyAnswerApiController(ISurveyAnswerService service, ILogger<SurveyAnswerApiController> logger, IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult<ItemResponse<int>> Create(List<SurveyAnswerAddRequest> models)
        {
            ObjectResult result = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.Add(models, userId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };
                result = Created201(response);
            }
            catch (Exception ex)
            {
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
                base.Logger.LogError(ex.ToString());
            }

            return result;
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<SurveyAnswer>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                SurveyAnswer answer = _service.Get(id);

                if (answer == null)
                {
                    code = 404;
                    response = new ErrorResponse("Survey Answer Not Found");
                }
                else
                {
                    response = new ItemResponse<SurveyAnswer> { Item = answer };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Generic Error: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);
        }


        [HttpGet("instance/{id:int}")]
        public ActionResult<ItemResponse<SurveyAnswer>> GetBySurveyInstanceId(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                SurveyAnswer answer = _service.GetBySurveyInstanceId(id);

                if (answer == null)
                {
                    code = 404;
                    response = new ErrorResponse("Survey Answer Not Found");
                }
                else
                {
                    response = new ItemResponse<SurveyAnswer> { Item = answer };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Generic Error: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);
        }

        [HttpGet("paginate")]
        [Authorize(Roles = "SysAdmin, OrgAdmin")]
        public ActionResult<ItemResponse<Paged<SurveyAnswer>>> GetAll(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<SurveyAnswer> page = _service.GetAll(pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<SurveyAnswer>> { Item = page };
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

        [HttpGet("user/{userId:int}")]
        public ActionResult<ItemResponse<Paged<SurveyAnswer>>> GetByCreatedBy(int pageIndex, int pageSize, int userId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<SurveyAnswer> page = _service.GetByCreatedBy(pageIndex, pageSize, userId);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<SurveyAnswer>> { Item = page };
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


        [HttpGet("survey/{surveyId:int}")]
        public ActionResult<ItemResponse<Paged<SurveyAnswer>>> GetBySurveyId(int pageIndex, int pageSize, int surveyId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<SurveyAnswer> page = _service.GetBySurveyId(pageIndex, pageSize, surveyId);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<SurveyAnswer>> { Item = page };
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

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(SurveyAnswerUpdateRequest model)
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
                _service.Delete(id);
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

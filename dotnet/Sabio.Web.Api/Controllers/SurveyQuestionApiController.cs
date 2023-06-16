using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Services.Interfaces;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Models.Domain;
using Sabio.Web.Models.Responses;
using System;
using Sabio.Models.Requests.SurveyQuestions;
using Sabio.Models;
using Google.Apis.AnalyticsReporting.v4.Data;
using Microsoft.AspNetCore.Authorization;
using Sabio.Models.Enums;
using Sabio.Models.Domain.Surveys.Questions;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/surveyquestions")]
    [ApiController]
    public class SurveyQuestionApiController : BaseApiController
    {
        private ISurveyQuestionService _service = null;
        private IAuthenticationService<int> _authService = null;

        public SurveyQuestionApiController(ISurveyQuestionService services
              , ILogger<SurveyQuestionApiController> logger
              , IAuthenticationService<int> authService) : base(logger)
        {
            _service = services;
            _authService = authService;
        }

        [HttpGet("{id:int}")]
        [Authorize(Roles = "SysAdmin, OrgAdmin")]
        public ActionResult<ItemResponse<SurveyQuestion>> GetSurveyQuestionById(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                SurveyQuestion aQuestion = _service.GetSurveyQuestionById(id);
                if (aQuestion == null)
                {
                    code = 404;
                    response = new ErrorResponse("App not found");
                }
                else
                {
                    response = new ItemResponse<SurveyQuestion> { Item = aQuestion };
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

        [HttpPost]
        [Authorize(Roles = "SysAdmin, OrgAdmin")]
        public ActionResult<ItemResponse<int>> Create(SurveyQuestionAddRequest model)
        {
            ObjectResult result = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.AddQuestion(model, userId);

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

        [HttpGet("pagination")]
        [Authorize(Roles = "SysAdmin, OrgAdmin")]
        public ActionResult<ItemResponse<Paged<SurveyQuestion>>> Pagination(int pageIndex, int pageSize)
        {
            ActionResult result = null;

            try
            {
                Paged<SurveyQuestion> paged = _service.Pagination(pageIndex, pageSize);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));
                }
                else
                {
                    ItemResponse<Paged<SurveyQuestion>> response = new ItemResponse<Paged<SurveyQuestion>>();
                    response.Item = paged;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message));
            }
            return result;
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "SysAdmin, OrgAdmin")]

        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.DeleteQuestion(id);


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
        [Authorize(Roles = "SysAdmin, OrgAdmin")]
        public ActionResult<SuccessResponse> Update(SurveyQuestionUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdateQuestion(model, userId);

                response = new SuccessResponse();


            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("{id:int}/pagination")]
        [Authorize(Roles = "SysAdmin, OrgAdmin")]
        public ActionResult<ItemResponse<Paged<SurveyQuestion>>> GetByCreatedBy(int id, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<SurveyQuestion> pagedList = _service.GetByCreator(id, pageIndex, pageSize);

                if (pagedList == null)
                {
                    code = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                    response = new ItemResponse<Paged<SurveyQuestion>>() { Item = pagedList };
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

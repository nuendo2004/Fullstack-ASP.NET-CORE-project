using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Surveys.Questions;
using Sabio.Models.Enums;
using Sabio.Models.Requests.SurveyQuestionAnswerOptions;
using Sabio.Models.Requests.SurveyQuestions;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/surveyquestionansweroptions")]
    [ApiController]
    public class SurveyQuestionAnswerOptionApiController : BaseApiController
    {
        private ISurveyQuestionAnswerOptionService _service = null;
        private IAuthenticationService<int> _authService = null;

        public SurveyQuestionAnswerOptionApiController(ISurveyQuestionAnswerOptionService services
              , ILogger<SurveyQuestionAnswerOptionApiController> logger
              , IAuthenticationService<int> authService) : base(logger)
        {
            _service = services;
            _authService = authService;
        }

        [HttpGet("{id:int}")]
        [Authorize(Roles = "SysAdmin, OrgAdmin")]
        public ActionResult<ItemResponse<SurveyQuestionAnswerOption>> GetSurveyOptionById(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                SurveyQuestionAnswerOption anOption = _service.GetSurveyOptionById(id);
                if (anOption == null)
                {
                    code = 404;
                    response = new ErrorResponse("App not found");
                }
                else
                {
                    response = new ItemResponse<SurveyQuestionAnswerOption> { Item = anOption };
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
        public ActionResult<ItemResponse<int>> Create(List<SurveyQuestionAnswerOptionAddRequestItem> model)
        {
            ObjectResult result = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.AddSurveyOption(model, userId);

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
        public ActionResult<ItemResponse<Paged<SurveyQuestionAnswerOption>>> Pagination(int pageIndex, int pageSize)
        {
            ActionResult result = null;

            try
            {
                Paged<SurveyQuestionAnswerOption> paged = _service.Pagination(pageIndex, pageSize);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));
                }
                else
                {
                    ItemResponse<Paged<SurveyQuestionAnswerOption>> response = new ItemResponse<Paged<SurveyQuestionAnswerOption>>();
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
                _service.DeleteSurveyOption(id);


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
        public ActionResult<SuccessResponse> Update(SurveyQuestionAnswerOptionUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
               // _service.UpdateSurveyOption(model, userId);

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
        public ActionResult<ItemResponse<Paged<SurveyQuestionAnswerOption>>> GetByCreator(int id, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<SurveyQuestionAnswerOption> pagedList = _service.GetByCreator(id, pageIndex, pageSize);

                if (pagedList == null)
                {
                    code = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                    response = new ItemResponse<Paged<SurveyQuestionAnswerOption>>() { Item = pagedList };
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

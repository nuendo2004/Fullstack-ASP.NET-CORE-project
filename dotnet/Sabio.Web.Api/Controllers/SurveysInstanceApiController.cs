using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Surveys.Instances;
using Sabio.Models.Enums;
using Sabio.Models.Requests.SurveysInstancesRequests;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Linq.Expressions;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/surveys/instances")]
    [ApiController]
    public class SurveysInstanceApiController : BaseApiController
    {
        private ISurveyInstanceService _service = null;
        private IAuthenticationService<int> _authService = null;

        public SurveysInstanceApiController(ISurveyInstanceService service, ILogger<SurveysInstanceApiController> logger, IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult<ItemResponse<int>> Create(SurveysInstanceAddRequest model)
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
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
                base.Logger.LogError(ex.ToString());
            }

            return result;
        }

        [HttpGet("{id:int}")]
        [Authorize(Roles = "SysAdmin, OrgAdmin")]
        public ActionResult<ItemResponse<SurveysInstance>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                SurveysInstance instance = _service.Get(id);

                if (instance == null)
                {
                    code = 404;
                    response = new ErrorResponse("Survey Instance Not Found");
                }
                else
                {
                    response = new ItemResponse<SurveysInstance> { Item = instance };
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

        [HttpGet("{id:int}/details")]
        [Authorize(Roles = "SysAdmin, OrgAdmin")]
        public ActionResult<ItemResponse<SurveyInstanceDetails>> GetDetailsById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                SurveyInstanceDetails details = _service.GetDetailsById(id);

                if (details == null)
                {
                    code = 404;
                    response = new ErrorResponse("Survey Instance Not Found");
                }
                else
                {
                    response = new ItemResponse<SurveyInstanceDetails> { Item = details };
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
        public ActionResult<ItemResponse<Paged<SurveysInstance>>> GetAll(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<SurveysInstance> page = _service.GetAll(pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<SurveysInstance>> { Item = page };
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
        [Authorize(Roles = "SysAdmin, OrgAdmin")]
        public ActionResult<ItemResponse<Paged<SurveysInstance>>> GetByCreatedBy(int pageIndex, int pageSize, int userId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<SurveysInstance> page = _service.GetByCreatedBy(pageIndex, pageSize, userId);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<SurveysInstance>> { Item = page };
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
        public ActionResult<SuccessResponse> Update(SurveysInstanceUpdateRequest model)
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

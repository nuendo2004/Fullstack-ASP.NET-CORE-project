using Amazon.Runtime.Internal.Util;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Surveys;
using Sabio.Models.Domain.Surveys.Details;
using Sabio.Models.Requests.Surveys;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/surveys")]
    [ApiController]
    public class SurveyApiController : BaseApiController
    {
        private ISurveyService _service = null;
        private IAuthenticationService<int> _authService = null;
        
        public SurveyApiController(ISurveyService service,
                ILogger<SurveyApiController> logger,
                IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }
        
        [HttpGet("{id:int}")]
        [Authorize(Roles = "SysAdmin, OrgAdmin, Trainee")]
        public ActionResult<ItemResponse<Survey>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;
            
            try
            {
                Survey survey = _service.GetSurvey(id);
                
                if (survey == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Survey> { Item = survey };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            
            return StatusCode(code, response);
        }

        [HttpGet]
        [Authorize(Roles = "SysAdmin, OrgAdmin, Trainee")]
        public ActionResult<ItemResponse<Paged<Survey>>> GetPaginate(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;
            
            try
            {
                Paged<Survey> page = _service.GetPaginate(pageIndex, pageSize);
                
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Survey>> { Item = page };
                }
                
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
                
            }
            return StatusCode(code, response);
        }

        [HttpGet("user/{userId:int}")]
        [Authorize(Roles = "SysAdmin")]
        public ActionResult<ItemResponse<Paged<Survey>>> GetCreatedBy(int pageIndex, int pageSize, int userId)
        {
            int code = 200;
            BaseResponse response = null;
            
            try
            {
                Paged<Survey> page = _service.GetCreatedBy(pageIndex, pageSize, userId);
                
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Survey>> { Item = page };
                }
                
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
                
            }
            return StatusCode(code, response);
        }
        
        [HttpPost]
        [Authorize(Roles = "SysAdmin, OrgAdmin")]
        public ActionResult<ItemResponse<int>> AddSurvey(SurveyAddRequest model)
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
                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }
            
            return result;
        }
        
        [HttpPut("{id:int}")]
        [Authorize(Roles = "SysAdmin")]
        public ActionResult<ItemResponse<int>> UpdateSurvey(SurveyUpdateRequest model)
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
        
        [HttpDelete("{id:int}")]
        [Authorize(Roles = "SysAdmin")]
        public ActionResult<SuccessResponse> DeleteSurvey(int id)
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
            }
            return StatusCode(code, response);
        }
        
        [HttpPost("search")]
        public ActionResult<ItemResponse<Paged<Survey>>> SearchPaginated(SurveySearchRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            
            try
            {
                Paged<Survey> page = _service.GetSearchPaginate(model);
                
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Survey>> { Item = page };
                }
                
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
                
            }
            return StatusCode(code, response);
        }
        
        [HttpGet("{id:int}/details")]
        public ActionResult<ItemResponse<SurveyDetails>> GetSurveyDetails(int id)
        {
            int code = 200;
            BaseResponse response = null;
            
            try
            {
                SurveyDetails survey = _service.GetSurveyDetails(id);
                
                if (survey == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found");
                }
                else
                {
                    response = new ItemResponse<SurveyDetails> { Item = survey };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            
            return StatusCode(code, response);
        }
        
        [HttpGet("details")]
        public ActionResult<ItemsResponse<Paged<SurveyDetails>>> GetSurveyDetailsPaginate(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;
            
            try
            {
                Paged<SurveyDetails> page = _service.GetSurveyDetailsPaginate(pageIndex, pageSize);
                
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<SurveyDetails>> { Item = page };
                }
                
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
                
            }
            return StatusCode(code, response);
        }   
        
    }
}
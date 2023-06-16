using Amazon.Runtime.Internal.Util;
using Google.Apis.AnalyticsReporting.v4.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.ShareStory;
using Sabio.Models.Requests.ShareStory;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/sharestories")]
    [ApiController]
    public class ShareStoryApiController : BaseApiController
    {
        private IShareStoryService _service = null;
        private IAuthenticationService<int> _authService = null;

        public ShareStoryApiController(IShareStoryService service
            ,ILogger<ShareStoryApiController> logger
            , IAuthenticationService<int> authService) : base(logger)

        {
            _service = service;
            _authService = authService;
        }

       
       
        [HttpPost]
        public ActionResult<ItemResponse<int>> AddStories(ShareStoryAddRequest mod,int userId )
        {
            ObjectResult result = null;

            try
            {
                userId = _authService.GetCurrentUserId();

                _service.AddStories(mod,userId);
                ItemResponse<int> response = new ItemResponse<int>();

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
        public ActionResult<ItemResponse<int>> UpdateStories(ShareStoryUpdateRequest model)
        {
           int userId = _authService.GetCurrentUserId();

            int code = 200;
            BaseResponse response = null;

            try 
            {
                _service.UpdateStories(model,userId);

                response = new SuccessResponse();
            }
            catch(Exception exe)
            {
                code = 500;
                response = new ErrorResponse(exe.Message);
                base.Logger.LogError(exe.ToString());
            }

            return StatusCode(code, response);
        }

        [HttpPut("approval/{id:int}")]
        [Authorize(Roles = "SysAdmin")]
        public ActionResult<ItemResponse<int>> UpdateApproval(ShareStoryUpdateApprovalRequest model )
        {
            int userId = _authService.GetCurrentUserId();
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.UpdateApproval(model,userId);

                response = new SuccessResponse();
            }
            catch (Exception exe)
            {
                code = 500;
                response = new ErrorResponse(exe.Message);
                base.Logger.LogError(exe.ToString());
            }

            return StatusCode(code, response);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<ShareStory>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                ShareStory Story = _service.GetById(id);

                if (Story == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Resource Not Found");

                }

                else
                {
                    response = new ItemResponse<ShareStory> { Item = Story };
                }
            }

            catch (Exception argEx)
            {
                iCode = 500;
                response = new ErrorResponse($"SqlException : { argEx.Message}");   
                base.Logger.LogError(argEx.ToString());
            }
            return StatusCode(iCode, response);
            }

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<ShareStory>>> GetPaginated(int pageIndex, int pageSize, bool isApproved)
        {
            ActionResult result = null;
            try
            {
                Paged<ShareStory> paged = _service.GetPaginated(pageIndex, pageSize, isApproved);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));

                }
                else
                {
                    ItemResponse<Paged<ShareStory>> response = new ItemResponse<Paged<ShareStory>>();
                    response.Item = paged;
                    result = Ok200(response);
                }
            }

            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;

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
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);

            }

            return StatusCode(code, response);

        }

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<ShareStory>>> SearchPaginated(int pageIndex, int pageSize, string query)
        {
            ActionResult result = null;
            try
            {
                Paged<ShareStory> paged = _service.SearchPaginated(pageIndex, pageSize, query);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));

                }
                else
                {
                    ItemResponse<Paged<ShareStory>> response = new ItemResponse<Paged<ShareStory>>();
                    response.Item = paged;
                    result = Ok200(response);
                }
            }

            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;

        }
    }

}


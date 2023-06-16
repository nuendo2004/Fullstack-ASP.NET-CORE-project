using Sabio.Models.Domain.Comments;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Requests.Comments;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using Sabio.Models;
using Microsoft.AspNetCore.Authorization;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentApiController : BaseApiController
    {
        private ICommentService _service = null;
        private IAuthenticationService<int> _authService = null;

        public CommentApiController(ICommentService service,
            ILogger<CommentApiController> logger,
            IAuthenticationService<int> authService) :base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Add(CommentAddRequest model)
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
            }

            return StatusCode(code, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(CommentUpdateRequest model)
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

        [HttpGet()]
        public ActionResult<ItemsResponse<Comment>> GetNestedComments(int entityId, int entityTypeId)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                List <Comment> comments = _service.GetNestedComments(entityId, entityTypeId);

                if(comments == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Comment not found.");
                }
               else
                {
                    response = new ItemsResponse<Comment> { Items = comments };
                }
            }
            catch(Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(iCode, response);
        }

        [HttpGet("userId/{userId:int}")]
        public ActionResult<ItemsResponse<Comment>> SelectByCreatedBy (int userId)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                List<Comment> comments = _service.SelectByCreatedBy(userId);

                if (comments == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Users not found.");
                }
                else
                {
                    response = new ItemsResponse<Comment> { Items = comments };
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
    }
}
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Blogs;
using Sabio.Models.Requests.Blogs;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/blogs")]
    [ApiController]
    public class BlogApiController : BaseApiController
    {
        private IBlogService _service = null;
        private IAuthenticationService<int> _authService = null;
        public BlogApiController(
            IBlogService service,
            ILogger<PingApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult<ItemResponse<Paged<Blog>>> GetAll(int pageIndex, int pageSize, bool isApproved, bool isPublished, bool isDeleted)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Blog> paged = _service.GetAll(pageIndex, pageSize, isApproved, isPublished, isDeleted);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found");
                }
                else
                {
                    response = new ItemResponse<Paged<Blog>>()
                    {
                        Item = paged
                    };
                };
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("type/{blogTypeId:int}")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<Paged<Blog>>> GetByType(int pageIndex, int pageSize, bool isApproved, bool isPublished, bool isDeleted, int blogTypeId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Blog> paged = _service.GetByType(pageIndex, pageSize, isApproved, isPublished, isDeleted, blogTypeId);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found");
                }
                else
                {
                    response = new ItemResponse<Paged<Blog>>()
                    {
                        Item = paged
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

        [HttpGet("author/{authorId:int}")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<Paged<Blog>>> GetByAuthorId(int pageIndex, int pageSize, bool isApproved, bool isPublished, bool isDeleted, int authorId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Blog> paged = _service.GetByAuthorId(pageIndex, pageSize, isApproved, isPublished, isDeleted, authorId);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found");
                }
                else
                {
                    response = new ItemResponse<Paged<Blog>>()
                    {
                        Item = paged
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

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<Blog>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Blog blog = _service.GetById(id);
                if (blog == null)
                {
                    code = 404;
                    response = new ErrorResponse("Record not found");
                }
                else
                {
                    response = new ItemResponse<Blog>()
                    {
                        Item = blog
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

        [HttpPost]
        [AllowAnonymous]
        public ActionResult<ItemResponse<int>> Create(BlogAddRequest model)
        {
            int code = 500;
            BaseResponse response = null;

            try
            {
                int authorId = _authService.GetCurrentUserId();
                int id = _service.Create(model, authorId);
                code = 201;
                response = new ItemResponse<int>()
                {
                    Item = id
                };

            }
            catch (Exception ex)
            {
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpPut("{id:int}")]
        [AllowAnonymous]
        public ActionResult<SuccessResponse> Update(BlogUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                _service.Update(model);
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

        [HttpPut("{id:int}/approval")]

        [Authorize(Roles ="SysAdmin")]
        public ActionResult<SuccessResponse> UpdateApproval(int id, bool isApproved)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                _service.UpdateApproval(id, isApproved, userId);
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

        [HttpPut("{id:int}/delete")]
        [AllowAnonymous]
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

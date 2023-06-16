using Amazon.Runtime.Internal.Util;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Enums;
using Sabio.Models.Requests.Avatars;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/avatars")]
    [ApiController]
    public class AvatarController : BaseApiController
    {
        private IAvatarService _service = null;
        private IAuthenticationService<int> _authService = null;

        public AvatarController(IAvatarService service
            ,ILogger<AvatarController> logger
            ,IAuthenticationService<int> authService) :base(logger)
        {
            _service = service;
            _authService = authService;
        }
        [HttpGet]
        public ActionResult<ItemsResponse<List<Avatar>>> GetAll()
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                List<Avatar> list = _service.GetAll();
                if(list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application not found");
                }
                else
                {
                   response = new ItemsResponse<Avatar> { Items = list};
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
        public ActionResult<ItemResponse<Avatar>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
               Avatar avatar = _service.GetById(id);
                if (avatar == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application not found");
                }
                else
                {
                    response = new ItemResponse<Avatar> { Item = avatar };
                }
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }
        [HttpGet("paginate/search")]
        public ActionResult<ItemResponse<Paged<Avatar>>> Pagination(int pageIndex, int pageSize, string query)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<Avatar> pagedList = _service.GetPaged(pageIndex, pageSize, query);
                if (pagedList == null)
                {
                    code = 404;
                    response = new ErrorResponse("App not found");
                }
                else
                {
                    response = new ItemResponse<Paged<Avatar>> { Item = pagedList };
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
        [HttpPut("delete/{id:int}")]
        [Authorize(Roles = "SysSupport")]
        public ActionResult<SuccessResponse> UpdateDelete(AvatarUpdateDelete model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.UpdateDelete(model);
                response = new SuccessResponse();
            }
            catch( Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
        [HttpPut("{id:int}")]
        [Authorize(Roles = "SysSupport")]
        public ActionResult<SuccessResponse> Update(UpdateAvatarRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.Update(model);
                response = new SuccessResponse();
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
        [Authorize(Roles = "SysSupport")]
        public ActionResult<SuccessResponse> CreateAvatar(List<AvatarAddRequest> model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.Create(model);
                response = new SuccessResponse();
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

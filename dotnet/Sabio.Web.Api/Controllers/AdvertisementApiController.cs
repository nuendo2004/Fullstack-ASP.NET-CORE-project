using Amazon.Runtime.Internal.Util;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Advertisements;
using Sabio.Models.Requests.Advertisements;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/advertisements")]
    [ApiController]
    public class AdvertisementApiController : BaseApiController
    {
        private IAdvertisementService _service = null;
        private IAuthenticationService<int> _authService = null;

        public AdvertisementApiController(IAdvertisementService service,
            IAuthenticationService<int> authService,
            ILogger<AdvertisementApiController> logger) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet]
        public ActionResult<ItemResponse<Paged<Advertisement>>> GetAll(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Advertisement> pagedList = _service.GetAll(pageIndex, pageSize);

                if (pagedList == null)
                {
                    code = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                    response = new ItemResponse<Paged<Advertisement>>() { Item = pagedList };
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("user/{userId:int}")]
        public ActionResult<ItemResponse<Paged<Advertisement>>> GetByCreatedBy(int userId, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Advertisement> pagedList = _service.GetByCreatedBy(userId, pageIndex, pageSize);

                if (pagedList == null)
                {
                    code = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                    response = new ItemResponse<Paged<Advertisement>>() { Item = pagedList };
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Advertisement>> Get(int id)
        {
            int code = 200;
            Advertisement ad = null;
            BaseResponse response = null;

            try
            {
                ad = _service.Get(id);

                if(ad == null)
                {
                    code = 404;
                    response = new ErrorResponse("App resource not found.");
                }
                else
                    response = new ItemResponse<Advertisement>() { Item = ad };
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(AdvertisementAddRequest model)
        {
            ObjectResult result;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.Add(model, userId);
                ItemResponse<int> response = new ItemResponse<int> { Item = id };
                result = Created201(response);
            }
            catch(Exception ex)
            {
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }

            return result;
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            int userId = _authService.GetCurrentUserId();
            BaseResponse response = null;

            try
            {
                _service.Delete(id, userId);
                response = new SuccessResponse();
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(AdvertisementUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.Update(model, userId);
                response = new SuccessResponse();
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpPut("{id:int}/{isDisabled:bool}")]
        public ActionResult<SuccessResponse> UpdateStatus(int id, bool isDisabled)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdateStatus(id, userId, isDisabled);
                response = new SuccessResponse();
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }
    }
}

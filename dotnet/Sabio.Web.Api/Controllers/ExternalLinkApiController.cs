using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain;
using Sabio.Services.Interfaces;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System.Collections.Generic;
using System;
using Sabio.Models.Requests.Faqs;
using Microsoft.AspNetCore.Authorization;
using Sabio.Models.Requests.ExternalLink;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/externallinks")]
    [ApiController]
    public class ExternalLinksApiController : BaseApiController
    {
        private IExternalLinkService _ExternalLinksService = null;
        private IAuthenticationService<int> _authenticationService = null;

        public ExternalLinksApiController(IExternalLinkService service
            , ILogger<ExternalLinksApiController> logger
            , IAuthenticationService<int> authenticationService) : base(logger)
        {
            _ExternalLinksService = service;
            _authenticationService = authenticationService;
        }

        [HttpGet("{creatorid:int}")]
        [AllowAnonymous]
        public ActionResult<ItemsResponse<ExternalLink>> GetByCreated(int creatorid)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<ExternalLink> list = _ExternalLinksService.GetByCreated(creatorid);

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemsResponse<ExternalLink> { Items = list };
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
        
        [HttpDelete("{id:int}")]
        [AllowAnonymous]
        public ActionResult<SuccessResponse> DeleteById(int Id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _ExternalLinksService.DeleteById(Id);

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
        
        public ActionResult<ItemResponse<int>> Update(ExternalLinkUpdateRequest model, int Id)
        {

            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authenticationService.GetCurrentUserId();
                _ExternalLinksService.Update(model, Id, userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult<ItemResponse<int>> Add(ExternalLinkAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authenticationService.GetCurrentUserId();

                int id = _ExternalLinksService.Add(model, userId);

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

        [HttpPost("batch")]
        [AllowAnonymous]
        public ActionResult<SuccessResponse> AddByBatch(ExternalLinkBatchAddRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authenticationService.GetCurrentUserId();

                _ExternalLinksService.AddByBatch(model, userId);

                response = new SuccessResponse();
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


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

namespace Sabio.Web.Api.Controllers
{
    [Route("api/faqs")]
    [ApiController]
    public class FaqApiController : BaseApiController
    {
        private IFaqService _faqService = null;
        private IAuthenticationService<int> _authenticationService = null;

        public FaqApiController(IFaqService service
            , ILogger<FaqApiController> logger
            , IAuthenticationService<int> authenticationService) : base(logger)
        {
            _faqService = service;
            _authenticationService = authenticationService;
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult<ItemsResponse<Faqs>> GetAllFaqs()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<Faqs> list = _faqService.GetAllFaqs();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemsResponse<Faqs> { Items = list };
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

        [HttpGet("{CategoryId:int}")]
        [AllowAnonymous]

        public ActionResult<ItemResponse<Faqs>> GetFaqByCatId(int CategoryId)
        {
            int iCode = 200;
            BaseResponse response = null;
            Faqs faqs = null;

            try
            {
                faqs = _faqService.GetFaqByCatId(CategoryId);

                if (faqs == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Faqs> { Item = faqs };
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

        [HttpPost]
        [Authorize(Roles = "SysAdmin")]
        public ActionResult<ItemResponse<int>> FaqAdd(FaqAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authenticationService.GetCurrentUserId();

                int id = _faqService.FaqAdd(model, userId);
                                
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

        [HttpPut("{id:int}")]
        [Authorize(Roles = "SysAdmin")]
        public ActionResult<ItemResponse<int>> FaqUpdate(FaqUpdateRequest model)
        {

            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authenticationService.GetCurrentUserId();
                _faqService.FaqUpdate(model, userId);

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
        public ActionResult<SuccessResponse> FaqDeleteById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _faqService.FaqDeleteById(id);

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

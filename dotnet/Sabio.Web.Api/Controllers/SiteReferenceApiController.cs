using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using Stripe;
using System;
using System.Collections.Generic;
using static Google.Apis.Requests.BatchRequest;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/sitereferences")]
    [ApiController]
    public class SiteReferenceApiController : BaseApiController
    {
        IAuthenticationService<int> _authService = null;
        ISiteReferenceService _siteReferenceService = null;

        public SiteReferenceApiController(IAuthenticationService<int> authService
            , ISiteReferenceService siteReferenceService
            , ILogger<NewsletterTemplateApiController> logger) : base(logger)
        {
            _authService = authService;
            _siteReferenceService = siteReferenceService;
        }

        [HttpGet]
        public ActionResult<ItemResponse<Paged<SiteReference>>> GetAllPaged(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<SiteReference> page = _siteReferenceService.SelectAll(pageIndex, pageSize);
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                {
                    response = new ItemResponse<Paged<SiteReference>>() { Item = page };
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
        
        [HttpGet("summary")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<List<ReferenceTypeSummary>>> GetSummary()
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                List<ReferenceTypeSummary> list = _siteReferenceService.SelectSummary();
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                {
                    response = new ItemResponse<List<ReferenceTypeSummary>>() { Item = list };
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
    }
}

using Google.Apis.AnalyticsReporting.v4.Data;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Sabio.Models;
using Sabio.Models.AppSettings;
using Sabio.Models.Domain;
using Sabio.Models.Domain.GoogleAnalytics;
using Sabio.Models.Requests;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using Stripe;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/analytics")]
    [ApiController]
    public class GoogleAnalyticsController : BaseApiController
    {
        private IGoogleAnalyticsService _service = null;
        public GoogleAnalyticsController(IGoogleAnalyticsService service,
            ILogger<GoogleAnalyticsController> logger) : base(logger)
                {
                    _service = service;
                }


        [HttpPost("")]
        public ActionResult<ItemResponse<GoogleAnalytics>> GetAnalytics(GoogleAnalyticsRequest model)
        {
            int code = 200;
            GetReportsResponse response = null;
            BaseResponse baseResponse = null;
            
            try
            {
                response = _service.Google(model);
            }
            catch (Exception ex)
            {
                code = 500;
                baseResponse = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }
    }
}

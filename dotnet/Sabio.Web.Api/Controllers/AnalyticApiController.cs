using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Services.Interfaces;
using Sabio.Services;
using Sabio.Web.Controllers;
using Microsoft.AspNetCore.Authorization;
using Sabio.Web.Models.Responses;
using Sabio.Models.Domain.Analytics;
using System;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/analytics")]
    [ApiController]
    public class AnalyticApiController : BaseApiController
    {
        private IAnalyticService _service = null;
        private IAuthenticationService<int> _authService = null;

        public AnalyticApiController
            (
                IAnalyticService service,
                IAuthenticationService<int> authService,
                ILogger<AnalyticApiController> logger
            ) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet("stats")]
        [Authorize(Roles = "SysAdmin")]
        public ActionResult<ItemResponse<Analytic>> GetStats()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Analytic stats = _service.GetStats();

                if(stats == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemResponse<Analytic> { Item = stats };
                }
            }
            catch(Exception ex)
            {
                code = 404;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);
        }
    }
}

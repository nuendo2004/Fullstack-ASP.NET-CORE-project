using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Zones;
using Sabio.Models.Requests.ZoneTokens;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/zonetokens")]
    [ApiController]
    public class ZoneTokenApiController : BaseApiController
    {
        private ILogger _logger;
        private IAuthenticationService<int> _authService = null;
        private IZoneTokenService _service = null;
        public ZoneTokenApiController(IZoneTokenService service, ILogger<ZoneApiController> logger, IAuthenticationService<int> authService) : base(logger)
        {
            _logger = logger;
            _service = service;
            _authService = authService;
        }
        [HttpPost]
        public ActionResult<ItemResponse<string>> Add(ZoneTokenAddRequest model)
        {
            ObjectResult result;

            try
            {
                int userId = _authService.GetCurrentUserId();
                string token= _service.Add(model, userId);
                ItemResponse<string> response = new ItemResponse<string> { Item = token };

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

        [HttpGet("{token}")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<ZoneToken>> GetByToken(string token)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {

                ZoneToken zone = _service.GetByToken(token);

                if (zone == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found");
                }
                else
                {
                    response = new ItemResponse<ZoneToken> { Item = zone };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic: ${ex.Message}");
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(iCode, response);

        }

        [HttpGet("typeid")]
        public ActionResult<ItemResponse<Paged<ZoneToken>>> GetByTokenTypeId(int typeId, int pageIndex, int pageSize )
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                Paged<ZoneToken> page = _service.GetByTokenTypeId(typeId, pageIndex, pageSize);
                if (page == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found");
                }
                else
                {
                    response = new ItemResponse<Paged<ZoneToken>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic: ${ex.Message}");
            }
            return StatusCode(iCode, response);
        }



        [HttpDelete("{token}")]
        public ActionResult<ItemResponse<int>> DeleteZoneToken(string token)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
               
                _service.DeleteZoneToken(token);
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

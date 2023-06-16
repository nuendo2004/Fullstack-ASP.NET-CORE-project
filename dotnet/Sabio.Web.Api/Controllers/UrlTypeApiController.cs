using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System.Collections.Generic;
using System;


namespace Sabio.Web.Api.Controllers
{

    [Route("api/urltype")]
    [ApiController]
    public class UrlTypeApiController : BaseApiController
    {
        ILookUpService _lookupService = null;
  
        public UrlTypeApiController(ILookUpService service
            , ILogger<UrlTypeApiController> logger
            ) : base(logger)
        {
            _lookupService = service;
        }

     [HttpGet]

        public ActionResult<ItemsResponse<LookUp>> GetAll()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<LookUp> list = _lookupService.GetLookUp("UrlTypes");

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemsResponse<LookUp> { Items = list };
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
    }
}

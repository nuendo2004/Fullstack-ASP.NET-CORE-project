using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models;
using Sabio.Services.Interfaces;
using Sabio.Services;
using Sabio.Web.Models.Responses;
using System.Collections.Generic;
using System;
using Sabio.Web.Controllers;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/referencetypes")]
    [ApiController]
    public class ReferenceTypesApiController : BaseApiController
    {
        IReferenceTypesService _referenceTypesService = null;

        public ReferenceTypesApiController(IReferenceTypesService referenceTypesService
            , ILogger<NewsletterTemplateApiController> logger) : base(logger)
        {
           _referenceTypesService = referenceTypesService;
        }
        
        [HttpGet]
        public ActionResult<ItemResponse<List<ReferenceType>>> GetSummary()
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                List<ReferenceType> list = _referenceTypesService.SelectAll();
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                {
                    response = new ItemResponse<List<ReferenceType>>() { Item = list };
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


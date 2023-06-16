using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain;
using Sabio.Models.Domain.TrainingZones;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/lookups")]
    [ApiController]
    public class LookUpApiController : BaseApiController
    {

        private ILookUpService _lookUpService = null;
        private IAuthenticationService<int> _authenticationService = null;
        public LookUpApiController(ILookUpService service
            , ILogger<LookUpApiController> logger
            , IAuthenticationService<int> authenticationService) : base(logger)
        {
            _lookUpService = service;
            _authenticationService = authenticationService;
        }

        [HttpPost()]
        public ActionResult<ItemResponse<Dictionary<string, List<LookUp>>>> GetType(string[] tableNames)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Dictionary<string, List<LookUp>> lookup = _lookUpService.GetMany(tableNames);

                if (lookup == null)
                {
                    code = 404;
                    response = new ErrorResponse("Not Found");
                }
                else
                {
                    response = new ItemResponse<Dictionary<string, List<LookUp>>> { Item = lookup };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }


        [HttpGet("states")]
        public ActionResult<ItemsResponse<State>> GetAllUSAStates()
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                List<State> states = _lookUpService.GetStates();

                if (states == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource Not Found.");
                }
                else
                {
                    response = new ItemsResponse<State> { Items = states };
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




        [HttpGet("spreadlevels")]
        public ActionResult<ItemsResponse<SpreadLevel>> GetSpreadLevels()
        {
            List<SpreadLevel> list = _lookUpService.GetSpreadLevels();
            ItemsResponse<SpreadLevel> response = new ItemsResponse<SpreadLevel>();
            response.Items = list;
            if (list == null)
            {
                return NotFound404(response);
            }
            else
            {
                return Ok(response);
            }


        }
       
    }
}
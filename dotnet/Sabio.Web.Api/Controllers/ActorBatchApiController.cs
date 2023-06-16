using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Requests.Actors;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/actorsbatch")]
    [ApiController]
    public class ActorBatchApiController : BaseApiController
    {
        private IActorBatchService _actorBatchService = null;
        private IAuthenticationService<int> _authService = null;

        public ActorBatchApiController(IActorBatchService actorBatchService, ILogger<ActorBatchApiController> logger, IAuthenticationService<int> authService) : base(logger)
        {
            _actorBatchService = actorBatchService;
            _authService = authService;
        }
        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(ComprehensiveActorAccountAddRequest request)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _actorBatchService.AddActorBatch(request, userId);
                code = 201;
                response = new ItemResponse<int>() { Item = id };
            }
            catch (Exception ex)
            {
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<ActorBatch>>> GetPaginated(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<ActorBatchV2> page = _actorBatchService.GetAllActorsPaginated(pageIndex, pageSize); 

                if(page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found");
                }
                else
                {
                    response = new ItemResponse<Paged<ActorBatchV2>> { Item = page };
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

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<ActorBatchV2>>> GetByActorName(int pageIndex, int pageSize, string actorName)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<ActorBatchV2> page = _actorBatchService.GetActorByActorName(pageIndex, pageSize, actorName);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                {
                    response = new ItemResponse<Paged<ActorBatchV2>> { Item = page };
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

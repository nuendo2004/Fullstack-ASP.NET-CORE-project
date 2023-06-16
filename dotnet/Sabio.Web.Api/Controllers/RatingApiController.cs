using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Services.Interfaces;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using Stripe;
using System;
using Sabio.Models.Requests.Ratings;
using Sabio.Models.Domain.Ratings;
using Sabio.Models;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/ratings")]
    [ApiController]
    public class RatingApiController : BaseApiController
    {
        private IRatingService _service = null;
        private IAuthenticationService<int> _authService = null;
        private ILookUpService _lookUpService = null;

        public RatingApiController(ILookUpService lookUpService,
            IRatingService service,
            IAuthenticationService<int> authService,
            ILogger<RatingApiController> logger) : base(logger)

        {
            _service = service;
            _authService = authService;
            _lookUpService = lookUpService;
        }


        [HttpPost]
        public ActionResult<ItemResponse<int>> Add(RatingAddRequest model)
        {
            ObjectResult result;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.Add(model, userId);
                ItemResponse<int> response = new ItemResponse<int> { Item = id };
                result = Created201(response);
            }
            catch (Exception ex)
            {
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
                Logger.LogError(ex.ToString());
            }

            return result;
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Rating>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {

                Rating rating = _service.GetById(id);

                if (rating == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found");
                }
                else
                {
                    response = new ItemResponse<Rating> { Item = rating };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;           
                response = new ErrorResponse($"Generic: ${ex.Message}");
                Logger.LogError(ex.ToString());
            }

            return StatusCode(iCode, response);

        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(RatingUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.Update(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);
        }

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Rating>>> SelectAllPaginated(int pageIndex, int pageSize)
        {
            ActionResult result;
            try
            {
                Paged<Rating> paged = _service.SelectAllPaginated(pageIndex, pageSize);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));
                }
                else
                {
                    ItemResponse<Paged<Rating>> response = new ItemResponse<Paged<Rating>>();
                    response.Item = paged;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
                Logger.LogError(ex.ToString());
            }
            return result;
        }

        [HttpDelete("{id:int}")]
        public ActionResult<ItemResponse<int>> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.Delete(id, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("average")]
        public ActionResult<ItemsResponse<RatingBase>> GetAverage(int entityId, int entityTypeId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<RatingBase> list = _service.GetRatingsAverage(entityId, entityTypeId);

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records Not Found");
                }
                else
                {
                    response = new ItemsResponse<RatingBase> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }
    }
}

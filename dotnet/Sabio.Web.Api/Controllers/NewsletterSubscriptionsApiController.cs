using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.NewsletterSubscriptions;
using Sabio.Models.Requests;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/newslettersubscriptions")]
    [ApiController]
    public class NewsletterSubscriptionsApiController : BaseApiController
    {
        private INewsletterSubscriptionsService _service = null;
        public NewsletterSubscriptionsApiController(INewsletterSubscriptionsService service, ILogger<NewsletterSubscriptionsApiController> logger) : base(logger)
        {
            _service = service;
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult<ItemResponse<int>> Create(NewsletterSubscriptionAddRequest model)
        {
            ObjectResult result = null;
            try
            {
                string email = _service.Create(model);
                ItemResponse<string> response = new ItemResponse<string>() { Item = email };
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

        [HttpPut("subscribed")]
        [AllowAnonymous]
        public ActionResult<SuccessResponse> UpdateSubscription(NewsletterSubcriptionUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.UpdateSubscription(model);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Generic Error: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("paged")]
        public ActionResult<ItemResponse<Paged<NewsletterSubscription>>> GetAllPaged(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<NewsletterSubscription> page = _service.GetAllPaged(pageIndex, pageSize);
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resourse not found");
                }
                else
                {
                    response = new ItemResponse<Paged<NewsletterSubscription>>() { Item = page };
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

        [HttpGet("subscribed/{isSubscribed:bool}")]
        public ActionResult<ItemsResponse<NewsletterSubscription>> GetAllIsSubscribed(bool isSubscribed)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                List<NewsletterSubscription> list = _service.GetAllByIsSubcribed(isSubscribed);
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resourse not found.");
                }
                else
                {
                    response = new ItemsResponse<NewsletterSubscription>() { Items = list };
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

        [HttpGet("datetime")]
        public ActionResult<ItemsResponse<NewsletterSubscriptionsPerMonth>> GetByDate(string startDate,string endDate)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                List<NewsletterSubscriptionsPerMonth> list = _service.GetByDate(startDate,endDate);
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resourse not found.");
                }
                else
                {
                    response = new ItemsResponse<NewsletterSubscriptionsPerMonth>() { Items = list };
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

        [HttpGet("paged/subscribed/{isSubscribed:bool}")]
        public ActionResult<ItemResponse<Paged<NewsletterSubscription>>> GetPagedIsSubscribed(int pageIndex, int pageSize, bool isSubscribed)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<NewsletterSubscription> page = _service.GetPagedByIsSubcribed(pageIndex, pageSize,isSubscribed);
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resourse not found");
                }
                else
                {
                    response = new ItemResponse<Paged<NewsletterSubscription>>() { Item = page };
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

        [HttpGet("search/subscribed/{isSubscribed:bool}")]
        public ActionResult<ItemResponse<Paged<NewsletterSubscription>>> SearchPaginated(int pageIndex, int pageSize, bool isSubscribed,string query)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<NewsletterSubscription> page = _service.SearchPagedByIsSubcribed(pageIndex, pageSize, isSubscribed,query);
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resourse not found");
                }
                else
                {
                    response = new ItemResponse<Paged<NewsletterSubscription>>() { Item = page };
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

using System;
using System.Collections.Generic;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Sabio.Models;
using Sabio.Models.AppSettings;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Subscriptions;
using Sabio.Models.Domain.Transactions;
using Sabio.Models.Enums;
using Sabio.Models.Interfaces;
using Sabio.Models.Requests.Subscribe;
using Sabio.Models.Requests.Transactions;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using Stripe;
using Stripe.Checkout;
using Subscription = Sabio.Models.Domain.Subscriptions.Subscription;

namespace Sabio.Web.Api
{
    [Route("api/stripe")]
    [ApiController]
    public class StripeApiController : BaseApiController
    {
        private IStripeService _service = null;
        private IAuthenticationService<int> _authService = null;
        private AppKeys _appKeys;
        public StripeApiController(IStripeService service
            , ILogger<StripeApiController> logger
            , IAuthenticationService<int> authService
            , IOptions<AppKeys> appKeys) : base(logger)
        {
            _service = service;
            _authService = authService;
            _appKeys = appKeys.Value;
        }

        [HttpPost("checkout")]
        [Authorize(Roles = "Customer, OrgAdmin, SysAdmin")]
        public ActionResult<ItemResponse<string>> CreateCheckout()
        {
            ObjectResult result = null;

            try
            {

                string sessionId = _service.CreateSession();
                ItemResponse<string> response = new ItemResponse<string>() { Item = sessionId };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result;
        }

        [HttpPost("createcustomer")]
        [Authorize(Roles = "Customer, OrgAdmin, SysAdmin")]
        public ActionResult<ItemResponse<object>> CreateCustomer()
        {
            ObjectResult result = null;

            try
            {
                object customerId = _service.CreateCustomer();
                ItemResponse<object> response = new ItemResponse<object>() { Item = customerId };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result;
        }

        [HttpPost("transaction")]
        [Authorize(Roles = "Customer, OrgAdmin, SysAdmin")]
        public ActionResult<ItemResponse<int>> CreateTransaction(TransactionAddRequest model, int tId)
        {
            ObjectResult result = null;
            try
            {
                int transactionId = _authService.GetCurrentUserId();
                int id = _service.CreateTransaction(model, tId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);
            }
            catch(Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }
            return result;
        }

        [HttpGet("{id:int}")]
        [Authorize(Roles = "OrgAdmin, SysAdmin")]
        public ActionResult<ItemResponse<Transaction>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Transaction transaction = _service.GetById(id);

                if(transaction == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found");
                }
                else
                {
                    response = new ItemResponse<Transaction> { Item = transaction };
                }
            }
            catch(Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: ${ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpGet]
        [Authorize(Roles = "Customer, OrgAdmin, SysAdmin")]
        public ActionResult<ItemsResponse<Transaction>> GetAll()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<Transaction> list = _service.GetAllByOrderId();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                {
                    response = new ItemsResponse<Transaction>() { Items = list };
                }
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("paginate")]
        [Authorize(Roles = "Customer, OrgAdmin, SysAdmin")]
        public ActionResult<ItemResponse<Paged<Transaction>>> GetPage(int pageIndex, int pageSize, int createdBy)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Transaction> page = _service.GetCreatedBy(pageIndex, pageSize, createdBy);

                if(page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App resource not found");
                }
                else
                {
                    response = new ItemResponse<Paged<Transaction>> { Item = page };
                }
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }
        [HttpPost("subscription")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<string>> CreateSubscription(string priceId)
        {
            ObjectResult result = null;

            try
            {
                string sessionId = _service.SubscribeSession(priceId);
                ItemResponse<string> response = new ItemResponse<string>() { Item = sessionId };

                result = Created201(response);
            }
            catch(Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result;
        }
        [HttpGet("subscription/{id:int}")]
        [Authorize(Roles = "Customer, OrgAdmin, SysAdmin")]
        public ActionResult<ItemResponse<Subscription>> GetSub(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Subscription subscription = _service.GetSubId(id);

                if(subscription == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found");
                }
                else
                {
                    response = new ItemResponse<Subscription> { Item = subscription };
                }
            }
            catch(Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpGet("subscriptionall")]
        [Authorize(Roles = "OrgAdmin, SysAdmin")]
        [AllowAnonymous]
        public ActionResult<ItemsResponse<Subscription>> SubGetAll()
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                List<Subscription> list = _service.SubGetAll();

                if(list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found");
                }
                else
                {
                    response = new ItemsResponse<Subscription> { Items = list };
                }
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }
        [HttpPost("subscribed")]
        [Authorize(Roles = "Customer, OrgAdmin, SysAdmin")]
        public ActionResult<ItemResponse<int>> CreateSubscribed(SubscribeAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int subId = _service.CreateSubscription(model, userId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = subId };

                result = Created201(response);
            }
            catch(Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result;
        }
        [HttpPost("success")]
        [Authorize(Roles = "Customer, OrgAdmin, SysAdmin")]
        public ActionResult<ItemResponse<int>> AddSubscription(string session_Id)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.AddSubscription(session_Id, userId);

                ItemResponse<int> response = new ItemResponse<int>() { Item = id };
                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result;
        }
        [HttpGet]
        [Authorize(Roles = "Customer, OrgAdmin, SysAdmin")]
        public ActionResult<ItemResponse<Subscribe>> SubscribeByIdPaginated(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Subscribe subscribe = _service.GetSubscribeByIdPaginated(id);

                if(subscribe == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found");
                }
                else
                {
                    response = new ItemResponse<Subscribe> { Item = subscribe };
                }
            }
            catch(Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }
        [HttpPost("newinvoice")]
        [Authorize(Roles = "Customer,SysAdmin")]
        public ActionResult<ItemResponse<object>> CreateInvoice(string customerId)
        {
            ObjectResult result = null;

            try
            {
                object invoiceId = _service.CreateInvoice(customerId);
                ItemResponse<object> response = new ItemResponse<object>() { Item = invoiceId };

                result = Created201(response);
            }
            catch(Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result;
        }

        [HttpPost("invoice")]
        [Authorize(Roles = "OrgAdmin,Customer")]
        public ActionResult<ItemResponse<int>> AddInvoiceData(string invoiceId)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int iId = _service.AddInvoiceData(invoiceId, userId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = iId };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result;
        }
        [HttpGet("invoices")]
        [Authorize(Roles = "Customer, OrgAdmin, SysAdmin")]
        public ActionResult<ItemResponse<object>> GetInvoices(string customerId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                object invoices = _service.GetInvoice(customerId);

                if(invoices == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found");
                }
                else
                {
                    response = new ItemResponse<object>() { Item = invoices };
                }
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("revenue")]
        [Authorize(Roles = "SysAdmin")]
        public ActionResult<ItemsResponse<SubscriptionRevenue>> GetSubscriptionRevenue()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<List<SubscriptionRevenue>> list = _service.GetTotalRevenue();

                if(list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemsResponse<List<SubscriptionRevenue>> { Items = list };
                }
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);
        }
    }
}

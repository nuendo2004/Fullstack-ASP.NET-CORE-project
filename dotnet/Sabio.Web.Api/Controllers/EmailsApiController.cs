using Microsoft.AspNetCore.Mvc;
using Sabio.Services;
using Sabio.Web.Controllers;
using Microsoft.Extensions.Logging;
using Sabio.Web.Models.Responses;
using System;
using Sabio.Models.Requests;
using Sabio.Models.Enums;
using System.Security.Claims;
using Sabio.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Sabio.Services.Security;
using Sabio.Models.Requests.DemoAccounts;
using sib_api_v3_sdk.Api;
using sib_api_v3_sdk.Client;
using sib_api_v3_sdk.Model;
using Stripe;
using Sabio.Models.Domain.Emails;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Users;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/emails/")]
    [ApiController]
    public class EmailsApiController : BaseApiController
    {
        private IEmailsService _emailService = null;
        private IUserService _userService = null;
        private ITraineeService _traineeService = null;
        private IAuthenticationService<int> _authService = null;
       
        public EmailsApiController(IUserService userService,IEmailsService service, IAuthenticationService<int> authService, 
            ITraineeService traineeService,ILogger<EmailsApiController> logger
           ) : base(logger)
        {
            _emailService = service;
            _userService = userService;
            _authService = authService;
            _traineeService = traineeService;
        }

        [HttpPost("test")]
        public ActionResult<ItemResponse<int>> Create(EmailsAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                string to = model.To;
                _emailService.TestEmail(to);
                ItemResponse<int> response = new ItemResponse<int>();
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

        [HttpPost]
        public ActionResult<SuccessResponse> SendEmail()
        {
            ObjectResult result = null;

            try
            {
                string to = "testUser999@dispostable.com";
                _emailService.TestEmail(to);
                SuccessResponse response = new SuccessResponse();
                result = StatusCode(200, response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }

            return result;
        }

        [HttpPost("demoaccount")]
        public ActionResult<ItemResponse<int>> OnDemoCreate(DemoAccountAddRequest model)
        {

            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                BaseUser user = _userService.GetById(userId);
                _emailService.DemoAccountEmail(model.To);
                
                ItemResponse<int> response = new ItemResponse<int> { Item = userId };
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

        [HttpPost("contact")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<int>> OnContact(ContactUsAddRequest model)
        {

            ObjectResult result = null;

            try
            {
                ItemResponse<int> response = new ItemResponse<int>();
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

        [HttpPost("phishing")]
        [Authorize(Roles = "SysAdmin")]
        public ActionResult<ItemResponse<int>> Add(PhishingAddRequest model)
        {

            ObjectResult result = null;

            try
            {
                int tokenTypeId = (int)TokenType.TrainingEvent;
                string token = Guid.NewGuid().ToString();
                int id = _authService.GetCurrentUserId();
                _userService.AddUserToken(token, id, tokenTypeId);
                ItemResponse<int> response = new ItemResponse<int>();
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

        [HttpPut("confirm")]
        [AllowAnonymous]
        public ActionResult<SuccessResponse> Confirm(string token)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _traineeService.ConfirmTrainee(token);
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

using Amazon.Runtime.Internal.Util;
using MessagePack;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain.DemoAccounts;
using Sabio.Models.Domain.Emails;
using Sabio.Models.Enums;
using Sabio.Models.Requests.DemoAccounts;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Reflection;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/demoaccounts")]
    [ApiController]
    public class DemoAccountApiController : BaseApiController
    {
        private IDemoAccountService _service = null;
        private IAuthenticationService<int> _authService = null;
        private IUserService _userService = null;
        private IEmailsService _emailsService = null;

        public DemoAccountApiController
            (
                IDemoAccountService service,
                IAuthenticationService<int> authService,
                IUserService userService,
                ILogger<DemoAccountApiController> logger,
                IEmailsService emailsService
            ) : base(logger)
        {
            _service = service;
            _authService = authService;
            _userService = userService;
            _emailsService = emailsService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Add(string toEmail)
        {
            int iCode = 201;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.Add(userId);
                
                if (id == 0)
                {
                    iCode = 500;
                    response = new ErrorResponse("Could not create Demo Account");
                }
                else
                {
                    response = new ItemResponse<int> { Item = id };
                    _emailsService.DemoAccountEmail(toEmail);
                }
            }
            catch(Exception ex)
            {
                if (ex.Message.Contains("Cannot insert duplicate key"))
                {
                    iCode = 400;
                    response = new ErrorResponse("Account exists");
                }
                else
                {
                    iCode = 500;
                    response = new ErrorResponse(ex.Message);
                }
            }
            return StatusCode(iCode, response);
        }

        [HttpGet]
        [Authorize(Roles = "SysAdmin")]
        public ActionResult<ItemsResponse<DemoAccount>> GetAll()
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                List<DemoAccount> list = _service.GetAll();
                
                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemsResponse<DemoAccount> { Items = list };
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

        [HttpGet("{id:int}")]
        [Authorize(Roles = "SysAdmin")]
        public ActionResult<ItemResponse<DemoAccount>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                DemoAccount demo = _service.GetById(id);
                if (demo == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found");
                }
                else
                {
                    response = new ItemResponse<DemoAccount> { Item = demo };
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

        [HttpGet("userId/{createdBy:int}")]
        public ActionResult<ItemsResponse<DemoAccount>> GetAccountById(int createdBy)
        {
            int code = 200;
            BaseResponse response = null;
            List<DemoAccount> demoList = null;
            try
            {
                createdBy = _authService.GetCurrentUserId();
                demoList = _service.GetAccountById(createdBy);
                if (demoList == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found");
                }
                else
                {
                    response = new ItemsResponse<DemoAccount> { Items = demoList };
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

        [HttpGet("active")]
        [Authorize(Roles = "SysAdmin")]
        public ActionResult<ItemsResponse<DemoAccountData>> GetActive()
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                List<DemoAccountData> list = _service.GetActiveDemoAccounts();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemsResponse<DemoAccountData> { Items = list };
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

        [HttpGet("summary")]
        [Authorize(Roles = "SysAdmin")]
        public ActionResult<ItemsResponse<DemoAccountSummary>> GetSummaryByMonth()
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                List<DemoAccountSummary> list = _service.GetSummaryByMonth();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemsResponse<DemoAccountSummary> { Items = list };
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

        [HttpPut("{id:int}")]
        [Authorize(Roles = "SysAdmin")]
        public ActionResult<ItemResponse<int>> Update(DemoAccountUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.Update(model, userId);
                response = new SuccessResponse();
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
    }
}

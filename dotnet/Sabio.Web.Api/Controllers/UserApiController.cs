using Google.Apis.AnalyticsReporting.v4.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Actors;
using Sabio.Models.Domain.Users;
using Sabio.Models.Enums;
using Sabio.Models.Requests;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using Stripe;
using System;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserApiController : BaseApiController
    {
        private IUserService _userService = null;
        private IAuthenticationService<int> _authService = null;
        private IEmailsService _emailsService = null;
        private ISiteReferenceService _siteReferenceService = null;
        public UserApiController(ISiteReferenceService siteReferenceService, IEmailsService emailsService, IUserService service, ILogger<UserApiController> logger, IAuthenticationService<int> authenticationService) : base(logger)
        {
            _userService = service;
            _emailsService = emailsService;
            _authService = authenticationService;
            _siteReferenceService = siteReferenceService;
        }
        [HttpGet("")]
        [Authorize(Roles = "SysAdmin")]
        public ActionResult<ItemsResponse<UserV2>> GetAllUsers()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<UserV2> list = _userService.GetAllUsers();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource Not Found");
                }
                else
                {
                    response = new ItemsResponse<UserV2> { Items = list };
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

        [HttpPost]
        [AllowAnonymous]
        public ActionResult<ItemResponse<int>> Create(UserAddRequest model)
        {
            int iCode = 201;
            BaseResponse response = null;

            try
            {
                int statusTypeId = (int)StatusTypes.Active;
                int id = _userService.Create(model, statusTypeId);

                if (id > 0)
                {
                    string email = model.Email;
                    int tokenTypeId = (int)TokenType.NewUser;
                    string token = Guid.NewGuid().ToString();
                    _userService.AddUserToken(token, id, tokenTypeId);
                    //_emailsService.SendConfirmEmail(token, email);
                    int customerRoleId = (int)Roles.Customer;
                    int customerOrgId = 100;//100 is orgId of 'Immersed'
                    _userService.AddUserOrgAndRole(id, customerRoleId, customerOrgId);
                    _siteReferenceService.Insert(model.ReferenceTypeId, id);
                }
                if (id == 0)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application resource not found");
                }
                else
                {
                    response = new ItemResponse<int> { Item = id };
                }
            }
            catch (SqlException sqlEx)
            {
                if (sqlEx.Message.Contains("Cannot insert duplicate key"))
                {
                    iCode = 400;
                    response = new ErrorResponse("Email exists");
                }
                else
                {
                    iCode = 500;
                    response = new ErrorResponse(sqlEx.Message);
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(iCode, response);
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<SuccessResponse>> Login(UserLoginRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            bool isValid = false;

            try
            {
                isValid = await _userService.LogInAsync(model.Email, model.Password);

                if (isValid)
                {
                    response = new SuccessResponse();
                }
                else
                {
                    code = 404;
                    response = new ErrorResponse("Credentials do not match anything in database");
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("current")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<IUserAuthData>> GetCurrent()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                IUserAuthData user = _authService.GetCurrentUser();

                if (user == null)
                {
                    code = 404;
                    response = new ErrorResponse("No current user found");
                }
                else
                {
                    response = new ItemResponse<IUserAuthData> { Item = user };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("logout")]
        public async Task<ActionResult<SuccessResponse>> LogoutAsync()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                await _authService.LogOutAsync();
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<BaseUser>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                BaseUser user = _userService.GetById(id);

                if (user == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found");
                }
                else
                {
                    response = new ItemResponse<BaseUser> { Item = user };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("email")]
        public ActionResult<ItemResponse<BaseUser>> GetIdByEmail(string address)
        {
            int code = 200;
            int id = 0;
            BaseResponse response = null;

            try
            {
                id = _userService.GetIdByEmail(address);
                BaseUser user = _userService.GetById(id);

                if (user == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found");
                }
                else
                {
                    response = new ItemResponse<BaseUser> { Item = user };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }
        [HttpGet("recent")]
        public ActionResult<ItemResponse<List<BaseUser>>> GetMostRecentTrainees()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<BaseUser> list = _userService.GetMostRecentTrainees();

                if(list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource not found");
                }
                else
                {
                    response = new ItemResponse<List<BaseUser>> { Item = list };
                }
            }
            catch(Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpPut("confirm")]
        [AllowAnonymous]
        public ActionResult<SuccessResponse> Confirm(string token, string email)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _userService.ConfirmUser(token, email);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPut("forgot")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<int>> ForgotPassword(EmailForgotRequest email)
        {
            int code = 200;
            int id = 0;
            int tokenTypeId = (int)TokenType.ResetPassword;
            BaseResponse response = null;
            string token = null;

            try
            {
                id = _userService.GetIdByEmail(email.Email);
                token = Guid.NewGuid().ToString();
                response = new ItemResponse<int> { Item = id };
                _userService.AddUserToken(token, id, tokenTypeId);
                //_emailsService.ForgotPasswordEmail(email.Email, token);                
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPut("changepassword")]
        [AllowAnonymous]
        public ActionResult<SuccessResponse> ChangePassword(ChangePasswordRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            int tokenTypeId = (int) TokenType.ResetPassword;
            int userIdFromToken = _userService.GetUserFromToken(tokenTypeId, model.Token);
            int userIdFromEmail = _userService.GetIdByEmail(model.Email);
            bool areIdsMatching = false;
            if(userIdFromToken == userIdFromEmail)
            {
                areIdsMatching = true;
            }

            if (areIdsMatching)
            {
                try
                {
                    string salt = BCrypt.BCryptHelper.GenerateSalt();
                    string hashedPassword = BCrypt.BCryptHelper.HashPassword(model.Password, salt);
                    response = new SuccessResponse();
                    _userService.UpdateUserPassword(hashedPassword, userIdFromToken);
                    _userService.DeleteUserToken(model.Token);

                }

                catch(Exception ex)
                {
                    code = 500;
                    response = new ErrorResponse(ex.Message);
                }
            }
            else
            {
                code = 403;
                response = new ErrorResponse("Unauthorized to change password");
            }

            return StatusCode(code, response);
        }

        [HttpGet("userFromToken")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<int>> GetUserFromToken(int tokenTypeId, string token)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int id = _userService.GetUserFromToken(tokenTypeId, token);

                if (id == 0)
                {
                    code = 404;
                    response = new ErrorResponse("UserId not found");
                }
                else
                {
                    response = new ItemResponse<int> { Item = id };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPost("changeorg")]
        public async Task<ActionResult<SuccessResponse>> ChangeOrg(int orgId)
        {
            int code = 200;
            BaseResponse response = null;
            bool isSuccessful = false;

            try
            {
                IUserAuthData currentUser = _authService.GetCurrentUser();
                isSuccessful = await _userService.ChangeCurrentOrg(currentUser, orgId);
                if (isSuccessful)
                {
                    response = new SuccessResponse();
                }
                else
                {
                    code = 404;
                    response = new ErrorResponse("Organization could not be changed");
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

        [HttpPost("changetrainee")]
        public async Task<ActionResult<SuccessResponse>> ChangeTrainee(int traineeId)
        {
            int code = 200;
            BaseResponse response = null;
            bool isSuccessful = false;

            try
            {
                IUserAuthData currentUser = _authService.GetCurrentUser();
                isSuccessful = await _userService.ChangeCurrentTrainee(currentUser, traineeId);
                if (isSuccessful)
                {
                    response = new SuccessResponse();
                }
                else
                {
                    code = 404;
                    response = new ErrorResponse("Trainee could not be changed");
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

        [HttpGet("status/totals")]
        [Authorize(Roles = "SysAdmin")]
        public ActionResult<ItemResponse<UserStatusReqId>> GetAllUserStatus()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int id = _authService.GetCurrentUserId();
                UserStatusReqId user = _userService.GetUserStatusTotals(id);

                if (user == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemResponse<UserStatusReqId> { Item = user };
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

        [HttpGet("status/overTime")]
        [Authorize(Roles = "SysAdmin")]
        public ActionResult<ItemsResponse<UserStatus>> GetStatusOverTime()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<UserStatus> list = _userService.GetUserStatusOverTime();

                if(list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found");
                }
                else
                {
                    response = new ItemsResponse<UserStatus> { Items = list };
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

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.TraineeAccounts;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.TraineeAccounts;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/traineeaccounts")]
    [ApiController]
    public class TraineeAccountsApiController : BaseApiController
    {
        private ITraineeAccountsService _traineeAccountsService = null;
        private IAuthenticationService<int> _authenticationService = null;

        public TraineeAccountsApiController(ITraineeAccountsService service
            , ILogger<TraineeAccountsApiController> logger
            , IAuthenticationService<int> authenticationService) : base(logger)
        {
            _traineeAccountsService = service;
            _authenticationService = authenticationService;
        }
        [HttpPost("login")]
        public ActionResult<SuccessResponse> Login(TraineeAccountLoginRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            bool isValid = false;
            try
            {
                isValid = _traineeAccountsService.TraineeAccountLogIn(model.Username, model.Password, model.ZoneId);
                if (isValid)
                {
                    response = new SuccessResponse();
                }
                else
                {
                    code = 404;
                    response = new ErrorResponse("Credentials Do Not Match");
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

        [HttpGet]
        [Authorize(Roles = "OrgTrainer, OrgAdmin, SysAdmin")]
        public ActionResult<ItemsResponse<TraineeAccounts>> GetAll()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<TraineeAccounts> list = _traineeAccountsService.GetAll();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemsResponse<TraineeAccounts> { Items = list };
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

        [HttpGet("dropdowns")]
        [Authorize(Roles = "Trainee, OrgTrainer, OrgAdmin, SysAdmin")]
        public ActionResult<ItemsResponse<TraineeAccounts>> GetDropdowns()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<TraineeAccounts> list = _traineeAccountsService.GetDropdowns();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemsResponse<TraineeAccounts> { Items = list };
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
        [Authorize(Roles = "Trainee,OrgTrainer, OrgAdmin, SysAdmin")]
        public ActionResult<ItemResponse<TraineeAccounts>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;
            TraineeAccounts traineeAccounts = null;

            try
            {
                traineeAccounts = _traineeAccountsService.GetById(id);

                if (traineeAccounts == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<TraineeAccounts> { Item = traineeAccounts };
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

        [HttpGet("traineeid")]
        [Authorize(Roles = "Trainee, OrgTrainer, OrgAdmin, SysAdmin")]
        public ActionResult<ItemResponse<Paged<TraineeAccounts>>> GetByTraineeId(int pageIndex, int pageSize, int traineeId)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Paged<TraineeAccounts> paged = _traineeAccountsService.GetByTraineeId(pageIndex, pageSize, traineeId);

                if (paged == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<TraineeAccounts>> { Item = paged };
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

        [HttpGet("traineeid/{traineeId:int}/zoneId/{zoneId:int}")]
        [Authorize(Roles = "Trainee, OrgTrainer, OrgAdmin, SysAdmin")]
        public ActionResult<ItemsResponse<TraineeAccounts>> GetByTraineeIdandZoneId(int traineeId, int zoneId)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                List<TraineeAccounts> list = _traineeAccountsService.GetByTraineeIdandZoneId(traineeId, zoneId);

                if (list == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemsResponse<TraineeAccounts> { Items = list };
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

        [HttpGet("zoneid")]
        [Authorize(Roles = "Trainee, OrgTrainer, OrgAdmin, SysAdmin")]
        public ActionResult<ItemResponse<Paged<TraineeAccounts>>> GetByZoneIdPaged(int pageIndex, int pageSize, int zoneId)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Paged<TraineeAccounts> paged = _traineeAccountsService.GetByZoneIdPaged(pageIndex, pageSize, zoneId);

                if (paged == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<TraineeAccounts>> { Item = paged };
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

        [HttpGet("zoneid/{zoneId:int}")]
        [Authorize(Roles = "Trainee, OrgTrainer, OrgAdmin, SysAdmin")]
        public ActionResult<ItemsResponse<TraineeAccounts>> GetByZoneId(int zoneId)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                List<TraineeAccounts> list = _traineeAccountsService.GetByZoneId(zoneId);

                if (list == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemsResponse<TraineeAccounts> { Items = list };
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

        [HttpGet("search")]
        [Authorize(Roles = "Trainee,OrgTrainer, OrgAdmin, SysAdmin")]
        public ActionResult<ItemResponse<Paged<TraineeAccounts>>> PaginatedSearch(int pageIndex, int pageSize, string query)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Paged<TraineeAccounts> paged = _traineeAccountsService.PaginatedSearch(pageIndex, pageSize, query);

                if (paged == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<TraineeAccounts>> { Item = paged };
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

        [HttpPost]
        [Authorize(Roles = "Trainee, OrgTrainer, OrgAdmin, SysAdmin")]
        public ActionResult<ItemResponse<int>> Create(TraineeAccountsAddRequest model)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authenticationService.GetCurrentUserId();
                int id = _traineeAccountsService.Create(model, userId);
                response = new ItemResponse<int>() { Item = id };
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(iCode, response);
        }

        [HttpPut("username")]
        [Authorize(Roles = "Trainee,OrgTrainer, OrgAdmin, SysAdmin")]
        public ActionResult<SuccessResponse> UpdateUsername(TraineeAccountsUsernameUpdateRequest model)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authenticationService.GetCurrentUserId();
                _traineeAccountsService.UpdateUsername(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(iCode, response);
        }

        [HttpPut("status")]
        [Authorize(Roles = "Trainee,OrgTrainer, OrgAdmin, SysAdmin")]
        public ActionResult<SuccessResponse> UpdateStatus(TraineeAccountsStatusUpdateRequest model)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authenticationService.GetCurrentUserId();
                _traineeAccountsService.UpdateStatus(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(iCode, response);
        }

        [HttpPut("avatar")]
        [Authorize(Roles = "Trainee,OrgTrainer, OrgAdmin, SysAdmin")]
        public ActionResult<SuccessResponse> UpdateAvatar(TraineeAccountsAvatarUpdate model)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authenticationService.GetCurrentUserId();
                _traineeAccountsService.UpdateAvatar(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(iCode, response);
        }

        [HttpPut("recover")]
        [Authorize(Roles = "Trainee, OrgTrainer, OrgAdmin, SysAdmin")]
        public ActionResult<SuccessResponse> UpdatePassword(TraineeAccountsPasswordUpdate model)
        {
            int iCode = 200;
            BaseResponse response = null;
            bool passwordMatch = false;

            try
            {
                passwordMatch = _traineeAccountsService.PasswordMatch(model.TraineeAccountId, model.CurrentPassword);
                if (!passwordMatch)
                {
                    iCode = 403;
                    response = new ErrorResponse("Credentials do not match");
                }
                else
                {
                    int userId = _authenticationService.GetCurrentUserId();
                    _traineeAccountsService.UpdatePassword(model, userId);
                    response = new SuccessResponse();
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse($"Generic Error: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(iCode, response);
        }

        [HttpGet("{zoneId:int}/username")]
        [Authorize(Roles = "Trainee, OrgTrainer, OrgAdmin, SysAdmin")]
        public ActionResult<ItemResponse<BaseTraineeAccount>> GetUserWithTraineeAccount(int zoneId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authenticationService.GetCurrentUserId();
                BaseTraineeAccount data = _traineeAccountsService.GetTraineeAccountByUserIdAndZoneId(userId, zoneId);

                if (data == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found");
                }
                else
                {
                    response = new ItemResponse<BaseTraineeAccount> { Item = data };
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

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.TraineeAccounts;
using Sabio.Models.Requests;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/rescue")]
    [ApiController]
    public class RescueApiController : BaseApiController
    {
        private IRescueService _service = null;
        private IAuthenticationService<int> _authService = null;
        public RescueApiController(
            IRescueService service,
            ILogger<RescueApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }
        [HttpPost]
        [Authorize(Roles = "Trainee, OrgAdmin, OrgTrainer, SysAdmin")]
        public ActionResult<ItemResponse<int>> Create(RescueAddRequest model)
        {
            ObjectResult result = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.Create(model, userId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };
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
        [HttpGet("{id:int}")]
        [Authorize(Roles = "Trainee, OrgAdmin, OrgTrainer, SysAdmin")]
        public ActionResult<ItemResponse<Rescue>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Rescue rescue = _service.Get(id);
                if (rescue == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resourse not found.");
                }
                else
                {
                    response = new ItemResponse<Rescue>() { Item = rescue };
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
        [HttpGet("trainee/{traineeId:int}")]
        [Authorize(Roles = "Trainee, OrgAdmin, OrgTrainer, SysAdmin")]
        public ActionResult<ItemResponse<Paged<Rescue>>> GetByTraineeId(int pageIndex, int pageSize, int traineeId)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<Rescue> page = _service.GetByTraineeId(pageIndex, pageSize, traineeId);
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resourse not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Rescue>>() { Item = page };
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
        [HttpGet("zone/{zoneId:int}")]
        [Authorize(Roles = "Trainee, OrgAdmin, OrgTrainer, SysAdmin")]
        public ActionResult<ItemResponse<Paged<Rescue>>> GetByZoneId(int pageIndex, int pageSize, int zoneId)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<Rescue> page = _service.GetByZoneId(pageIndex, pageSize, zoneId);
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resourse not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Rescue>>() { Item = page };
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
        [HttpGet("traineeaccount/{traineeAccountId:int}")]
        [Authorize(Roles = "Trainee, OrgAdmin, OrgTrainer, SysAdmin")]
        public ActionResult<ItemResponse<Paged<Rescue>>> GetByTraineeAccountId(int pageIndex, int pageSize, int traineeAccountId)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<Rescue> page = _service.GetByTraineeAccountId(pageIndex, pageSize, traineeAccountId);
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resourse not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Rescue>>() { Item = page };
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
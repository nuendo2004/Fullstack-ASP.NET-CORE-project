using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sabio.Services.Interfaces;
using Sabio.Services;
using Sabio.Web.Controllers;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using Sabio.Web.Models.Responses;
using Sabio.Models.Requests;
using System;
using Sabio.Models.Domain;
using System.Collections.Generic;
using Sabio.Models.Domain.Trainees;
using Sabio.Models;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/taskevents")]
    [ApiController]
    public class TaskEventApiController : BaseApiController
    {
        private ITaskEventsService _service = null;
        private IAuthenticationService<int> _authService = null;

        public TaskEventApiController(ITaskEventsService service
            , ILogger<TaskEventApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet("paginate")]
        [Authorize(Roles = "OrgAdmin,SysAdmin")]
        public ActionResult<ItemResponse<Paged<TaskEvent>>> GetTaskEventByPage(int pageIndex, int pageSize)

        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<TaskEvent> paged = _service.PaginatedSearch(pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<TaskEvent>> { Item = paged };
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
        [Authorize(Roles = "OrgAdmin,SysAdmin")]
        public ActionResult<ItemResponse<int>> Create(TaskEventAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.Insert(model, userId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
                base.Logger.LogError(ex.ToString());
            }

            return result;
        }

        [HttpGet]
        [Authorize(Roles = "OrgAdmin,SysAdmin")]
        public ActionResult<ItemsResponse<TaskEvent>> GetAll()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<TaskEvent> list = _service.SelectAll();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Resource not found.");
                }
                else
                {
                    response = new ItemsResponse<TaskEvent> { Items = list };
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
        
        [HttpGet("record/{entityId:int}")]
        [Authorize(Roles = "OrgAdmin,SysAdmin,Trainee")]
        public ActionResult<ItemsResponse<WinLossRecord>> GetWinLossRecord(int entityId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<WinLossRecord> list = _service.SelectWinLossByEntityId(entityId);

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Resource not found.");
                }
                else
                {
                    response = new ItemsResponse<WinLossRecord> { Items = list };
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
        [Authorize(Roles = "OrgAdmin,SysAdmin")]
        public ActionResult<SuccessResponse> Update(TaskEventUpdateRequest model)
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
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(code, response);
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "OrgAdmin,SysAdmin")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Delete(id);
                response = new SuccessResponse();
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


 

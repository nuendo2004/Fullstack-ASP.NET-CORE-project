using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Zones;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/zones")]
    [ApiController]
    public class ZoneApiController : BaseApiController
    {
        private ILogger _logger;
        private IAuthenticationService<int> _authService = null;
        private IZonesService _service = null;
        public ZoneApiController(IZonesService service, ILogger<ZoneApiController> logger, IAuthenticationService<int> authService) : base(logger)
        {
            _logger = logger;
            _service = service;
            _authService = authService;
        }

        [HttpGet]
        public ActionResult<ItemsResponse<Zone>> GetAll()
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                List<Zone> list = _service.GetAllZones();
                
                if(list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource Not Found");
                }
                else
                {
                    response = new ItemsResponse<Zone> { Items = list };
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
        public ActionResult<ItemResponse<int>> Add(ZoneAddRequest model)
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
                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result;
        }

        [HttpPut("{id:int}")]
        public ActionResult<ItemResponse<int>> Update(ZoneUpdateRequest model)
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
            }
            return StatusCode(code, response);
        }

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Zone>>> PaginationV3(int pageIndex, int pageSize)
        {
            ActionResult result;
            try
            {
                Paged<Zone> paged = _service.SelectAllPaginated(pageIndex, pageSize);
                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));
                }
                else
                {
                    ItemResponse<Paged<Zone>> response = new ItemResponse<Paged<Zone>>();
                    response.Item = paged;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }
            return result;
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Zone>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {

                Zone zone = _service.GetById(id);

                if (zone == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found");
                }
                else
                {
                    response = new ItemResponse<Zone> { Item = zone };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic: ${ex.Message}");
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(iCode, response);

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
            }
            return StatusCode(code, response);
        }

        [HttpPut("{id:int}/status/{statusId:int}")]
        public ActionResult<ItemResponse<int>> UpdateStatusId(int id, int statusId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdateStatusId(id, statusId, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("status/{statusId:int}/paged")]
        public ActionResult<ItemResponse<Paged<Zone>>> GetByZoneStatusIdPaged(int statusId, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<Zone> list = _service.GetByZoneStatusIdPaged(statusId, pageIndex, pageSize);

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found");
                }
                else
                {
                    response = new ItemResponse<Paged<Zone>> { Item = list };
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
        [HttpGet("status/{statusId:int}")]
        public ActionResult<ItemsResponse<Zone>> GetByZoneStatusId(int statusId)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                List<Zone> list = _service.GetByZoneStatusId(statusId);

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found");
                }
                else
                {
                    response = new ItemsResponse<Zone> { Items = list };
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

        [HttpGet("type/{id:int}")]
        public ActionResult<ItemResponse<Zone>> GetByZoneTypeId(int id, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<Zone> list = _service.GetByZoneTypeId(id, pageIndex, pageSize);

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found");
                }
                else
                {
                    response = new ItemResponse<Paged<Zone>> { Item = list };
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

        [HttpGet("status/{statusid:int}/type/{typeid:int}")]
        public ActionResult<ItemResponse<Zone>> GetByZoneStatusIdAndByZoneTypeId(int statusid, int typeid, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<Zone> list = _service.GetByZoneStatusIdAndByZoneTypeId(statusid, typeid, pageIndex, pageSize);

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found");
                }
                else
                {
                    response = new ItemResponse<Paged<Zone>> { Item = list };
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
        public ActionResult<ItemResponse<Paged<Zone>>> SearchV3(int pageIndex, int pageSize, string query)
        {
            int code = 200;
            BaseResponse response = null;
            Paged<Zone> pagedList = null;
            try
            {
                pagedList = _service.Search(pageIndex, pageSize, query);
                if (pagedList == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found");
                }
                else
                {
                    response = new ItemResponse<Paged<Zone>>() { Item = pagedList };
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
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.ZoneTracker;
using Sabio.Models.Domain.ZoneTrackers;
using Sabio.Models.Requests;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Drawing.Printing;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/zonetracker")]
    [ApiController]
    public class ZoneTrackerController : BaseApiController
    {
        private IAuthenticationService _auth;
        private IZoneTrackerService _service;
        public ZoneTrackerController(ILogger<ZoneTrackerController> logger, IZoneTrackerService service, IAuthenticationService auth)
            : base(logger)
        {
            _auth = auth;
            _service = service;
        }

        [HttpGet("all")]
        public ActionResult<Paged<ZoneTracker>> GetAll_Paginated(int pageIndex, int pageSize)
        {
            int code = 200;
            Paged<ZoneTracker> records = null;
            BaseResponse res;
            try
            {
                records = _service.GetAll(pageIndex, pageSize);
                if (records.PagedItems.Count == 0)
                {
                    code = 404;
                    res = new ErrorResponse("No zone tracking record found");
                }
                else
                    res = new ItemResponse<Paged<ZoneTracker>> { Item = records };
            }
            catch (Exception ex)
            {
                code = 500;
                res = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, res);
        }

        [HttpGet("trainingunit")]
        public ActionResult<Paged<ZoneTracker>> GetByTrainingUnit_Paginated(int pageIndex, int pageSize, int trainingUnitId, bool hasRecordOnly=false)
        {
            int code = 200;
            Paged<ZoneTracker> records = null;
            BaseResponse res;
            try
            {
                records = _service.GetByTrainingUnitId(pageIndex, pageSize, trainingUnitId, hasRecordOnly);
                if (records.PagedItems.Count == 0)
                {
                    code = 404;
                    res = new ErrorResponse("No zone tracking record found");
                }
                else
                    res = new ItemResponse<Paged<ZoneTracker>> { Item = records };
            }
            catch (Exception ex)
            {
                code = 500;
                res = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, res);
        }
        
        [HttpGet]
        public ActionResult<Paged<ZoneTracker>> GetByOrganization_Paginated(int pageIndex, int pageSize, int orgId, bool hasRecordOnly=false)
        {
            int code = 200;
            Paged<ZoneTracker> records = null;
            BaseResponse res;
            try
            {
                records = _service.GetByOrganizationId(pageIndex, pageSize, orgId, hasRecordOnly);
                if (records.PagedItems.Count == 0)
                {
                    code = 404;
                    res = new ErrorResponse("No zone tracking record found");
                }
                else
                    res = new ItemResponse<Paged<ZoneTracker>> { Item = records };
            }
            catch (Exception ex)
            {
                code = 500;
                res = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, res);
        }

        [HttpGet("{traineeId:int}")]
        public ActionResult<Paged<ZoneRecord>> GetByTraineeId_Paginated(int pageIndex, int pageSize, int traineeId)
        {
            int code = 200;
            Paged<ZoneRecord> records = null;
            BaseResponse res;
            try
            {
                records = _service.GetByTraineeId(pageIndex, pageSize, traineeId);
                if (records.PagedItems.Count == 0)
                {
                    code = 404;
                    res = new ErrorResponse("No zone tracking record found");
                }
                else
                    res = new ItemResponse<Paged<ZoneRecord>> { Item = records };
            }
            catch (Exception ex)
            {
                code = 500;
                res = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, res);
        }

        [HttpGet("{traineeId:int}/pagination")]
        public ActionResult<Paged<ZoneRecord>> GetByTraineeId_SearchPaginated(int pageIndex, int pageSize, int traineeId, string dateStart, string dateEnd, int zoneId)
        {
            int code = 200;
            Paged<ZoneRecord> records = null;
            BaseResponse res;
            try
            {
                records = _service.GetByTraineeIdSearch(pageIndex, pageSize, traineeId, dateStart, dateEnd, zoneId);
                if (records.PagedItems.Count == 0)
                {
                    code = 404;
                    res = new ErrorResponse("No zone tracking record found");
                }
                else
                    res = new ItemResponse<Paged<ZoneRecord>> { Item = records };
            }
            catch (Exception ex)
            {
                code = 500;
                res = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, res);
        }

        [HttpGet("{traineeId:int}/{zoneId:int}")]
        public ActionResult<Paged<ZoneTrackerBase>> GetByFilteredZone_Paginated(int pageIndex, int pageSize, int traineeId, int zoneId)
        {
            int code = 200;
            Paged<ZoneRecord> records = null;
            BaseResponse res;
            try
            {
                records = _service.GetByFilteredZoneId(pageIndex, pageSize, zoneId, traineeId);
                if (records.PagedItems.Count == 0)
                {
                    code = 404;
                    res = new ErrorResponse("No zone tracking record found");
                }
                else
                    res = new ItemResponse<Paged<ZoneRecord>> { Item = records };
            }
            catch (Exception ex)
            {
                code = 500;
                res = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, res);
        }

        [HttpGet("chart")]
        public ActionResult<List<ZoneAccessLogChart>> GetbyId(int traineeId) 
        {
            int code = 200;
            BaseResponse res;
            List<ZoneAccessLogChart> records;
            try
            {
                records = _service.GetChartByTraineeId(traineeId);
                if (records.Count == 0)
                {
                    code = 404;
                    res = new ErrorResponse("No zone tracking record found");
                }
                else
                    res = new ItemsResponse<ZoneAccessLogChart> { Items = records };
            }
            catch (Exception ex)
            {
                code = 500;
                res = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, res);
        }
    }
}

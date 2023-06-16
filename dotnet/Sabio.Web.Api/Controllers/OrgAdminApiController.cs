using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain;
using Sabio.Models.Enums;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/orgAdmin")]
    [ApiController]
    public class OrgAdminApiController : BaseApiController
    {
        private IOrgAdminService _service = null;

        public OrgAdminApiController(IOrgAdminService service, ILogger<OrgAdminApiController> logger) : base(logger)
        {
            _service = service;
        }

        [HttpGet("orgAdminData")]
        [Authorize(Roles = "SysAdmin, OrgAdmin")]
        public ActionResult<ItemResponse<OrgAdminData>> GetOrgAdminDataFromOrgId(int orgId, int numberSelection)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                OrgAdminData orgAdminData = _service.GetAdminDataFromOrgId(orgId, numberSelection);

                if (orgAdminData == null)
                {
                    code = 404;
                    response = new ErrorResponse("No data found");
                }
                else
                {
                    response = new ItemResponse<OrgAdminData> { Item = orgAdminData };
                }
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

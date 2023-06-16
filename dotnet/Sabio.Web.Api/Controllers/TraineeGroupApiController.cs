using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Services.Interfaces;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using Sabio.Models.Requests;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/traineegroups")]
    [ApiController]
    public class TraineeGroupApiController : BaseApiController
    {
        private ITraineeGroupService _traineeGroupService = null;
        private IAuthenticationService<int> _authenticationService = null;

        public TraineeGroupApiController(ITraineeGroupService service
            , ILogger<TraineeGroupApiController> logger
            , IAuthenticationService<int> authenticationService) : base(logger)
        {
            _traineeGroupService = service;
            _authenticationService = authenticationService;
        }

        [HttpPost]
        public ActionResult<SuccessResponse> Create(TraineeGroupAddRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _traineeGroupService.AddTraineeGroup(model);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }


        [HttpDelete("{traineeId:int}/{groupId:int}")]
        public ActionResult<SuccessResponse> Delete(int traineeId, int groupId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _traineeGroupService.DeleteTraineeGroup(traineeId, groupId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }
    }
}

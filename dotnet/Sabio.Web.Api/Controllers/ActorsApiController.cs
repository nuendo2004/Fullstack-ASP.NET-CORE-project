using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Actors;
using Sabio.Models.Requests.Actors;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/actors")]
    [ApiController]
    public class ActorsApiController : BaseApiController
    {
        private IActorService _actorService = null;
        private IAuthenticationService<int> _authService = null;
        private ILookUpService _lookUpService = null; 

        public ActorsApiController(ILookUpService lookUp, IActorService actorService, ILogger<ActorsApiController> logger, IAuthenticationService<int> authService) : base(logger)
        {
            _actorService = actorService;
            _authService = authService;
            _lookUpService = lookUp;
        }

        [HttpPost]        
        public ActionResult<ItemResponse<int>> Create(ActorsAddRequest request)
        {
            int code = 500;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _actorService.AddActor(request, userId);
                code = 201;
                response = new ItemResponse<int>() { Item = id };
            }
            catch (Exception ex)
            {
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            
            }
            return StatusCode(code, response);
        }

        [HttpPut("{id:int}")]       
        public ActionResult<SuccessResponse> Update(ActorUpdateRequest update)
        {
            int code = 200;
            BaseResponse response = null; 
            try
            {
                int userId = _authService.GetCurrentUserId();
                _actorService.UpdateActor(update, userId);
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

        [HttpGet]        
        public ActionResult<ItemsResponse<Actor>> Get()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<Actor> list = _actorService.GetAllActors();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application Resource Not Found");
                }
                else
                {
                    response = new ItemsResponse<Actor> { Items = list };
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
        public ActionResult<ItemResponse<Actor>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Actor actor = _actorService.GetActorById(id);

                if (actor == null)
                {
                    code = 404;
                    response = new ErrorResponse("Actor Not Found");
                }
                else
                {
                    response = new ItemResponse<Actor> { Item = actor };
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

        [HttpGet("paginate")]       
        public ActionResult<ItemResponse<Paged<Actor>>> GetPaginated(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Actor> page = _actorService.GetAllActorsPaginate(pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Actor>> { Item = page };
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
        public ActionResult<ItemResponse<Paged<Actor>>> GetByCreator(int pageIndex, int pageSize, string creator)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Actor> page = _actorService.GetByCreator(pageIndex, pageSize, creator);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Actor>> { Item = page };
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

        [HttpDelete("{id:int}")]        
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                _actorService.DeleteActor(id, userId);
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

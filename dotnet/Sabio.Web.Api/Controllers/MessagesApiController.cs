using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Build.Utilities;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Messages;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.Messages;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Api.Hubs;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/messages")]
    [ApiController]
    public class MessagesApiController : BaseApiController
    {
        private IChatHubService _chatHubService = null;
        private IMessagesService _messagesService = null;
        private IAuthenticationService<int> _authService = null;
        private IHubContext<ChatHub, IChatHub> _chatHub = null;
        public MessagesApiController(
            IChatHubService chatHubService,
            IMessagesService messagesService,
            IHubContext<ChatHub, IChatHub> chatHub,
            ILogger<PingApiController> logger,
            IAuthenticationService<int> authService) : base(logger)
        {
            _chatHubService = chatHubService;
            _messagesService = messagesService;
            _authService = authService;
            _chatHub = chatHub;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(MessageAddRequest model)
        {
            int code = 500;
            BaseResponse response = null;
            Message message = null;

            try
            {
                int id = _messagesService.CreateMessage(model);
                string chatName = model.Subject;

                code = 201;
                response = new ItemResponse<int>()
                {
                    Item = id
                };

                if (chatName != null)
                {
                    message = _messagesService.GetById(id);
                    _chatHub.Clients.Group(chatName).ReceiveMessage(message);
                }
            }
            catch (Exception ex)
            {
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(MessageUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _messagesService.Update(model);
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

        [HttpPut("delete/{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _messagesService.Delete(id);
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

        [HttpGet("bysender")]
        public ActionResult<ItemResponse<List<Message>>> GetBySenderId(int senderEntityTypeId, int senderId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<Message> messages = _messagesService.GetBySenderId(senderEntityTypeId, senderId);
                response = new ItemResponse<List<Message>>()
                {
                    Item = messages
                };
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("byrecipient")]
        public ActionResult<ItemResponse<List<Message>>> GetByRecipientId(int recipientEntityTypeId, int recipientId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<Message> messages = _messagesService.GetByRecipientId(recipientEntityTypeId, recipientId);
                response = new ItemResponse<List<Message>>()
                {
                    Item = messages
                };
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("zonegroup/{zoneGroupId:int}")]
        public ActionResult<ItemResponse<List<Message>>> GetByZoneGroupId(int zoneGroupId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<GroupMessage> messages = _messagesService.GetByZoneGroupId(zoneGroupId);
                if (messages != null)
                {
                response = new ItemResponse<List<GroupMessage>>()
                {
                    Item = messages
                };
                } else
                {
                    code = 404;
                    response = new ErrorResponse("Error: not found");
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

        [HttpGet("conversation")]
        public ActionResult<ItemResponse<List<Message>>> GetConversation(string chatName)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<Message> messages = _messagesService.GetConversation(chatName);
                response = new ItemResponse<List<Message>>()
                {
                    Item = messages
                };
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

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using Sabio.Models.Domain.Messages;
using Sabio.Services;
using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;

namespace Sabio.Web.Api.Hubs
{

    public interface IChatHub
    {
        Task ReceiveMessage(Message message);
        Task OnConnectedAsync();
        Task OnDisconnectedAsync(Exception ex);
        Task AddToGroup(string groupName);
    }
    public class ChatHub:Hub<IChatHub>
    {
        private readonly IAuthenticationService<int> _authService;
        private readonly IChatHubService _chatHubService;

        public ChatHub(IAuthenticationService<int> authService,
            IChatHubService chatHubService)
        {
            _authService = authService;
            _chatHubService = chatHubService;
        }
        public override async Task OnConnectedAsync()
        {
            await _chatHubService.UserConnected(_authService.GetCurrentUserId(), Context.ConnectionId);
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception ex)
        {
            await _chatHubService.DisconnectUser(_authService.GetCurrentUserId());
            await base.OnDisconnectedAsync(ex);
        }
        public async Task AddToGroup(string chatName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, chatName);
        }
    }
}

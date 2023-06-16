using Microsoft.Build.Utilities;
using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;
using Task = System.Threading.Tasks.Task;

namespace Sabio.Web.Api.Hubs
{
    public class ChatHubService : IChatHubService
    {
        public readonly ConcurrentDictionary<int, string> _connectUsers = new ConcurrentDictionary<int, string>();

        public Task<string> UserConnected(int userId, string connectionId)
        {
            _connectUsers.AddOrUpdate(userId, connectionId, (userId, connectionId) =>
            {
                return connectionId;
            });
            return Task.FromResult(connectionId);
        }
        public Task<bool> isUserConnected(int userId)
        {
            bool isConnected = _connectUsers.ContainsKey(userId);
            return Task.FromResult(isConnected);
        }
        public Task<string> GetConnectionId(int userId)
        {
            _connectUsers.TryGetValue(userId, out string value);
            return Task.FromResult(value);
        }
        public Task<string> DisconnectUser(int userId)
        {
            _connectUsers.TryRemove(userId, out string value);
            return Task.FromResult(value);
        }
    }
}

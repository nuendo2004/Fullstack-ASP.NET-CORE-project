using System.Threading.Tasks;

namespace Sabio.Web.Api.Hubs
{
    public interface IChatHubService
    {
        Task<string> UserConnected(int userId, string connectionId);
        Task<bool> isUserConnected(int userId);
        Task<string> GetConnectionId(int userId);
        Task<string> DisconnectUser(int userId);
    }
}
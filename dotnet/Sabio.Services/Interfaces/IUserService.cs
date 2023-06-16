using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public interface IUserService
    {
        public List<UserV2> GetAllUsers();
        Task<bool> LogInAsync(string email, string password);

        Task<bool> LogInTest(string email, string password, int id, string[] roles = null);
        
        int Create(UserAddRequest model, int statusTypeId);

        int CreateInvitedMember(UserAddRequest model, int statusTypeId);

        IUserAuthData GetCurrent(string email, string password);

        public BaseUser GetById(int id);

        List<BaseUser> GetMostRecentTrainees();

        int GetIdByEmail(string email);

        void AddUserToken(string token, int userId, int tokenTypeId);

        void DeleteUserToken(string token);

        void UpdateUserPassword(string password, int userId);

        void AddUserOrgAndRole(int userId, int roleId, int orgId);

        void ConfirmUser(string token, string email);

        int GetUserFromToken(int tokenTypeId, string token);
        UserStatusReqId GetUserStatusTotals(int id);
        Task<bool> ChangeCurrentOrg(IUserAuthData currentUser, int orgId);
        Task<bool> ChangeCurrentTrainee(IUserAuthData currentUser, int traineeId);
        List<UserStatus> GetUserStatusOverTime();
    }
}
using Sabio.Models;
using Sabio.Models.Domain.TraineeAccounts;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.TraineeAccounts;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface ITraineeAccountsService
    {
        List<TraineeAccounts> GetAll();
        List<TraineeAccounts> GetDropdowns();
        TraineeAccounts GetById(int id);
        Paged<TraineeAccounts> GetByTraineeId(int pageIndex, int pageSize, int traineeId);
        List<TraineeAccounts> GetByTraineeIdandZoneId(int traineeId, int zoneId);
        Paged<TraineeAccounts> GetByZoneIdPaged(int pageIndex, int pageSize, int zoneId);
        List<TraineeAccounts> GetByZoneId(int zoneId);
        Paged<TraineeAccounts> PaginatedSearch(int pageIndex, int pageSize, string query);
        int Create(TraineeAccountsAddRequest model, int userId);
        void UpdateUsername(TraineeAccountsUsernameUpdateRequest model, int id);
        void UpdateStatus(TraineeAccountsStatusUpdateRequest model, int id);
        void UpdateAvatar(TraineeAccountsAvatarUpdate model, int id);
        void UpdatePassword(TraineeAccountsPasswordUpdate model, int userId);
        bool PasswordMatch(int id, string currentPassword);
        bool TraineeAccountLogIn(string username, string password,int zoneId);
        BaseTraineeAccount GetTraineeAccountByUserIdAndZoneId(int userId, int zoneId);
    }
}

using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.TraineeAccounts;
using Sabio.Models.Requests;

namespace Sabio.Services.Interfaces
{
    public interface IRescueService
    {
        int Create(RescueAddRequest model, int userId);
        Rescue Get(int id);
        Paged<Rescue> GetByTraineeId(int pageIndex, int pageSize, int traineeId);
        Paged<Rescue> GetByZoneId(int pageIndex, int pageSize, int zoneId);
        Paged<Rescue> GetByTraineeAccountId(int pageIndex, int pageSize, int traineeAccountId);
    }
}
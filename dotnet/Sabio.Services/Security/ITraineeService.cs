using Microsoft.AspNetCore.Mvc;
using Sabio.Models;
using Sabio.Models.Domain.Trainees;
using Sabio.Models.Requests.InviteTrainees;
using Sabio.Models.Requests.Trainees;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sabio.Services.Security
{
    public interface ITraineeService
    {
        int Add(TraineeAddRequest model, int userId);
        int AddV2(InviteTraineeAddRequest model, int userId);
        void Delete(int Id, int userId);
        Paged<Trainee> GetByOrganizationIdPaged(int pageIndex, int pageSize, int organizationId);
        Trainee Get(int id);
        List<Trainee> GetTraineesByUserId(int userId);
        List<TraineesV2> GetByTrainingUnitId(int TrainingUnitId);
        List<TraineeV3> GetByTrainingUnitIdV2(int trainingUnitId);
        Paged<Trainee> Pagination(int pageIndex, int pageSize);
        void UpdateTrainee(TraineeUpdateRequest model, int userId);
        List<Trainee> GetByTrainingUnitId1(int id);
        void ConfirmTrainee(string token);
        List<TraineeGroupMember> GetByZoneGroupId(int zoneGroupId);
        Trainee GetByUserId(int id);
     
    }
}

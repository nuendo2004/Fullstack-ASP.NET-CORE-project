using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.TrainingScheduleRequests;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface ITrainingScheduleService
    {
        int Add(TrainingScheduleAddRequest model, int userId);
        void Delete(int id);
        TrainingSchedule Get(int id);
        Paged<TrainingSchedule> GetAllByTrainingUnitId(int pageIndex, int pageSize, int trainingUnitId);
        Paged<TrainingSchedule> GetAllCreatedBy(int pageIndex, int pageSize, int createdBy);
        List<TrainingSchedule> GetAllNonePagination(int userId);
        void Update(TrainingScheduleUpdateRequest model, int userId);
    }
}

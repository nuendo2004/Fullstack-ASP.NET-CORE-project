using Sabio.Models.Requests;

namespace Sabio.Services.Interfaces
{
    public interface ITraineeGroupService
    {
        void AddTraineeGroup(TraineeGroupAddRequest model);
        void DeleteTraineeGroup(int traineeId, int groupId);
    }
}
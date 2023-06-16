using Sabio.Models.Domain.TrainingZones;
using Sabio.Models.Requests.TrainingZones;

namespace Sabio.Services
{
    public interface ITrainingZonesServices
    {
        int Add(TrainingZonesAddRequest model, int userId);
        void Delete(int trainingUnitId, int zoneId,int userId);
        Training Get(int trainingUnitId, int zoneId);
        Training GetTrainee(int traineeId);
        Training GetUnit(int trainingUnitId);
    }
}
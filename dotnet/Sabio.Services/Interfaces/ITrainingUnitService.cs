using Sabio.Models;
using Sabio.Models.Domain.TrainingUnits;
using Sabio.Models.Requests.TrainingUnits;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface ITrainingUnitService
    {
        TrainingUnit GetById(int id);
        List<TrainingUnitPrimaryTrainer> GetByPrimaryTrainerId(int userId);
        List<TrainingUnit> GetAll();

        Paged<TrainingUnit> GetByOrgId(int pageIndex, int pageSize, int query, int organizationId);
        int Add(TrainingUnitAddRequest model, int userId);
        void Update(TrainingUnitUpdateRequest model, int userId);
        void UpdateStatus(TrainingUnitBaseUpdateRequest model, int userId);

        public List<TrainingUnit> GetByOrgIdV3(int query, int organizationId);
        public List<TrainingUnit> GetByOrgIdV3HasStudent(int query, int organizationId);
    }
}
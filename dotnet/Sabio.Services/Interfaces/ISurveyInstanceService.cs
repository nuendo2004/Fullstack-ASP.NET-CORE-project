using Sabio.Models;
using Sabio.Models.Domain.Surveys.Instances;
using Sabio.Models.Requests.SurveysInstancesRequests;

namespace Sabio.Services.Interfaces
{
    public interface ISurveyInstanceService
    {
        int Add(SurveysInstanceAddRequest model, int userId);
        void Delete(int id);
        SurveysInstance Get(int id);
        Paged<SurveysInstance> GetAll(int pageIndex, int pageSize);
        Paged<SurveysInstance> GetByCreatedBy(int pageIndex, int pageSize, int userId);
        SurveyInstanceDetails GetDetailsById(int id);
        void Update(SurveysInstanceUpdateRequest model, int userId);
    }
}
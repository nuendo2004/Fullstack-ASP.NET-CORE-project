using Sabio.Models;
using Sabio.Models.Domain.Surveys.Answers;
using Sabio.Models.Requests.SurveyAnswers;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface ISurveyAnswerService
    {
        int Add(List<SurveyAnswerAddRequest> models, int userId);
        void Delete(int id);
        SurveyAnswer Get(int id);
        Paged<SurveyAnswer> GetAll(int pageIndex, int pageSize);
        Paged<SurveyAnswer> GetByCreatedBy(int pageIndex, int pageSize, int userId);
        Paged<SurveyAnswer> GetBySurveyId(int pageIndex, int pageSize, int surveyId);
        SurveyAnswer GetBySurveyInstanceId(int id);
        void Update(SurveyAnswerUpdateRequest model, int userId);
    }
}
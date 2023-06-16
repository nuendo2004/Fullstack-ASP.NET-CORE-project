using Sabio.Models;
using Sabio.Models.Domain.Surveys.Questions;
using Sabio.Models.Requests.SurveyQuestionAnswerOptions;
using System.Collections.Generic;

namespace Sabio.Services
{
    public interface ISurveyQuestionAnswerOptionService
    {
        int AddSurveyOption(List<SurveyQuestionAnswerOptionAddRequestItem> model, int userId);
        void DeleteSurveyOption(int id);
        Paged<SurveyQuestionAnswerOption> GetByCreator(int creator, int pageIndex, int pageSize);
        SurveyQuestionAnswerOption GetSurveyOptionById(int id);
        Paged<SurveyQuestionAnswerOption> Pagination(int pageIndex, int pageSize);
        void UpdateSurveyOption(List<SurveyQuestionAnswerOptionAddRequestItem> model, int userId);
    }
}
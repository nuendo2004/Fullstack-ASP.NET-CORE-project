using Sabio.Models;
using Sabio.Models.Domain.Surveys.Questions;
using Sabio.Models.Requests.SurveyQuestions;

namespace Sabio.Services
{
    public interface ISurveyQuestionService
    {
        int AddQuestion(SurveyQuestionAddRequest model, int userId);
        void DeleteQuestion(int id);
        Paged<SurveyQuestion> GetByCreator(int creator, int pageIndex, int pageSize);
        SurveyQuestion GetSurveyQuestionById(int id);
        Paged<SurveyQuestion> Pagination(int pageIndex, int pageSize);
        void UpdateQuestion(SurveyQuestionUpdateRequest model, int userId);
    }
}
using Sabio.Models;
using Sabio.Models.Domain.Surveys;
using Sabio.Models.Domain.Surveys.Details;
using Sabio.Models.Requests.Surveys;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Sabio.Services.Interfaces
{
    public interface ISurveyService
    {
        Survey GetSurvey(int id);
        Paged<Survey> GetPaginate(int pageIndex, int pageSize);
        Paged<Survey> GetSearchPaginate(SurveySearchRequest model);
        Paged<Survey> GetCreatedBy(int pageIndex, int pageSize, int id);
        int Add(SurveyAddRequest model, int userId);
        void Update(SurveyUpdateRequest model, int userId);
        void Delete(int id, int userId);
        SurveyDetails GetSurveyDetails(int id);
        Paged<SurveyDetails> GetSurveyDetailsPaginate(int pageIndex, int pageSize);
    }
}
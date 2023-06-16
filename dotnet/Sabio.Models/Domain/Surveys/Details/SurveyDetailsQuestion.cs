using Sabio.Models.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Surveys.Details
{
    public class SurveyDetailsQuestion
    {
        public int Id { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
        public string Question { get; set; }
        public string HelpText { get; set; }
        public bool IsRequired { get; set; }
        public bool IsMultipleAllowed { get; set; }
        public LookUp QuestionType { get; set; }
        public int SurveyId { get; set; }
        public LookUp Status { get; set; }
        public int SortOrder { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public List<SurveyDetailsQuestionAnswerOption> QuestionAnswerOptions { get; set; }
    }
}

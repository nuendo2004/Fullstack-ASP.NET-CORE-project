using System;
using Sabio.Models.Domain.Users;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Surveys.Questions
{
    public class SurveyQuestion
    {
        public int Id { get; set; }
        public BaseUser CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
        public string Question { get; set; }
        public string HelpText { get; set; }
        public bool IsRequired { get; set; }
        public bool IsMultipleAllowed { get; set; }
        public LookUp QuestionTypeId { get; set; }
        public int SurveyId { get; set; }
        public LookUp StatusId { get; set; }
        public int SortOrder { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }


}

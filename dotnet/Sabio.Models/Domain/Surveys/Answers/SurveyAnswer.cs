using Sabio.Models.Domain.Surveys.Instances;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Surveys.Answers
{
    public class SurveyAnswer
    {
        public int Id { get; set; }

        public int InstanceId { get; set; }

        public int SurveyId { get; set; }

        public string SurveyName { get; set; }

        public string SurveyDescription { get; set; }

        public LookUp Status { get; set; }

        public LookUp SurveyType { get; set; }

        public List<SurveyAnswerQuestion> QuestionDetails { get; set; }

        public List<Option> AnswerOptionDetails { get; set; }

        public int AnswerNumber { get; set; }

        public string Answer { get; set; }

        public int UserId { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }
    }
}

using Sabio.Models.Domain.Surveys.Answers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Surveys.Details
{
    public class QuestionAndAnswer : SurveyDetailsQuestion
    {
        public List<BaseAnswer> Answer { get; set; }
    }
}
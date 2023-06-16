using Sabio.Models.Domain.Surveys.Details;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Surveys.Instances
{
    public class SurveyInstanceDetailsAnswer : SurveyDetailsBase
    {
        public List<QuestionAndAnswer> Questions { get; set; }
    }
}

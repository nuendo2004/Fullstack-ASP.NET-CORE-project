using Sabio.Models.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Surveys.Details
{
    public class SurveyDetails : SurveyDetailsBase
    {
        public List<SurveyDetailsQuestion> Questions { get; set; }
    }
}

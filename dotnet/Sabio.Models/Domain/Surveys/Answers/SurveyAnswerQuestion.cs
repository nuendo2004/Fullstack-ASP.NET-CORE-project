using System;
using System.Collections.Generic;
using System.Diagnostics.SymbolStore;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Sabio.Models.Domain.Surveys.Answers
{
    public class SurveyAnswerQuestion
    {
        public int Id { get; set; }

        public string Question { get; set; }

        public string HelpText { get; set; }

        public bool IsRequired { get; set; }

        public bool IsMultipleAllowed { get; set; }

        public LookUp QuestionType { get; set; }

        public LookUp StatusType { get; set; }

        public int SortOrder { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Surveys.Answers
{
    public class Option
    {
        public int Id { get; set; }

        public int QuestionId { get; set; }

        public string Text { get; set; }

        public string Value { get; set; }

        public string AdditionalInfo { get; set; }
    }
}

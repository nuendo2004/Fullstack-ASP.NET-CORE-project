using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Surveys.Answers
{
    public class BaseAnswer
    {
        public int Id { get; set; }

        public int QuestionId { get; set; }

        public string Answer { get; set; }

        public List<Option> AnswerOption { get; set; }

        public int AnswerNumber { get; set; }
    }
}

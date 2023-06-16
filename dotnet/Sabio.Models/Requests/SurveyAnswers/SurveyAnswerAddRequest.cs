using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.SurveyAnswers
{
    public class SurveyAnswerAddRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int SurveyId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int QuestionId { get; set; }

        #nullable enable
        public int? AnswerOptionId { get; set; }

        #nullable enable
        public string? Answer { get; set; }

        #nullable enable
        public int? AnswerNumber { get; set; }

    }
}
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.SurveyQuestionAnswerOptions
{
    public  class SurveyQuestionAnswerOptionUpdateRequest : SurveyQuestionAnswerOptionAddRequest, IModelIdentifier
    {
        [Required]
        public int Id { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.SurveyQuestionAnswerOptions
{
    public class SurveyQuestionAnswerOptionAddRequest
    {
        public List<SurveyQuestionAnswerOptionAddRequestItem> SurveyQuestionAnswerOptionAddRequestItem { get; set; }
    }

    public class SurveyQuestionAnswerOptionAddRequestItem
    {
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Please enter a value greater than 0")]
        public int QuestionId { get; set; }

        [Required]
        [StringLength(500, ErrorMessage = "Description Max Length is 500")]
        public string Text { get; set; }

        [StringLength(100, ErrorMessage = "Description Max Length is 100")]
        public string Value { get; set; }

        [StringLength(200, ErrorMessage = "Description Max Length is 200")]
        public string AdditionalInfo { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Please enter a value greater than 0")]
        public int CreatedBy { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Please enter a value greater than 0")]
        public int ModifiedBy { get; set; }
    }
}

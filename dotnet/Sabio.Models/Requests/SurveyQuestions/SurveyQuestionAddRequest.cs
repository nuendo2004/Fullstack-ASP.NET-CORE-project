using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.SurveyQuestions
{
    public class SurveyQuestionAddRequest
    {
   
        [Required]
        [StringLength(500, ErrorMessage = "Description Max Length is 500")]
        public string Question { get; set; }

        [StringLength(255, ErrorMessage = "Description Max Length is 255")]
        public string HelpText { get; set; }

        [Required]
        public bool IsRequired { get; set; }

        [Required]
        public bool IsMultipleAllowed { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Please enter a value greater than 0")]
        public int QuestionTypeId { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Please enter a value greater than 0")]
        public int SurveyId { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Please enter a value greater than 0")]
        public int StatusId { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Please enter a value greater than 0")]
        public int SortOrder { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Surveys
{
    public class SurveySearchRequest
    {
        [Required]
        [Range(1, Int32.MaxValue)]
        public int PageSize { get; set; }
        [Required]
        [Range(0, Int32.MaxValue)]
        public int PageIndex { get; set; }
        public List<int> StatusTypes { get; set; }
        public List<int> SurveyTypes { get; set; }
        public string Query { get; set; }
    }
}

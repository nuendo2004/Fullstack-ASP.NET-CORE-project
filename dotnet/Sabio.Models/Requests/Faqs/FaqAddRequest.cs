using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Faqs
{
    public class FaqAddRequest
    {
        [Required]
        [StringLength(255, MinimumLength = 2)]
        public string Question { get; set; }

        [Required]
        [StringLength(2000, MinimumLength = 2)]
        public string Answer { get; set; }

        [Required]
        [Range(1, Int32.MaxValue)]
        public int FAQCategoriesId { get; set; }

        [Required]
        public int SortOrder { get; set; }

    }
}

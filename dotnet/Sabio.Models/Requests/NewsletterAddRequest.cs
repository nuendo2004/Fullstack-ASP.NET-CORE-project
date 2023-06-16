using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class NewsletterAddRequest
    {       
        [Required]
        [Range (1, Int32.MaxValue)]
        public int TemplateId { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Name Max Length is 100")]
        public string Name { get; set; }
      
        [StringLength(255, ErrorMessage = "CoverPhoto Max Length is 255")]
        public string CoverPhoto { get; set; }
    }
}

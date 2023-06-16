using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class NewsletterTemplateAddRequest
    {
        [Required]
        [StringLength(100, ErrorMessage = "Description Max Length is 100")]
        public string Name { get; set; }

        [Required]
        [StringLength(200, ErrorMessage = "Description Max Length is 200")]
        public string Description { get; set; }

        [Required]
        [StringLength(4000, ErrorMessage = "Description Max Length is 4000")]
        public string Content { get; set; }

        [Required]
        [StringLength(255, ErrorMessage = "Description Max Length is 255")]
        public string PrimaryImage { get; set; }      
    }
}

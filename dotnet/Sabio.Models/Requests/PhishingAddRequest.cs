using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class PhishingAddRequest
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string ToEmail { get; set; }

        public string ToName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string FromEmail { get; set; }
        [Required]
        [StringLength(200, MinimumLength = 2)]
        public string FromName { get; set; }
        [Required]
        [StringLength(200, MinimumLength = 2)]
        public string Subject { get; set; }
        [Required]
        public string Body { get; set; }
    }
}

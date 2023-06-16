using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class ContactUsAddRequest
    {
        [Required]
        [MinLength(2),MaxLength(60)]
        public string FirstName { get; set; }
        [Required]
        [MinLength(2), MaxLength(60)]
        public string LastName { get; set; }
        [Required]
        [MinLength(6), MaxLength(60)]
        [DataType(DataType.EmailAddress)]
        public string From { get; set; }
        [Required]
        [MinLength(2), MaxLength(250)]
        public string Subject { get; set; }
        [Required]
        [MinLength(10)]
        public string Message { get; set; }
        
        [MinLength(10), MaxLength(10)]
        public string PhoneNumber { get; set; }
    }
}

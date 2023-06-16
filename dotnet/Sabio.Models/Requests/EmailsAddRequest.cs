using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class EmailsAddRequest
    {
        [Required]
        [StringLength(200, MinimumLength = 2)]
        public string To { get; set; }
        [Required]
        [StringLength(200, MinimumLength = 2)]
        public string Subject { get; set; }
        [Required]
        [StringLength(200, MinimumLength = 2)]
        public string From { get; set; }
    }
}

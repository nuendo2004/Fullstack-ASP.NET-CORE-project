using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Subscribe
{
    public class SubscribeAddRequest
    {
        [Required, MinLength(1), MaxLength(50)]
        public string ExternalId { get; set; }
        [Required, MinLength(1), MaxLength(50)]
        public string CustomerId { get; set; }
        public DateTime? DateEnded { get; set; }
        [Required, MinLength(2), MaxLength(20)]
        public string IsActive { get; set; }
        [Required, Range(1, int.MaxValue)]
        public int CreatedBy { get; set; }
        [Required, Range(1, int.MaxValue)]
        public int OrganizationId { get; set; }
    }

}

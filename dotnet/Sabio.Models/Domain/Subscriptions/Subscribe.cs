using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Subscriptions
{
    public class Subscribe
    {
        public int Id { get; set; }
        public string ExternalId { get; set; }
        public string CustomerId { get; set; }
        public DateTime DateEnded { get; set; }
        public string IsActive { get; set; }
        public int CreatedBy { get; set; }
        public int OrganizationId { get; set; }
    }
}

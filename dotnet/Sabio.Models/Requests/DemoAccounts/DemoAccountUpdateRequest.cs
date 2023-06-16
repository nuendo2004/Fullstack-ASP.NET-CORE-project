using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests.DemoAccounts
{
    public class DemoAccountUpdateRequest
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public DateTime ExpirationDate { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.DemoAccounts
{
    public class DemoAccount
    {
        public int Id { get; set; }
        public int OrgId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime ExpirationDate { get; set; }
        public int CreatedBy { get; set; }
        public int TotalCount { get; set; }
    }
}

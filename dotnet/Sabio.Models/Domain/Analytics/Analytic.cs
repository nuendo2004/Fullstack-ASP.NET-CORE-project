using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Analytics
{
    public class Analytic
    {
        public int TotalOrgs { get; set; }
        public int ActiveOrgs { get; set; }
        public int DemoAccounts60Days { get; set; }
        public int ActiveSubscriptions { get; set; }
    }
}

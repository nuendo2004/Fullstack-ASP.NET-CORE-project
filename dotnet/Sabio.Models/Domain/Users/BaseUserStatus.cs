using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Users
{
    public class BaseUserStatus
    {
        public int Active { get; set; }
        public int Inactive { get; set; }
        public int Pending { get; set; }
        public int Flagged { get; set; }
        public int Removed { get; set; }
        public int Total { get; set; }
    }
}

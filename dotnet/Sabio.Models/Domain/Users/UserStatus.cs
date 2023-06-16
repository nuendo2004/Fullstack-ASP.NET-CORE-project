using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Users
{
    public class UserStatus : BaseUserStatus
    {
        public DateTime DateModified { get; set; }
    }
}

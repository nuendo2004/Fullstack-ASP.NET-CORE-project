using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Users
{
    public class UserV2 : BaseUser
    {
        public bool IsConfirmed { get; set; }
        public int StatusTypeId { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModifed { get; set; }

    }
}

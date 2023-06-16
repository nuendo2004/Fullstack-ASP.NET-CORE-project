using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Users
{
    public class UserOrgRole
    {
        public int UserId { get; set; }
        public int OrganizationId { get; set; }
        public string OrganizationName { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
    }
}

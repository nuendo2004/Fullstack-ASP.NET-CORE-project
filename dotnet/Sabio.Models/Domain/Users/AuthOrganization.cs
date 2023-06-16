using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Users
{
    public class AuthOrganization
    {
        public int Id { get; set; }
        public List<AuthRole> Roles { get; set; }
    }
}
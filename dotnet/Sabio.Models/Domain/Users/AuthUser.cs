using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Users
{
    public class AuthUser 
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public List<int> Organizations { get; set; }
        public int CurrentOrg { get; set; }
        public List<int> Trainees { get; set; }
        public int CurrentTrainee { get; set; }
        public List<string> Roles { get; set; }

    }
}

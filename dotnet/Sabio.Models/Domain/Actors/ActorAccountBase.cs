using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class ActorAccountBase
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string AvatarUrl { get; set; }
        public LookUp Zone { get; set; }
        public LookUp ZoneStatus { get; set; }
        public LookUp AccountStatus { get; set; }
   
      
    }
}

using Sabio.Models.Domain.Consequences;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class ActorBatchV2
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public LookUp ActorTypeId { get; set; }
        public LookUp StatusTypeId { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public List<ActorAccountBase> ActorAccounts { get; set; }
        public Consequence Consequence { get; set;  }
       
       
    }
}

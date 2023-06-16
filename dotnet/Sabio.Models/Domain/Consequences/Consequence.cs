using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Consequences
{
    public class Consequence
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public LookUp ConsequenceType { get; set; }
        public ActorTemp ActorId { get; set; }
        public Zone ZoneId { get; set; }
        public bool isActive { get; set; }
        public bool isDeleted { get; set; }
        public User CreatedBy { get; set; }
        public User ModifiedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}

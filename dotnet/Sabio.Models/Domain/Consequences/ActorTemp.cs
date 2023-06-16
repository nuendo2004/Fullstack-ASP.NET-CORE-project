using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Consequences
{
    public class ActorTemp
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ActorTypeId { get; set; }
        public int StatusTypeId { get; set; }
        public int StatusType { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}

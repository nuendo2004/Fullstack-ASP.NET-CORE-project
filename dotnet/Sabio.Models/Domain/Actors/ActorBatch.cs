using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class ActorBatch
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public LookUp ActorTypeId { get; set; }
        public LookUp StatusTypeId { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public int ConId { get; set; }
        public string ConName { get; set; }
        public string ConDescription { get; set; }
        public LookUp ConsequenceType { get; set; }
        public Zone ZoneId { get; set; }
        public Zone ZoneName { get; set; }
        public Zone ZoneDescription { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public int AccountId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string AvatarUrl { get; set; }
        public LookUp AccountStatus { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class SecurityEvent
    {
        public int Id { get; set; }
        public int ZoneId { get; set; }
        public string ZoneName { get; set; }
        public int TraineeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int TraineeAccountId { get; set; }
        public string UserName { get; set; }
        public int TrainingUnitId { get; set; }
        public string TrainingUnitName { get; set; }
        public int OrganizationId { get; set; }
        public string OrganizationName { get; set; }
        public int CreatedById { get; set; }
        public DateTime DateCreated { get; set; }
    }
}

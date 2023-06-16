using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Domain.Organizations;
using Sabio.Models.Domain.Trainees;
using Sabio.Models.Domain.TrainingUnits;

namespace Sabio.Models.Domain.TraineeAccounts
{
    public class TraineeAccounts
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string AvatarUrl { get; set; }
        public Zone Zone { get; set; }
        public LookUp ZoneType { get; set; }
        public LookUp ZoneStatus { get; set; }
        public Trainee Trainee { get; set; }
        public LookUp TraineeStatus { get; set; }
        public TrainingUnit TrainingUnit { get; set; }
        public LookUp AccountStatus { get; set; }
        public BaseOrganization Organization { get; set; }
        public User User { get; set; }
        
    }
}


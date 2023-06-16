using Sabio.Models.Domain.TrainingUnits;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using  Sabio.Models.Domain.Organizations;


namespace Sabio.Models.Domain.Trainees

{
    public class Trainee
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TrainingUnitId { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public LookUp TraineeStatus {get; set;}

        public TrainingUnit TrainingUnits { get; set; }

        public Organization Organization { get; set; }
        public User User { get; set; }



    }
}

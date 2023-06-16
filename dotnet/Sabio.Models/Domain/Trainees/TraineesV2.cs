using Sabio.Models.Domain.TrainingUnits;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace Sabio.Models.Domain.Trainees

{
    public class TraineesV2
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TrainingUnitId { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public LookUp TraineeStatus { get; set; }

        public TrainingUnit TrainingUnits { get; set; }
        public User User { get; set; }



    }
}
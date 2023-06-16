using Sabio.Models.Domain.TrainingUnits;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Trainees
{
    public class TraineeV3
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TrainingUnitId { get; set; }

        public LookUp TraineeStatus { get; set; }
        public User User { get; set; }
    }
}

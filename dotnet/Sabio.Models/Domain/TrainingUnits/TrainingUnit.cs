using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Trainees;

namespace Sabio.Models.Domain.TrainingUnits
{
    public class TrainingUnit 
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public OrganizationTrainingUnit Organization { get; set; }
        public LookUp TrainingStatusId { get; set; }
        public TrainingUnitPrimaryTrainer PrimaryTrainerId { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
      
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.TrainingZones
{
    public class TrainingUnits
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public  int OrganizationId { get; set; }
        public int TrainingStatusId { get; set; }  
        
        public int PrimaryTrainerId { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
       

    }
}

using Sabio.Models.Domain.TrainingUnits;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.TrainingUnits
{
    public class TrainingUnitAddRequest
    {
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Name { get; set; }
        public string Description { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int OrganizationId { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int TrainingStatusId { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int PrimaryTrainerId { get; set; }
        
        
       
    }
}

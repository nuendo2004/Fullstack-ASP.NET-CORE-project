using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.TrainingUnits
{
    public class TrainingUnitBaseUpdateRequest : IModelIdentifier
    {
        [Required]
        public int Id { get; set; }
       
        public int TrainingStatusId { get; set; }
       
    }
}

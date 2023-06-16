using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Trainees
{

   public class TraineeAddRequest
    {     
        [Required]
        [Range(1, Int32.MaxValue)]
        public int TrainingUnitId { get; set; }
        [Required]
        public int TraineeStatusId { get; set; }

    }
}

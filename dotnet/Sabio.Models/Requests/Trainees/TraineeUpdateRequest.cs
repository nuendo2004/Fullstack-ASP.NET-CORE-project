using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Trainees
{
   public class TraineeUpdateRequest:TraineeAddRequest,IModelIdentifier
    {
        public int Id { get; set; }
    }
}

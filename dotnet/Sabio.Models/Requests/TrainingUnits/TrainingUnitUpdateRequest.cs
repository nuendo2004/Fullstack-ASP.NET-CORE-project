using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.TrainingUnits
{
    public class TrainingUnitUpdateRequest : TrainingUnitBaseUpdateRequest
        //NOTE:  I cannot inherit from AddRequest because there are fields that I dont need to update. This comment will be removed
    {
   
        public string Name { get; set; }
        public string Description { get; set; }
        public int PrimaryTrainerId { get; set; }


    }
}

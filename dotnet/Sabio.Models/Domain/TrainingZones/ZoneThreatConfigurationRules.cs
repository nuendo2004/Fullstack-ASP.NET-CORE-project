using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.TrainingZones
{
    public class ZoneThreatConfigurationRules
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string  Description { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }

        public LookUp SpeedCategory { get; set; }
        public SpreadLevel SpreadLevel { get; set; }
        public Organizations Organization { get; set; }


    }
}

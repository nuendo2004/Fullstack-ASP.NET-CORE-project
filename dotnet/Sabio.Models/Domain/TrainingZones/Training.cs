using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.TrainingZones
{
    public class Training
    {

        public int CreatedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public Zones Zones { get; set; }
        public ZoneThreatConfigurationRules ZoneThreatConfigurationRules { get; set; }
        public LookUp ZoneTypes { get; set; }
        public TrainingUnits TrainingUnits { get; set; }
        public LookUp ZoneStatus { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.TrainingZones
{
    public class TrainingZonesAddRequest
    {
        [Required]
        [Range(1,Int32.MaxValue)]
       public int TrainingUnitId { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int ZoneId { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int ThreatConfigId { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int ZoneStatusId { get; set; }

    }
}

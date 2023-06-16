using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.TrainingZones
{
    public class ZoneConfigAddRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int OrganizationId { get; set; }
        public int SpreadLevelId { get; set; }
        public int SpeedCategoryId { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.TrainingZones
{
    public class Zones
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ZoneTypeId { get; set; }
        public int ZoneStatusId { get; set; }
        public bool IsDeleted { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.ZoneTrackers
{
    public class ZoneMinified
    {
        public int Id { get; set; } = 0;
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public string ZoneType { get; set; }
        public string ZoneStatus { get; set; }

    }
}

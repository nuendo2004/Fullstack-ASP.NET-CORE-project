using System;
namespace Sabio.Models.Domain.ZoneTrackers
{

    public class ZoneRecord
    {

        public int Id { get; set; }
        public DateTime TimeAccessed { get; set; }
        public string Device { get; set; }
        public ZoneMinified Zone { get; set; }

    }
}

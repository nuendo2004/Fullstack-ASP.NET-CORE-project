using Sabio.Models.Domain.ZoneTrackers;
using System.Collections.Generic;

namespace Sabio.Models.Domain.ZoneTracker
{
    public class ZoneTrackerBase
    {
        public int TraineeId { get; set; }
        public int TrainingUnitId { get; set; }
        public List<ZoneRecord> Records { get; set; }
    }
}

using Sabio.Models.Domain.Users;
using Sabio.Models.Domain.ZoneTracker;

namespace Sabio.Models.Domain.ZoneTrackers
{
    public class ZoneTracker: ZoneTrackerBase
    {

        public BaseUser User { get; set; }

    }
}

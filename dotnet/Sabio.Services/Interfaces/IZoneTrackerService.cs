using Sabio.Models;
using Sabio.Models.Domain.ZoneTracker;
using Sabio.Models.Domain.ZoneTrackers;
using Sabio.Models.Requests;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IZoneTrackerService
    {
        Paged<ZoneTracker> GetAll(int pageIndex, int pageSize);
        Paged<ZoneTracker> GetByTrainingUnitId(int pageIndex, int pageSize, int trainingUnitId, bool hasRecordOnly);
        Paged<ZoneTracker> GetByOrganizationId(int pageIndex, int pageSize, int orgId, bool hasRecordOnly);
        Paged<ZoneRecord> GetByFilteredZoneId(int pageIndex, int pageSize, int zoneId, int traineeId);
        Paged<ZoneRecord> GetByTraineeId(int pageIndex, int pageSize, int traineeId);
        Paged<ZoneRecord> GetByTraineeIdSearch(int pageIndex, int pageSize, int traineeId, string dateStart, string dateEnd, int zoneId);
        List<ZoneAccessLogChart> GetChartByTraineeId(int id);
    }
}
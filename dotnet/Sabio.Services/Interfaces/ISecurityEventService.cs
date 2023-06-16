using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.SecurityEvents;
using Sabio.Models.Requests;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface ISecurityEventService
    {
        int Create(SecurityEventAddRequest model);
        Paged<SecurityEvent> GetByTraineeId(int traineeId, int pageIndex, int pageSize);
        Paged<SecurityEvent> GetByTraineeAccountId(int traineeId, int pageIndex, int pageSize);
        Paged<SecurityEvent> GetByTrainingUnitId(int trainingUnitId, int pageIndex, int pageSize);
        Paged<SecurityEvent> GetByUserId(int userId, int pageIndex, int pageSize);
        Paged<SecurityEvent> GetByZoneId(int zoneId, int pageIndex, int pageSize);
        List<List<SecurityEventOrgStats>> GetOrganizationStats(int orgId);
    }
}
using Sabio.Models;
using Sabio.Models.Domain.TrainingZones;
using Sabio.Models.Requests.TrainingZones;

namespace Sabio.Services
{
    public interface IZoneConfigServices
    {
        int Add(ZoneConfigAddRequest model,int userId);
        Paged<ZoneThreatConfigurationRules> Pagination(int pageIndex, int pageSize, int OrganizationId);
        void Update(ZoneConfigUpdateRequest model,int userId);
        public void Delete(int id);
        ZoneThreatConfigurationRules Get(int id);
        public Paged<ZoneThreatConfigurationRules> PaginationSpeed(int pageIndex, int pageSize, int organizationId, int speedCategoryId);
        public Paged<ZoneThreatConfigurationRules> PaginationSpread(int pageIndex, int pageSize, int organizationId, int spreadLevelId);
    }
}
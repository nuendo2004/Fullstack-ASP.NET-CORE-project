using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;

namespace Sabio.Services.Interfaces
{
    public interface IZoneGroupService
    {
        int AddZoneGroup(ZoneGroupAddRequest model, int userId);

        void UpdateZoneGroup(ZoneGroupUpdateRequest model, int userId);

        void DeleteZoneGroup(int id, int userId);

        Paged<ZoneGroup> GetAllZoneGroups(int pageIndex, int pageSize);

        ZoneGroup GetZoneGroupById(int id);

        Paged<ZoneGroup> GetZoneGroupsByZoneId(int pageIndex, int pageSize, int zoneId);

        Paged<ZoneGroup> SearchZoneGroupsByZoneId(int pageIndex, int pageSize, int zoneId, string query);


    }
}
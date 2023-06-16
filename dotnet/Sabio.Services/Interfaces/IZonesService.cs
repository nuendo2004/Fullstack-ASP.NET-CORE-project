using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Zones;
using System.Collections.Generic;

namespace Sabio.Services
{
    public interface IZonesService
    {
        int Add(ZoneAddRequest model, int userId);
        public Zone GetById(int id);
        void Update(ZoneUpdateRequest model, int userId);
        void Delete(int id, int userId);
        void UpdateStatusId(int id, int statusId, int userId);
        Paged<Zone> GetByZoneStatusIdPaged(int id, int pageIndex, int pageSize);
        List<Zone> GetByZoneStatusId(int statusId);
        Paged<Zone> GetByZoneTypeId(int id, int pageIndex, int pageSize);
        Paged<Zone> GetByZoneStatusIdAndByZoneTypeId(int statusId, int typeId, int pageIndex, int pageSize);
        Paged<Zone> SelectAllPaginated(int pageIndex, int pageSize);
        Paged<Zone> Search(int pageIndex, int pageSize, string query);
        List<Zone> GetAllZones();
    }
}
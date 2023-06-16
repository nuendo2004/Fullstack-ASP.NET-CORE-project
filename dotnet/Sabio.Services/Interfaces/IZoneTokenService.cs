using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.ZoneTokens;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IZoneTokenService
    {
        string Add(ZoneTokenAddRequest model, int userId);
        void DeleteZoneToken(string token);
        ZoneToken GetByToken(string token);
        Paged<ZoneToken> GetByTokenTypeId(int typeId, int pageIndex, int pageSize);
        List<ZoneToken> GetByZoneAndZoneTokenTypeId(int zoneId, int zoneTokenTypeId);
        void Update(ZoneTokenUpdateRequest model, int userId);
    }
}
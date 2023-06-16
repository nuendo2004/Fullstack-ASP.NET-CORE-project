using Sabio.Models;
using Sabio.Models.Domain.Consequences;
using Sabio.Models.Requests.Consequences;
using System.Collections.Generic;

namespace Sabio.Services
{
    public interface IConsequenceService
    {
        Consequence GetById(int id);
        int AddConsequence(ConsequenceAddRequest model, int userId);
        Paged<Consequence> GetByActorId(int pageIndex, int pageSize, int actorId);
        List<Consequence> GetByZoneId(int zoneId);
        Paged<Consequence> Paged(int pageIndex, int pageSize);
        void UpdateConsequence(ConsequenceUpdateRequest model, int userId);
        void UpdateDeleteConsequence(int id);
    }
}
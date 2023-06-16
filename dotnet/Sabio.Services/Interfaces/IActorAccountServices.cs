using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.ActorAccountRequests;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IActorAccountServices
    {
        int Add(ActorAccountAddRequest model, int userId);
        Paged<ActorAccount> GetByActorId(int actorId, int pageIndex, int pageSize);
        ActorAccount GetById(int id);
        List<ActorAccount> GetByZoneId(int zoneId);
        void Update(ActorAccountUpdateRequest model, int userId);
        void UpdateStatus(ActorAccountStatusUpdateRequest model, int userId);
    }
}
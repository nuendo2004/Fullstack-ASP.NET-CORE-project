using Sabio.Models;
using Sabio.Models.Domain.Actors;
using Sabio.Models.Requests.Actors;
using Sabio.Services.Interfaces;
using System.Collections.Generic;

namespace Sabio.Services
{
    public interface IActorService
    {
        int AddActor(ActorsAddRequest request, int userId);
        List<Actor> GetAllActors();

        public Paged<Actor> GetAllActorsPaginate(int pageIndex, int pageSize);
        Actor GetActorById(int id);
        public Paged<Actor> GetByCreator(int pageIndex, int pageSize, string creator);
        void DeleteActor(int id, int userId);
        void UpdateActor(ActorUpdateRequest update, int userId);

    }
}
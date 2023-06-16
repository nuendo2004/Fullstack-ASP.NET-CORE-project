using System.Collections.Generic;
using Sabio.Models.Domain;
using Sabio.Models.Requests.LocationRequests;

namespace Sabio.Services.Interfaces
{
    public interface ILocationService  
    {

        int Add(LocationAddRequest model, int userId);

        void Update(LocationUpdateRequest model, int userId);

        void Delete(int id);

        List<Location> Get(int id);
    }
}
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Ratings;
using Sabio.Models.Requests.Ratings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public interface IRatingService
    {
        int Add(RatingAddRequest model, int userId);
        Rating GetById(int id);
        void Update(RatingUpdateRequest model, int userId);
        Paged<Rating> SelectAllPaginated(int pageIndex, int pageSize);
        Paged<Rating> GetByCreatedBy(int userId, int pageIndex, int pageSize);
        void Delete(int id, int userId);
        List<RatingBase> GetRatingsAverage(int EntityId, int EntityTypeId);
    }
}

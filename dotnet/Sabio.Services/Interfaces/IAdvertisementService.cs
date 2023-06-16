using Sabio.Models;
using Sabio.Models.Domain.Advertisements;
using Sabio.Models.Requests.Advertisements;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IAdvertisementService
    {
        int Add(AdvertisementAddRequest model, int userId);

        void Delete(int id, int userId);

        Advertisement Get(int id);

        Paged<Advertisement> GetAll(int pageIndex, int pageSize);

        Paged<Advertisement> GetByCreatedBy(int userId, int pageIndex, int pageSize);

        void Update(AdvertisementUpdateRequest model, int userId);

        void UpdateStatus(int id, int userId, bool isDisabled);
    }
}

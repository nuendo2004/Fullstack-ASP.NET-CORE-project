using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Avatars;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IAvatarService
    {
       void Create(List<AvatarAddRequest> model);
        List<Avatar> GetAll();
        Avatar GetById(int id);
        Paged<Avatar> GetPaged(int pageIndex, int pageSize, string query);
        void Update(UpdateAvatarRequest model);
        void UpdateDelete(AvatarUpdateDelete model);
    }
}
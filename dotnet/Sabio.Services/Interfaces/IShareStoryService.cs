using Sabio.Models;
using Sabio.Models.Domain.ShareStory;
using Sabio.Models.Requests.ShareStory;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IShareStoryService
    {
       

        void UpdateStories(ShareStoryUpdateRequest mod, int userId);

        void UpdateApproval(ShareStoryUpdateApprovalRequest mod,int userId);

        ShareStory GetById(int id);

        Paged<ShareStory> GetPaginated(int pageIndex, int pageSize, bool IsApproved);

        int AddStories( ShareStoryAddRequest mod,int userId);
        void Delete(int Id);

        Paged<ShareStory> SearchPaginated(int pageIndex, int pageSize, string query);
    }
}                   
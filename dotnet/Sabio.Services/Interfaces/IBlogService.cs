using Sabio.Models;
using Sabio.Models.Domain.Blogs;
using Sabio.Models.Requests.Blogs;

namespace Sabio.Services.Interfaces
{
    public interface IBlogService
    {
        int Create(BlogAddRequest model, int authId);
        void Delete(int id, int userId);
        Paged<Blog> GetAll(int pageIndex, int pageSize, bool isApproved, bool isPublished, bool isDeleted);
        Paged<Blog> GetByAuthorId(int pageIndex, int pageSize, bool isApproved, bool isPublished, bool isDeleted, int authorId);
        Blog GetById(int id);
        Paged<Blog> GetByType(int pageIndex, int pageSize, bool isApproved, bool isPublished, bool isDeleted, int blogTypeId);
        void Update(BlogUpdateRequest model);
        void UpdateApproval(int id, bool isApproved, int userId);
    }
}
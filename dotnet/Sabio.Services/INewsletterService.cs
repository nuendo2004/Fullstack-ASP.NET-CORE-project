using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;

namespace Sabio.Services
{
    public interface INewsletterService
    {
        int Add(NewsletterAddRequest addModel, int Id);
        void DeleteById(int Id);
        Paged<Newsletter> GetAllPaged(int pageIndex, int pageSize);
        Paged<Newsletter> GetSearchPaged(int pageIndex, int pageSize, string query);
        void Update(NewsletterUpdateRequest updateModel);
    }
}
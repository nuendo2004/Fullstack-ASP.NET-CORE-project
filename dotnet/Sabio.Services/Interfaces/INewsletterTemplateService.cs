using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;

namespace Sabio.Services.Interfaces
{
    public interface INewsletterTemplateService
    {
        void DeleteById(int id);
        int Insert(NewsletterTemplateAddRequest addModel, int userId);
        Paged<NewsletterTemplate> SelectAll(int pageIndex, int pageSize);
        void Update(NewsletterTemplateUpdateRequest updateModel, int id, int userId);
    }
}
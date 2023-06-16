using Sabio.Models.Domain;
using Sabio.Models.Requests.Faqs;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IFaqService
    {
        List<Faqs> GetAllFaqs();
        Faqs GetFaqByCatId(int CategoryId);
        int FaqAdd(FaqAddRequest model, int userId);
        void FaqUpdate(FaqUpdateRequest model, int userId);
        void FaqDeleteById(int Id);
    }
}
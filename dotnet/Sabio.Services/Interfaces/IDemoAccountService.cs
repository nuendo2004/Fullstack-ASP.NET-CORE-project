using Sabio.Models.Domain.DemoAccounts;
using Sabio.Models.Requests.DemoAccounts;
using Stripe;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IDemoAccountService
    {
        int Add(int userId);
        List<DemoAccount> GetAll();
        List<DemoAccount> GetAccountById(int createdBy);
        DemoAccount GetById(int id);
        List<DemoAccountData> GetActiveDemoAccounts();
        List<DemoAccountSummary> GetSummaryByMonth();
        void Update(DemoAccountUpdateRequest model, int userId);
    }
}
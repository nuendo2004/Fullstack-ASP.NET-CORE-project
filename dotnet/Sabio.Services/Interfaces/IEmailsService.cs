using Sabio.Models.Domain;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests;
using Sabio.Models.Requests.DemoAccounts;
using sib_api_v3_sdk.Model;

namespace Sabio.Services.Interfaces
{
    public interface IEmailsService
    {
        void TestEmail(string toEmail);
        void DemoAccountEmail(string toEmail);
    }
}
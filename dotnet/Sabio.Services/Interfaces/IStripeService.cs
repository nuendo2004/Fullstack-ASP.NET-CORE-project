using Sabio.Models.Domain.Subscriptions;
using Sabio.Models.Domain.Transactions;
using Sabio.Models.Requests;
using Sabio.Models.Requests.Subscribe;
using Sabio.Models.Requests.Transactions;
using Stripe.Checkout;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Interfaces
{
    public interface IStripeService
    {

        string CreateSession();
        object CreateCustomer();
        int CreateTransaction(TransactionAddRequest model, int tId);
        Transaction GetById(int id);
        List<Transaction> GetAllByOrderId();
        Paged<Transaction> GetCreatedBy(int pageIndex, int pageSize, int createdBy);
        string SubscribeSession(string priceId);
        Subscription GetSubId(int id);
        List<Subscription> SubGetAll();
        int CreateSubscription(SubscribeAddRequest model, int userId);
        int AddSubscription(string sessionId, int userId);
        Subscribe GetSubscribeByIdPaginated(int id);
        int AddInvoiceData(string invoiceId, int userId);
        object CreateInvoice(string customerId);
        object GetInvoice(string customerId);
        List<List<SubscriptionRevenue>> GetTotalRevenue();
    }
}

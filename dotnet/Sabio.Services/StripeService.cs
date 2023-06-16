using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.AppSettings;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Subscriptions;
using Sabio.Models.Domain.Transactions;
using Sabio.Models.Interfaces;
using Sabio.Models.Requests;
using Sabio.Models.Requests.Invoices;
using Sabio.Models.Requests.Subscribe;
using Sabio.Models.Requests.Transactions;
using Stripe;
using Stripe.Checkout;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics.CodeAnalysis;
using System.Drawing.Text;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Subscription = Sabio.Models.Domain.Subscriptions.Subscription;

namespace Sabio.Services
{
    public class StripeService : IStripeService
    {
        private AppKeys _appKeys = null;
        private IDataProvider _data = null;
       public StripeService(IOptions<AppKeys> appKeys, IDataProvider data)
        {
            _appKeys = appKeys.Value;
            _data = data;
        }

        public string CreateSession()
        {
            StripeConfiguration.ApiKey = _appKeys.StripeAppKey;
            string domain = _appKeys.Domain;

            SessionCreateOptions options = new SessionCreateOptions
            {
                LineItems = new List<SessionLineItemOptions>
                {
                  new SessionLineItemOptions
                  {
                    Price = "price_1Lv6jjHkFyvG29LsQ58usFjI",
                    Quantity = 1,
                  },
                },
                Mode = "payment",
                SuccessUrl = domain + "/stripecheckoutsuccess",
                CancelUrl = domain + "/stripecheckoutcanceled",
            };

            SessionService service = new SessionService();
            Session session = service.Create(options);

            return session.Id;
        }

        public string SubscribeSession(string priceId)
        {
            StripeConfiguration.ApiKey = _appKeys.StripeAppKey;
            string domain = _appKeys.Domain;

            SessionCreateOptions priceOptions = new SessionCreateOptions
            {
                LineItems = new List<SessionLineItemOptions>
                {
                  new SessionLineItemOptions
                  {
                    Price = priceId,
                    Quantity = 1,
                  },
                },
                Mode = "subscription",
                SuccessUrl = domain + "/success?session_id={CHECKOUT_SESSION_ID}",
                CancelUrl = domain + "?canceled=true",
            };

            SessionService service = new SessionService();
            Session session = service.Create(priceOptions);

            return session.Id;
        }

        public int AddSubscription(string sessionId, int userId)
        {
            StripeConfiguration.ApiKey = _appKeys.StripeAppKey;
            SessionService service = new SessionService();
            Session session = service.Get(sessionId);
            SubscriptionService subService = new SubscriptionService();
            Stripe.Subscription sub = subService.Get(session.SubscriptionId);
            
            SubscribeAddRequest request = new SubscribeAddRequest();

            request.ExternalId = session.SubscriptionId;
            request.CustomerId = session.CustomerId;
            request.DateEnded = sub.CurrentPeriodEnd;
            request.IsActive = sub.Status;
            request.CreatedBy = userId;
            request.OrganizationId = 73;

            int id = CreateSubscription(request, userId);

            return id;
        }

        public List<Subscription> SubGetAll()
        {
            string procName = "dbo.StripeProduct_GetAll";
            List<Subscription> list = null;

            _data.ExecuteCmd(procName, inputParamMapper: null
                , singleRecordMapper: delegate(IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Subscription subscription = MapSingleSubscription(reader, ref startingIndex);

                if (list == null)
                    {
                        list = new List<Subscription>();
                    }
                list.Add(subscription);
                });
            return list;
        }

        public int CreateSubscription(SubscribeAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[Subscriptions_Insert]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddSubscribeParams(model, col, userId);

                    SqlParameter idOut = new SqlParameter("@Id", System.Data.SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    col.Add(idOut);
                },
                returnParameters: delegate(SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;
                    Int32.TryParse(oId.ToString(), out id);
                });
            return id;
        }

        public object CreateInvoice(string customerId)
        {
            StripeConfiguration.ApiKey = _appKeys.StripeAppKey;

            InvoiceCreateOptions options = new InvoiceCreateOptions
            {
                Customer = customerId
            };
            InvoiceService service = new InvoiceService();
            Invoice invoice = service.Create(options);

            return invoice.Id;
        }

        public int AddInvoiceData(string invoiceId, int userId)
        {
            StripeConfiguration.ApiKey = _appKeys.StripeAppKey;
            InvoiceService service = new InvoiceService();
            Invoice invoice = service.Get(invoiceId);
            SubscriptionService subService = new SubscriptionService();
            Stripe.Subscription sub = subService.Get(invoice.SubscriptionId);

            InvoiceAddRequest request = new InvoiceAddRequest();
            Subscribe subscribe = new Subscribe();
            
            request.ExternalId = subscribe.ExternalId;
            request.StripeInvoiceId = sub.LatestInvoiceId;
            request.CreatedBy = userId;
            request.Amount = invoice.AmountPaid;
            request.PurchaseDate = invoice.Created;
            request.CancelDate = sub.CurrentPeriodEnd;
           

            int id = AddInvoice(request, userId);

            return id;
        }

        public object GetInvoice(string customerId)
        {
            StripeConfiguration.ApiKey = _appKeys.StripeAppKey;

            InvoiceListOptions options = new InvoiceListOptions();
            {
                options.Limit = 1;
            }

            InvoiceService service = new InvoiceService();
            StripeList<Invoice> invoices = service.List(options);

            return invoices;
        }

        public int AddInvoice(InvoiceAddRequest model, int userId)
        {
            int id = 0;
            string procName = "dbo.SubscriptionTransactions_Insert";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddInvoiceParams(model, col, userId);

                    SqlParameter idOut = new SqlParameter("@Id", System.Data.SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    col.Add(idOut);
                },
                returnParameters: delegate(SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;
                    Int32.TryParse(oId.ToString(), out id);
                });
            return id;
        }

        public Subscribe GetSubscribeByIdPaginated(int id)
        {
            string procName = "dbo.Subscriptions_SelectById_Paginated";
            Subscribe sub = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, delegate(IDataReader reader, short set)
            {
                int startingIndex = 0;
                sub = MapSingleSub(reader, ref startingIndex);
            });
            return sub;
        }

        public Subscription GetSubId(int id)
        {
            string procName = "dbo.StripeProduct_GetById";
            Subscription subscription = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, delegate(IDataReader reader, short set)
            {
                int startingIndex = 0;
                subscription = MapSingleSubscription(reader, ref startingIndex);
            });
            return subscription;
        }

        public object CreateCustomer()
        {
            StripeConfiguration.ApiKey = _appKeys.StripeAppKey;

            CustomerCreateOptions options = new CustomerCreateOptions
            {
                Description = "First Customer"
            };
            CustomerService service = new CustomerService();
            Customer customer = service.Create(options);
            customer.Id = customer.Id + 1;
            return customer.Id;
        }

        public int CreateTransaction(TransactionAddRequest model, int tId)
        {
            int id = 0;
            string procName = "dbo.Transactions_Insert";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col, tId);

                    SqlParameter idOut = new SqlParameter("@Id", System.Data.SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    col.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;
                    Int32.TryParse(oId.ToString(), out id);
                });
            return id;
        }

        public Transaction GetById(int id)
        {
            string procName = "dbo.Transactions_Select_ById";
            Transaction transaction = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, delegate(IDataReader reader, short set)
            {
                int startingIndex = 0;
                transaction = MapSingleTransaction(reader, ref startingIndex);
            });
            return transaction;
        }

        public List<Transaction> GetAllByOrderId()
        {
            string procName = "dbo.Transactions_Select_ByOrderId";
            List<Transaction> list = null;

            _data.ExecuteCmd(procName, inputParamMapper: null
                , singleRecordMapper: delegate(IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Transaction transaction = MapSingleTransaction(reader, ref startingIndex);

                    if(list == null)
                    {
                        list = new List<Transaction>();
                    }
                    list.Add(transaction);
                });
            return list;
        }

        public Paged<Transaction> GetCreatedBy(int pageIndex, int pageSize, int createdBy)
        {
            Paged<Transaction> pagedList = null;
            List<Transaction> list = null;
            int totalCount = 0;

            string procName = "dbo.Transactions_Select_ByCreatedBy";
            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
                col.AddWithValue("@CreatedBy", createdBy);
            }, singleRecordMapper: delegate(IDataReader reader, short set)
            {
                Transaction transaction;
                int startingIndex = 0;
                transaction = MapSingleTransaction(reader, ref startingIndex);

                if(totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                };
                if(list == null)
                {
                    list = new List<Transaction>();
                }
                list.Add(transaction);
            });
            if(list != null)
            {
                pagedList = new Paged<Transaction>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public List<List<SubscriptionRevenue>> GetTotalRevenue()
        {
            string procName = "[dbo].[SubscriptionTransactions_Select_TotalRevenue]";
            List<SubscriptionRevenue> weeklyRevenue = null;
            List<SubscriptionRevenue> monthlyRevenue = null;
            List<SubscriptionRevenue> yearlyRevenue = null;
            List<List<SubscriptionRevenue>> returnList = new List<List<SubscriptionRevenue>>();

            _data.ExecuteCmd
                (
                    storedProc: procName,
                    inputParamMapper: null,
                    singleRecordMapper: delegate (IDataReader reader, short set)
                    {
                        switch(set)
                        {
                            case 0:
                                {
                                    int columnIndex = 0;
                                    SubscriptionRevenue revenue = MapSingleRevenue(reader, columnIndex);
                                    if (weeklyRevenue == null)
                                    {
                                        weeklyRevenue = new List<SubscriptionRevenue>();
                                    }
                                    weeklyRevenue.Add(revenue);
                                    break;
                                }
                            case 1:
                                {
                                    int columnIndex = 0;
                                    SubscriptionRevenue revenue = MapSingleRevenue(reader, columnIndex);
                                    if (monthlyRevenue == null)
                                    {
                                        monthlyRevenue = new List<SubscriptionRevenue>();
                                    }
                                    monthlyRevenue.Add(revenue);
                                    break;
                                }
                            case 2:
                                {
                                    int columnIndex = 0;
                                    SubscriptionRevenue revenue = MapSingleRevenue(reader, columnIndex);
                                    if (yearlyRevenue == null)
                                    {
                                        yearlyRevenue = new List<SubscriptionRevenue>();
                                    }
                                    yearlyRevenue.Add(revenue);
                                    break;
                                }
                        }
                    }
                );
            returnList.Add(weeklyRevenue);
            returnList.Add(monthlyRevenue);
            returnList.Add(yearlyRevenue);
            return returnList;
        }

        private static SubscriptionRevenue MapSingleRevenue(IDataReader reader, int index)
        {
            SubscriptionRevenue revenue = new SubscriptionRevenue();
            revenue.TimePeriod = reader.GetSafeDateTime(index++);
            revenue.TotalRevenue = reader.GetSafeDecimal(index++);
            return revenue;
        }
        private static Subscription MapSingleSubscription(IDataReader reader, ref int startingIndex)
        {
            Subscription subscription = new Subscription();

            subscription.Id = reader.GetSafeInt32(startingIndex++);
            subscription.Name = reader.GetSafeString(startingIndex++);
            subscription.ProductId = reader.GetSafeString(startingIndex++);
            subscription.PriceId = reader.GetSafeString(startingIndex++);
            subscription.Price = reader.GetSafeInt32(startingIndex++);
            subscription.Description = reader.GetSafeString(startingIndex++);

            return subscription;
        }
        private static Subscribe MapSingleSub(IDataReader reader, ref int startingIndex)
        {
            Subscribe sub = new Subscribe();
            sub.Id = reader.GetSafeInt32(startingIndex++);
            sub.ExternalId = reader.GetSafeString(startingIndex++);
            sub.CustomerId = reader.GetSafeString(startingIndex++);
            sub.DateEnded = reader.GetSafeDateTime(startingIndex++);
            sub.IsActive = reader.GetSafeString(startingIndex++);
            sub.CreatedBy = reader.GetSafeInt32(startingIndex++);
            sub.OrganizationId = reader.GetSafeInt32(startingIndex++);
            return sub;
        }

        private static Transaction MapSingleTransaction(IDataReader reader, ref int startingIndex)
        {
            Transaction transaction = new Transaction();

            transaction.Id = reader.GetSafeInt32(startingIndex++);
            transaction.PaymentTypeId = reader.GetSafeInt32(startingIndex++);
            transaction.ExternalTransactionId = reader.GetSafeString(startingIndex++);
            transaction.ExternalUserId = reader.GetSafeString(startingIndex++);
            transaction.AmountCharged = reader.GetSafeDecimal(startingIndex++);
            transaction.CreatedBy = reader.GetSafeInt32(startingIndex++);
            transaction.DateCreated = reader.GetDateTime(startingIndex++);

            return transaction;
        }

        private static void AddCommonParams(TransactionAddRequest model, SqlParameterCollection col, int tId)
        {
            col.AddWithValue("@PaymentTypeId", model.PaymentTypeId);
            col.AddWithValue("@ExternalTransactionId", model.ExternalTransactionId);
            col.AddWithValue("@ExternalUserId", model.ExternalUserId);
            col.AddWithValue("@AmountCharged", model.AmountCharged);
            col.AddWithValue("@CreatedBy", model.CreatedBy);
        }
        private static void AddSubscribeParams(SubscribeAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@ExternalId", model.ExternalId);
            col.AddWithValue("@CustomerId", model.CustomerId);
            col.AddWithValue("@DateEnded", model.DateEnded);
            col.AddWithValue("@isActive", model.IsActive);
            col.AddWithValue("@CreatedBy", model.CreatedBy);
            col.AddWithValue("@OrganizationId", model.OrganizationId);
        }
        private static void AddInvoiceParams(InvoiceAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@ExternalId", model.ExternalId);
            col.AddWithValue("@StripeInvoiceId", model.StripeInvoiceId);
            col.AddWithValue("@CreatedBy", model.CreatedBy);
            col.AddWithValue("@Amount", model.Amount);
            col.AddWithValue("@PurchaseDate", model.PurchaseDate);
            col.AddWithValue("@CancelDate", model.CancelDate);
            col.AddWithValue("@RefundedAmount", DBNull.Value);
        }
    }
}

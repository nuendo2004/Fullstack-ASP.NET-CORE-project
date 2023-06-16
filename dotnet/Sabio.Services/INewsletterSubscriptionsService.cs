using Sabio.Models;
using Sabio.Models.Domain.NewsletterSubscriptions;
using Sabio.Models.Requests;
using System;
using System.Collections.Generic;

namespace Sabio.Services
{
    public interface INewsletterSubscriptionsService
    {
        string Create(NewsletterSubscriptionAddRequest model);
        void UpdateSubscription(NewsletterSubcriptionUpdateRequest model);
        Paged<NewsletterSubscription> GetAllPaged(int pageIndex, int pageSize);
        List<NewsletterSubscriptionsPerMonth> GetByDate(string startDate, string endDate);
        Paged<NewsletterSubscription> GetPagedByIsSubcribed(int pageIndex, int pageSize, bool isSubscribed);
        Paged<NewsletterSubscription> SearchPagedByIsSubcribed(int pageIndex, int pageSize, bool isSubscribed, string query);
        List<NewsletterSubscription> GetAllByIsSubcribed(bool isSubscribed);
    }
}
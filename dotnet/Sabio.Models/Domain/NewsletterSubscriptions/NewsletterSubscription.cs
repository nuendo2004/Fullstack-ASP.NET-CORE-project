using System;

namespace Sabio.Models.Domain.NewsletterSubscriptions
{
    public class NewsletterSubscription
    {
        public string Email { get; set; }
        public bool IsSubscribed { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.NewsletterSubscriptions
{
    public class NewsletterSubscriptionsPerMonth
    {
        public int Year { get; set; }
        public int Month { get; set; }
        public int TotalSubscribersPerMonth { get; set; }
        public int CurrentSubscribers { get; set; }
        public int TotalCountSubscribers { get; set; }
    }
}

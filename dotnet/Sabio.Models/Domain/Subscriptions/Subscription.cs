using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Subscriptions
{
    public class Subscription
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ProductId { get; set; }
        public string PriceId { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
    }
}

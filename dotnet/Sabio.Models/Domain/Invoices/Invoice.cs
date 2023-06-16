using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Invoices
{
    public class Invoice
    {
        public int Id { get; set; }
        public string ExternalId { get; set; }
        public string StripeInvoiceId { get; set; }
        public int CreatedBy { get; set; }
        public Decimal Amount { get; set; }
        public DateTime PurchaseDate { get; set; }
        public DateTime CancelDate { get; set; }
        public Decimal RefundedAmount { get; set; }
    }
}

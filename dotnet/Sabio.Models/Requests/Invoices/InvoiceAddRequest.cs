using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Invoices
{
    public class InvoiceAddRequest
    {
        [Required, StringLength(50)]
        public string ExternalId { get; set; }
        [Required, StringLength(50)]
        public string StripeInvoiceId { get; set; }
        [Required, Range(1, int.MaxValue)]
        public int CreatedBy { get; set; }
        [Required, Range(0, (double)decimal.MaxValue)]
        public Decimal Amount { get; set; }
        [Required, DataType(DataType.DateTime)]
        public DateTime PurchaseDate { get; set; }
        public DateTime CancelDate { get; set; }
    }
}

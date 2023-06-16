using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Transactions
{
    public class TransactionAddRequest
    {
        [Required, Range(1, Int32.MaxValue)]
        public int PaymentTypeId { get; set; }

        [Required, StringLength(255, MinimumLength = 2)]
        public string ExternalTransactionId { get; set; }

        [Required, StringLength(255, MinimumLength = 2)]
        public string ExternalUserId { get; set; }

        public Decimal AmountCharged { get; set; }

        [Required, Range(1, Int32.MaxValue)]
        public int CreatedBy { get; set; }
    }
}

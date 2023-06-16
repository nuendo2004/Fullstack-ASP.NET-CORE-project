using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Transactions
{
    public class Transaction
    {
        public int Id { get; set; }

        public int PaymentTypeId { get; set; }

        public string ExternalTransactionId { get; set; }

        public string ExternalUserId { get; set; }

        public Decimal AmountCharged { get; set; }

        public int CreatedBy { get; set; }

        public DateTime DateCreated { get; set; }
    }
}

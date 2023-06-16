using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.TraineeAccounts
{
    public class BaseTraineeAccount
    {
        public int UserId { get; set; }
        public int TraineeId { get; set; }
        public int TraineeAccountId { get; set; }
        public string TraineeAccountUserName { get; set; }
        public int TraineeAcccountZoneId { get; set; }
    }
}

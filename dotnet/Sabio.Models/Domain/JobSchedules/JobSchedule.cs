using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.JobSchedules
{
    public class JobSchedule
    {
        public int Id { get; set; }
        public int ChronJobTypeId { get; set; }
        public bool IsRecurring { get; set; }
        public int UtcHourToRun { get; set; }
        public int IntervalTypeId { get; set; }
        public int DaysOfWeekId { get; set; }
        public int EntityTypeId { get; set; }
        public int RecipientId { get; set; }
        public string Recipient { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public bool IsDeleted { get; set; }
       

    }
}

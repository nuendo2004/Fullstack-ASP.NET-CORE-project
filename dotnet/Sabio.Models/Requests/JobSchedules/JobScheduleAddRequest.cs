using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.JobSchedules
{
    public class JobScheduleAddRequest 
    {
        [Range(1, 4)]
        public int ChronJobTypeId { get; set; }
        [Required]
        public bool IsRecurring { get; set; }
        [Range(0, 23)]
        public int UtcHourToRun { get; set; }
        [Range(1, 4)]
        public int IntervalTypeId { get; set; }
        [Range(1, 9)]
        public int DaysOfWeekId { get; set; }
        [Required]
        [Range(1, 8)]
        public int EntityTypeId { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int RecipientId { get; set; }
        [StringLength(255)]
        public string Recipient { get; set; }
        [Required]
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
        [Required]
        public DateTime DateCreated { get; set; }
        [Required]
        public DateTime DateModified { get; set; }
        [Required]
        public bool IsDeleted { get; set; }

    }
}

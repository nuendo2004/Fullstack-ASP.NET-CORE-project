using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.TrainingScheduleRequests
{
    public class TrainingScheduleAddRequest
    {
        [Required]
        public string Name { get; set; }

        [Required, Range(1, int.MaxValue)]
        public int TrainingUnitId { get; set; }

        [Required, Range(1, int.MaxValue)]
        public int DaysOfWeekId { get; set; }

        [Required]
        public DateTime StartTime { get; set; }

        [Required]
        public DateTime EndTime { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public int ModifiedBy { get; set; }

    }
}

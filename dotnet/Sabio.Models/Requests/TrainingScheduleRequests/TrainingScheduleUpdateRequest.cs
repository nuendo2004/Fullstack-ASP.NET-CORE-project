using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.TrainingScheduleRequests
{
    // Can't inherit AddRequest since models defer enough - Hector Arias
    public class TrainingScheduleUpdateRequest 
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

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
    }
}

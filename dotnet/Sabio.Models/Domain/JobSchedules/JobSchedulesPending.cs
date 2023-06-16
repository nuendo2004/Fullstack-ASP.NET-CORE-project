using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.JobSchedules
{
    public class JobSchedulesPending
    {
        public List<JobSchedule> Daily { get; set; }
        public List<JobSchedule> Weekly { get; set; }
        public List<JobSchedule> Monthly { get; set; }
        public List<JobSchedule> Yearly { get; set; }
    }
}

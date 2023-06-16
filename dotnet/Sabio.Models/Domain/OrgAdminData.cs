using Sabio.Models.Domain.Blogs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class OrgAdminData
    {
        public int EmployeeCount { get; set; }
        public List<TrainingSchedule> Trainings { get; set; }
        public List <Blog> Blogs { get; set; }
        public int TraineeCount { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Trainees
{
    public class TraineeGroupMember
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string AvatarUrl { get; set; }
        public string ZoneGroupName { get; set; }
        public int TrainingUnitId { get; set; }
        public int TraineeStatusId { get; set; }
        public bool IsConfirmed { get; set; }
    }
}

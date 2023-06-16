using Sabio.Models.Domain.Trainees;
using System;

namespace Sabio.Models.Domain.TraineeAccounts
{
    public class Rescue
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public LookUp EventType { get; set; }
        public Trainee TraineeId { get; set; }
        public TraineeAccounts TraineeAccountId { get; set; }
        public Zone ZoneId { get; set; }
        public User UserId { get; set; }
        public DateTime DateCreated { get; set; }
    }
}

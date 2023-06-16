using System;

namespace Sabio.Models.Domain
{
    public class ZoneToken
    {
        public string Token { get; set; }
        public int ZoneId { get; set; }
        public int ZoneTokenTypeId { get; set; }
        public int EntityId { get; set; }
        public string Name { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public int TraineeId { get; set; }
        public int Quantity { get; set; }
        public int TrainingUnitId { get; set; }
    }
}

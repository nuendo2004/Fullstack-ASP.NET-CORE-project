using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class TaskEvent
    {
        public int Id { get; set; }
        public int ZoneId { get; set; }
        public LookUp EntityType { get; set; }
        public int EntityId { get; set; }
        public LookUp TaskEventType { get; set; }
        public int? NumericValue { get; set; }
        public bool BoolValue { get; set; }
        public string Text { get; set; }
        public string Payload { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set;}
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class TaskEventAddRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int ZoneId { get; set; }
        
        [Required]
        [Range(1, int.MaxValue)]
        public int EntityTypeId { get; set; }
        
        [Required]
        [Range(1, int.MaxValue)]
        public int EntityId { get; set; }
        
        [Required]
        [Range(1, int.MaxValue)]
        public int TaskEventTypeId { get; set; }

        public int? NumericValue { get; set; }
        
        [Required]
        public bool BoolValue { get; set; }
        
        [Required]
        [StringLength(255, MinimumLength = 1)]
        public string Text { get; set; }
        
        [Required]
        [StringLength(int.MaxValue, MinimumLength = 1)]
        public string Payload { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.ZoneTokens
{
    public class ZoneTokenAddRequest
    {
        [Required]
        [Range(1, Int32.MaxValue)]
        public int ZoneId { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int ZoneTokenTypeId { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int EntityId { get; set; }
        [Required]
        [StringLength(100, MinimumLength = 8)]
        public string Name { get; set; }

        [Required]
        [Range(1, Int32.MaxValue)]
        
        public int TraineeId { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int Quantity { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]

        public int TrainingUnitId { get; set; }
    }
}

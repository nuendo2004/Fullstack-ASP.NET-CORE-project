using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class SecurityEventAddRequest
    {
        [Required, Range(1,Int32.MaxValue)]
        public int ZoneId { get; set; }
        [Required, MinLength(2), MaxLength(200)]
        public string Token { get; set; }
        [Required, Range(1, Int32.MaxValue)]
        public int TraineeId { get; set; }
        [Required, Range(1, Int32.MaxValue)]
        public int TrainingUnitId { get; set; }
        [Required, Range(1, Int32.MaxValue)]
        public int TraineeAccountId { get; set; }
        [Required, Range(1, Int32.MaxValue)]
        public int CreatedById { get; set; }
    }
}

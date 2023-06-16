using System;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Sabio.Models.Requests
{
    public class RescueAddRequest
    {
        [Required, MinLength(2), MaxLength(100)]
        public string Subject { get; set; }
        [Required, MinLength(2), MaxLength(3000)]
        public string Description { get; set; }
        [Required, Range(1, Int32.MaxValue)]
        public int EventReportingTypeId { get; set; }
        [Required, Range(1, Int32.MaxValue)]
        public int TraineeId { get; set; }
        [AllowNull]
        public int? TraineeAccountId { get; set; }
        [AllowNull]
        public int? ZoneId { get; set; }
    }
}

using Sabio.Models.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Consequences
{
    public class ConsequenceAddRequest
    {
        [Required, MinLength(2), MaxLength(100)]
        public string Name { get; set; }
        [Required, MinLength(2), MaxLength(500)]
        public string Description { get; set; }
        [Required, Range(1, Int32.MaxValue)]
        public int ConsequenceTypeId { get; set; }
        [Required, Range(1, Int32.MaxValue)]
        public int ActorId { get; set; }
        [AllowNull]
        public int? ZoneId { get; set; }
    }
}



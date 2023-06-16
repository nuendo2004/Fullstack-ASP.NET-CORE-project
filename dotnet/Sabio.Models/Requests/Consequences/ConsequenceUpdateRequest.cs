using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Consequences
{
    public class ConsequenceUpdateRequest : ConsequenceAddRequest
    {
        [Required, Range(1, Int32.MaxValue)]
        public int Id { get; set; }
        public bool IsActive { get; set; }
        public bool isDeleted { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Actors
{
    public class ActorsAddRequest
    {
        [Required]
        [MinLength(2), MaxLength(100)]
        public string Name { get; set; }
        [Required]
        [MinLength(2), MaxLength(500)]
        public string Description { get; set; }
        [Required, Range(1, 5)]
        public int ActorTypeId { get; set; }
        [Required, Range(1, 5)]
        public int StatustypeId { get; set; }
        [Required, Range(1, int.MaxValue)]
        public int CreatedBy { get; set; }
        [Required, Range(1, int.MaxValue)]
        public int ModifiedBy { get; set; }
       
    }
}

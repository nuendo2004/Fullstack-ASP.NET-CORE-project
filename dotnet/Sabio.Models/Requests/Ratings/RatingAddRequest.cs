using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Ratings
{
    public class RatingAddRequest
    {
        [Required]
        [Range(1, 5)]
        public byte RatingValue { get; set; }   
        [Range(1, Int32.MaxValue)]
        public int? CommentId { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int EntityTypeId { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int EntityId { get; set; }
    }
}

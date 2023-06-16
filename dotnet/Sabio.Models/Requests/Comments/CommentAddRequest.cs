using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Comments
{
    public class CommentAddRequest
    {
        [StringLength(50)]
        public string Subject { get; set; }

        [Required]
        [StringLength(3000, MinimumLength = 10)]
        public string Text { get; set; }
  
        public int? ParentId { get; set; }

        [Required]
        [Range(1, Int32.MaxValue)]
        public int EntityTypeId { get; set; }

        [Required]
        [Range(1, Int32.MaxValue)]
        public int EntityId { get; set; }
    }
}
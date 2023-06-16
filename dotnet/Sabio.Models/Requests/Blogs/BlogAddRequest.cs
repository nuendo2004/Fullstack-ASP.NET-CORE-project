using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Blogs
{
    public class BlogAddRequest
    {
        [Required,Range(1,Int32.MaxValue)]
        public int BlogTypeId { get; set; }
        
        [Required, MinLength(2), MaxLength(100)]
        public string Title { get; set; }
        [Required, MinLength(2), MaxLength(100)]
        public string Subject { get; set; }
        [Required, MinLength(2), MaxLength(Int32.MaxValue)]
        public string Content { get; set; }
        [Url]
        public string ImageUrl { get; set; }
        [Required]
        public bool IsPublished { get; set; }
        [AllowNull]
        public DateTime? DatePublished { get; set; }
    }
}

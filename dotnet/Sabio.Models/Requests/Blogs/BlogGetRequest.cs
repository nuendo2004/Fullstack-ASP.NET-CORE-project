using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Blogs
{
    public class BlogGetRequest
    {
        [Required, Range(0,Int32.MaxValue)]
        public int PageIndex { get; set; }
        [Required, Range(1,Int32.MaxValue)]
        public int PageSize { get; set; }
        [Required]
        public bool IsApproved { get; set; }
        [Required]
        public bool IsPublished { get; set; }
        [Required]
        public bool IsDeleted { get; set; }
    }
}

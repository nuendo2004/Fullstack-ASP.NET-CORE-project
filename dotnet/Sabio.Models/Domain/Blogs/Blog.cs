using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Blogs
{
    public class Blog
    {
        public int Id { get; set; }
        public string BlogType { get; set; }
        public UserNameAvatar Author { get; set; }
        public string Title { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public string ImageUrl { get; set; }
        public bool IsApproved { get; set; }
        public UserNameAvatar ApprovedBy { get; set; }
        public bool IsPublished { get; set; }
        public DateTime DatePublished { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}

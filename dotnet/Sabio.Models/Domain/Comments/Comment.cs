using Sabio.Models.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Comments
{
    public class Comment
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public string Text { get; set; }
        public int ParentId { get; set; }
        public LookUp EntityType { get; set; }
        public int EntityTypeId { get; set; }
        public int EntityId { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public bool IsDeleted { get; set; }
        public BaseUser CreatedBy { get; set; }
        public List<Comment> Replies { get; set; }

    }
}

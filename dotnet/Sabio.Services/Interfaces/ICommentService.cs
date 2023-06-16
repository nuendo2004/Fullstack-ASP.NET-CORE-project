using Sabio.Models.Domain.Comments;
using Sabio.Models.Requests.Comments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface ICommentService
    {
        int Add(CommentAddRequest model, int userId);
        void Update(CommentUpdateRequest model, int userId);
        List<Comment> GetNestedComments(int entityId, int entityTypeId);
        void Delete(int id);
        List<Comment> SelectByCreatedBy(int id);
    }
}

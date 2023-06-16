using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Avatars
{
    public class UpdateAvatarRequest : IModelIdentifier
    {
        [Required, Range(1, int.MaxValue)]
        public int Id { get; set; }
        [Required, Range(1,int.MaxValue)]
        public int FileId { get; set; }
        [Required, Range(1, int.MaxValue)]
        public int CreatedBy { get; set; }
    }
}

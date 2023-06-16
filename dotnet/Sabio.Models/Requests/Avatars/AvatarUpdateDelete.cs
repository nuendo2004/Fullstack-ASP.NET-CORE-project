using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Avatars
{
    public class AvatarUpdateDelete: IModelIdentifier
    {
        [Required, Range(1, int.MaxValue)]
        public int Id { get; set; }
        [Required]
        public bool IsDeleted { get; set; }
    }
}

using Sabio.Models.Domain;
using Sabio.Models.Domain.Files;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Avatars
{
    public class AvatarAddRequest
    {
        [Required, Range(1, int.MaxValue)]
        public int FileId { get; set; }
        [Required, Range(1, int.MaxValue)]
        public int UserId { get; set; }
    }
}

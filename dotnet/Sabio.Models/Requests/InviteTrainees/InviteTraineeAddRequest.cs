using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.InviteTrainees
{
   public class InviteTraineeAddRequest
    {
        [Required]
        [Range(1, Int32.MaxValue)]
        public int TrainingUnitId { get; set; }
        [Required]
        [MinLength(2), MaxLength(128)]
        public string Token { get; set; }
        [Required]
        [MinLength(2), MaxLength(100)]
        public string FirstName { get; set; }
        [Required]
        [MinLength(2), MaxLength(100)]
        public string LastName { get; set; }
        [Required]
        [MinLength(2), MaxLength(255)]
        public string Email { get; set; }
        [Required]
        [MinLength(2), MaxLength(64)]
        public string Username { get; set; }
        [Required]
        [MinLength(2), MaxLength(255)]
        public string AvatarUrl { get; set; }
    }
}

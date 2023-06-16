using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.TraineeAccounts
{
    public class TraineeAccountsAddRequest
    {
        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Username { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 2)]
        public string Password { get; set; }

        [Required]
        public string AvatarUrl { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int ZoneId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int TraineeId { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.TraineeAccounts
{
    public class TraineeAccountsAvatarUpdate
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int Id { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 2)]
        public string AvatarUrl { get; set; }
    }
}

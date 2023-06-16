using System;
using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests.TraineeAccounts
{
    public class TraineeAccountsPasswordUpdate
    {
        [Required]
        [Range(1, Int32.MaxValue)]
        public int TraineeAccountId { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 8)]
        public string CurrentPassword { get; set; }

        [Required]
        [RegularExpression("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
            , ErrorMessage = "New Password must contain at least 8 characters; 1 uppercase letter; 1 lowercase letter; 1 number; 1 symbol (#?!@$%^&*-)")]
        public string NewPassword { get; set; }

        [Required]
        [Compare("NewPassword")]
        public string ConfirmPassword { get; set; }

    }
}

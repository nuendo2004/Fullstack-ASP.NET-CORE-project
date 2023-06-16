using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class ChangePasswordRequest
    {
        [Required]
        public string Token { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
            , ErrorMessage = "Password must contain at least 8 characters; 1 uppercase letter; 1 lowercase letter; 1 number; 1 symbol (#?!@$%^&*-)")]
        public string Password { get; set; }

        [Required]
        [Compare("Password")]

        public string PasswordConfirm { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics.CodeAnalysis;
using Sabio.Models.Domain;

namespace Sabio.Models.Requests
{
    public class UserAddRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        public string FirstName { get; set; }
        
        public string LastName { get; set; }
        public string Mi { get; set; }
        public string AvatarUrl { get; set; }

        [Required]
        [RegularExpression("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
            , ErrorMessage = "Password must contain at least 8 characters; 1 uppercase letter; 1 lowercase letter; 1 number; 1 symbol (#?!@$%^&*-)")]
        public string Password { get; set; }

        [Required]
        [Compare("Password")]
        public string PasswordConfirm { get; set; }
        
        [Required]
        [Range(1, int.MaxValue)]
        public int ReferenceTypeId { get; set; }
    }
}

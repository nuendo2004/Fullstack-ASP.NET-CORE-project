using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.TraineeAccounts
{
    public class TraineeAccountLoginRequest
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [RegularExpression("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
            , ErrorMessage = "Password must contain at least 8 characters; 1 uppercase letter; 1 lowercase letter; 1 number; 1 symbol (#?!@$%^&*-)")]
        public string Password { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int ZoneId { get; set; }

        [Required]
        [Range(1, Int32.MaxValue)]
        public int DeviceTypeId { get; set; }
    }
}

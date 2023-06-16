using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.ZoneTokens
{
    public class ZoneTokenUpdateRequest : ZoneTokenAddRequest
    {
        [Required]
        [StringLength(200, MinimumLength = 8)]
        public string Token { get; set; }
    }
}

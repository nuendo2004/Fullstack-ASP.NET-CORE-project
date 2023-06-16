
using Sabio.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace Sabio.Models.Requests.ActorAccountRequests
{
    public class ActorAccountAddRequest
    {
        [Required]
        [StringLength(30,MinimumLength =6)]
        public string UserName { get; set; }
    
        [Required,Url]
        public string AvatarUrl { get; set; }
        
        [Required, Range(1, Int32.MaxValue)]
        public int AccountStatusId  { get; set; }      

    }
}

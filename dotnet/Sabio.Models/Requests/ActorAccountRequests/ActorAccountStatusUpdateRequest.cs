using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.ActorAccountRequests
{
    public class ActorAccountStatusUpdateRequest: IModelIdentifier
    {
       
        public int Id { get; set; }
        [Required, Range(1, Int32.MaxValue)]
        public int ModifiedBy { get; set; }
        [Required, Range(1, Int32.MaxValue)]
        public int AccountStatusId { get; set; }
    }
}

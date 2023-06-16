using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.ShareStory
{
    public class ShareStoryUpdateApprovalRequest
    {
        public int Id { get; set; }
        
        public bool IsApproved { get; set; }
    }
}

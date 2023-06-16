using Sabio.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.ShareStory
{
    public class ShareStory
    {
        public int Id { get; set; } 

        public string Title { get; set; }

        public string Email { get; set; }   

        public string Story { get; set; }

        public string CreatedByFirstName { get; set; }

        public string CreatedByLastName { get; set; }

        public bool IsApproved { get; set; }

        public int ApprovedBy { get; set; }

        public List<ShareStories> Files{ get; set; }

 

        public DateTime DateCreated { get; set; }   

        public DateTime DateModified  { get; set; }

    }
}
   
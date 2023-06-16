using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.ShareStory
{
    public class ShareStoryAddRequest
    {
        [Required]
        [StringLength(100)]
        public string Title { get; set; }
       
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(50)]
        public string Story { get; set; }

        [Required]
        [Range (0,1)]
        public bool IsApproved { get; set; }   
        
        // is a not requried nullable
        public int ApprovedBy { get; set; }

        //is not required to add files
        public List<int> StoryFiles { get; set; }



    }
}

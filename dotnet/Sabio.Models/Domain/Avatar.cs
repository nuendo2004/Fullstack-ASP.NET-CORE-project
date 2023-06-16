using Sabio.Models.Domain.Files;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class Avatar
    {
       public int Id {get;set;}
       public File FileId { get; set; }
       public bool IsDeleted { get; set; }
       public User CreatedBy { get; set; } 
       public DateTime DateCreated { get; set; }
    }
}

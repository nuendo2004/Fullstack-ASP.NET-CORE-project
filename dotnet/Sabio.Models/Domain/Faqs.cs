using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class Faqs
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }        
        public LookUp Category { get; set; }		
        public int SortOrder { get; set; }      

    }
}

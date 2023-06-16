using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class ZoneBase
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<LookUp> ZoneType { get; set; }
        public List<LookUp> ZoneStatus { get; set; }
        public bool IsDeleted { get; set; }
    }
}

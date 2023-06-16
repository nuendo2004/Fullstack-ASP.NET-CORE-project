using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Sabio.Models.Domain
{
    public class Zone
    {
        public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
        public string ImageUrl { get; set; }
        public LookUp ZoneType { get; set; }
		public LookUp ZoneStatus { get; set; }
		public bool IsDeleted { get; set; }
		public int CreatedBy { get; set; }
		public int ModifiedBy { get; set; }
		public DateTime DateCreated { get; set; }
		public DateTime DateModified { get; set; }
    }
}
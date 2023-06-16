using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Advertisements
{
    public class Advertisement
    {
        public int Id { get; set; }
        public int EntityId { get; set; }
        public LookUp EntityType { get; set; }
        public string Title { get; set; }
        public string AdMainImageUrl { get; set; }
        public string Details { get; set; }
        public string ActionId { get; set; }
        public bool IsDisabled { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
    }
}

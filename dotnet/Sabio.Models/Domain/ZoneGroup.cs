using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class ZoneGroup : ZoneGroupBase
    {
        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }

        public int CreatedBy { get; set; }

        public int ModifiedBy { get; set; }

    }
}

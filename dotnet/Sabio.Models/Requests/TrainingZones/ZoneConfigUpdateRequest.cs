using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.TrainingZones
{
    public class ZoneConfigUpdateRequest: ZoneConfigAddRequest
    {
        public int Id { get; set; }
        public DateTime DateModified { get; set; }
    }
}

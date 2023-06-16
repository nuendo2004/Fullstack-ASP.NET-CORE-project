using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.TrainingZones
{
    public class Organizations
    {
        public int Id { get; set; }
        public int OrganizationTypeId { get; set; }
        public string Name { get; set; }
        public int PrimaryLocationId { get; set; }
        

    }
}

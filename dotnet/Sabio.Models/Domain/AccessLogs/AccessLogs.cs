using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.AccessLogs
{
    public class AccessLogs
    {
        public int Id { get; set; }

        public LookUp EntityType { get; set; }

        public int EntityId  { get; set; }

        public LookUp AccessType { get; set; }

        public LookUp AccessStatus { get; set; }

        public string IPAddressPort { get; set; }

        public string EndpointName { get; set; }

        public DateTime DateCreated { get; set; }

        public string PayloadName { get; set; }

        public string Route { get; set; }

        public LookUp DeviceType { get; set; } 


    }
}
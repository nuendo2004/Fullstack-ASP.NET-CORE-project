using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.AccessLogs
{
    public class AccessLogAddRequest
    {
        [Required]
        [Range (1, Int32.MaxValue)]
        public int EntityTypeId { get; set; }

        [Required]
        [Range(1, Int32.MaxValue)]
        public int EntityId { get; set; }

        [Required]
        [Range(1, Int32.MaxValue)]
        public int AccessTypeId { get; set; }

        [Required]
        [Range(1, Int32.MaxValue)]
        public int AccessStatusId { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string IPAddressPort { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string EndpointName { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string PayloadName { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Route { get; set; }

        [Required] 
        [Range(1, Int32.MaxValue)]
        public int DeviceTypeId { get; set; }

        public Nullable<int> ZoneId {get; set; }
    
    }
}
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class ZoneGroupAddRequest 
    {
        [Required]
        [StringLength(200, MinimumLength = 2)]
        public string Name { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }

        [Required]
        [Range(1, Int32.MaxValue)]
        public int ZoneId { get; set; }

        [Required]
        [Range(1, Int32.MaxValue)]
        public int EntityTypeId { get; set; }

        [Required]
        [Range(1, Int32.MaxValue)]
        public int GroupAdminId { get; set; }

    }
}

using System;
using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests.Zones
{
    public class ZoneAddRequest
    {
        [Required]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Maximum 100 characters")]
        public string Name { get; set; }
        [StringLength(500, ErrorMessage = "Maximum 500 characters")]
        public string Description { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int ZoneTypeId { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int ZoneStatusId { get; set; }
    }
}
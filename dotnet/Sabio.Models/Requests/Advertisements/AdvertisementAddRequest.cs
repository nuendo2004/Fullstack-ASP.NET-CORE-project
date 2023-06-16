using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Advertisements
{
    public class AdvertisementAddRequest
    {
        [Required]
        [Range(1, Int32.MaxValue)]
        public int EntityId { get; set; }

        [Required]
        [Range(1, Int32.MaxValue)]
        public int EntityTypeId { get; set; }

        [Required]
        public string Title { get; set; }

        [Url]
        public string AdMainImageUrl { get; set; }

        public string Details { get; set; }

        public string ActionId { get; set; }
    }
}

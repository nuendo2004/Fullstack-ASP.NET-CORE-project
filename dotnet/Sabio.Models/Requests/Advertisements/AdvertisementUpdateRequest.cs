using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Advertisements
{
    public class AdvertisementUpdateRequest : AdvertisementAddRequest, IModelIdentifier
    {
        [Required]
        public int Id { get; set; }
    }
}

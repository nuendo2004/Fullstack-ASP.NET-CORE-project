using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.LocationRequests
{
    public class LocationAddRequest
    {
        [Required]
        [Range(1, Int32.MaxValue)]
        public int LocationTypeId { get; set; }

        [Required]
        public string LineOne { get; set; }

        public string LineTwo { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Zip { get; set; }

        [Required]
        [Range(1, Int32.MaxValue)]
        public int StateId { get; set; }


        [Required]
        [Range(-90, 90)]
        public float Latitude { get; set; }

        [Required]
        [Range(-180, 180)]
        public float Longitude { get; set; }


    }
}

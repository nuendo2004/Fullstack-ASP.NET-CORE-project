using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Organizations
{
    public class OrganizationAddRequestV2
    {
        [Required]
        [Range(1, 17, ErrorMessage = "OrganizationType IDshuold be an integer between 1 and 17.")]
        public int OrganizationTypeId { get; set; }

        [Required]
        [StringLength(200, MinimumLength = 2, ErrorMessage = "Name shuold have between 2 and 200 characters of length.")]
        public string Name { get; set; }

        [StringLength(200, MinimumLength = 2, ErrorMessage = "Description shuold have between 2 and 200 characters of length.")]
        public string Description { get; set; }

        [Url]
        public string LogoUrl { get; set; }

        [StringLength(20, MinimumLength = 5)]
        public string BusinessPhone { get; set; }
        
        [Url]
        public string SiteUrl { get; set; }

        [Required]
        public bool IsDeleted { get; set; }

        [Required]
        public int LocationTypeId { get; set; }

        [Required]
        public string LineOne { get; set; }

        [StringLength(255, MinimumLength = 2)]
        public string LineTwo{ get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Zip { get; set; }

        [Required]
        public int StateId { get; set; }

        [Required]
        public float Latitude { get; set; }

        [Required]
        public float Longitude { get; set; }
    }
}

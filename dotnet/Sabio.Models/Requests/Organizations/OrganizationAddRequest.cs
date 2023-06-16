using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Organizations
{
    public class OrganizationAddRequest
    {
        [Required]
        [Range(1,17, ErrorMessage = "OrganizationType ID shuold be an integer between 1 and 17.")]
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

    #nullable enable
        [Range(0, Int32.MaxValue, ErrorMessage = "Location ID shuold be an integer greater than 0.")]
        public int? PrimaryLocationId { get; set; }
    #nullable disable

        [Url]
        public string SiteUrl { get; set; }

        [Required]
        public bool IsDeleted { get; set; }
    }
}

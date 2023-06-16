using Sabio.Models.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Sabio.Models.Requests.ExternalLink
{
    public class ExternalLinkBatchAddRequest
    {
        [Required]
        public List<LookUp> UrlType { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int EntityId { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int EntityTypeId { get; set; }

    }
}
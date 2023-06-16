using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class FileAddRequest
    {
        [Required]
        [StringLength(255, MinimumLength = 2)]
        public string Name { get; set; }

        [Required]
        [Url, StringLength(255, MinimumLength = 2)]
        public string Url { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int FileTypeId { get; set; }


    }
}

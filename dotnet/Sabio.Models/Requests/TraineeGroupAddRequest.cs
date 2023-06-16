using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class TraineeGroupAddRequest
    {
        [Required]
        [Range(1, Int32.MaxValue)]
        public int TraineeId { get; set; }

        [Required]
        [Range(1, Int32.MaxValue)]
        public int GroupId { get; set; }

    }
}

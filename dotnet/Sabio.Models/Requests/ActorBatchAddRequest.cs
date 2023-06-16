using Sabio.Models.Requests.ActorAccountRequests;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests
{
    public class ComprehensiveActorAccountAddRequest 
    {
        [Required]
        [MinLength(2), MaxLength(100)]
        public string ActorName { get; set; }
        [Required]
        [MinLength(2), MaxLength(500)]
        public string ActorDescription { get; set; }
        [Required, Range(1, 5)]
        public int ActorTypeId { get; set; }
        [Required, Range(1, 5)]
        public int StatustypeId { get; set; }
        [Required, Range(1, int.MaxValue)]
        public int CreatedBy { get; set; }
        [Required, Range(1, int.MaxValue)]
        public int ModifiedBy { get; set; }

        [Required, MinLength(2), MaxLength(100)]
        public string ConName { get; set; }
        [Required, MinLength(2), MaxLength(500)]
        public string ConDescription { get; set; }
        [Required, Range(1, Int32.MaxValue)]
        public int ConsequenceTypeId { get; set; }    
        public int? ZoneId { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }     
        public List<ActorAccountAddRequest> ActorAccount { get; set; }

    }
}

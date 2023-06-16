using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Messages
{
    public class MessageAddRequest
    {
        [Required,MinLength(2), MaxLength(1000)]
        public string Message { get; set; }
        [Required,MinLength(2), MaxLength(100)]
        public string Subject { get; set; }
        [Required,Range(1,Int32.MaxValue)]
        public int RecipientEntityTypeId { get; set; }
        [Required, Range(1,Int32.MaxValue)]
        public int RecipientId { get; set; }
        [Required,Range(1,Int32.MaxValue)]
        public int SenderEntityTypeId { get; set; }
        [Required,Range(1,Int32.MaxValue)]
        public int SenderId { get; set; }
        [Required,Range(1,Int32.MaxValue)]
        public int ZoneId { get; set; }
        [AllowNull]
        public DateTime? DateSent { get; set; }
        [AllowNull]
        public DateTime? DateRead { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Messages
{
    public class Message
    {
        public int Id { get; set; }
        public string MessageBody { get; set; }
        public string Subject { get; set; }
        public EntityData RecipientData { get; set; }
        public EntityData SenderData { get; set; }
        public int ZoneId { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime DateSent { get; set; }
        public DateTime DateRead { get; set; }
    }
}

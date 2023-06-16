using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Messages
{
    public class GroupMessage
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public string Subject { get; set; }
        public int ZoneGroupId { get; set; }
        public int SenderEntityTypeId { get; set; }
        public int SenderId { get; set; }
        public int ZoneId { get; set; }
        public DateTime DateSent { get; set; }
    }
}

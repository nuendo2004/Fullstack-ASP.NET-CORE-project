using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Messages
{
    public class EntityData
    {
        public int Id { get; set; }
        public int EntityTypeId { get; set; }
        public string Name { get; set; }
        [AllowNull]
        public string AvatarUrl { get; set; }
        [AllowNull]
        public string ZoneType { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Files
{
    public class File
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public LookUp FileType { get; set; }
        public int CreatedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsDeleted { get; set; }
    }
}

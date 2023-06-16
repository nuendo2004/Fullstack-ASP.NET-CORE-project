using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models
{
    public class ReportConfig
    {
        public string Name { get; set; }
        public List<string> Dimensions { get; set; }
        public List<string> Metrics { get; set; }
    }
}

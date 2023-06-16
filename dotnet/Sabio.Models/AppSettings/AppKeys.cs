using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.AppSettings
{
    public class AppKeys
    {
        public string StripeAppKey { get; set; }
        public string Domain { get; set; }       
        public string SendInBlueAPIkey { get; set; }
        public string AccountEmail { get; set; }
    }
}

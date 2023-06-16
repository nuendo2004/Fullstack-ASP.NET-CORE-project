using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.AppSettings
{
    public class AWSStorage
    {
        public string AccessKey { get; set; }
        public string Secret { get; set; }
        public string BucketRegion { get; set; }
        public string Domain { get; set; }
        public string BucketName { get; set; }
    }
}

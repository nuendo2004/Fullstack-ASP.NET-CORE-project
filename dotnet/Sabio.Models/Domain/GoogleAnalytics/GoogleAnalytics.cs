using Google.Apis.AnalyticsReporting.v4.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.GoogleAnalytics
{
    public class GoogleAnalytics
    {
        public List<DateRange> DateRanges { get; set; }
        public List<Dimension> Dimensions { get; set; }
        public List<Metric> Metrics { get; set; }
    }
}

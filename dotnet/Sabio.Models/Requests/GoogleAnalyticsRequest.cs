using Google.Apis.AnalyticsReporting.v4.Data;
using Sabio.Models.Domain.GoogleAnalytics;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class GoogleAnalyticsRequest
    {
        [Required]
        public string StartDate { get; set; }
        [Required]
        public string EndDate { get; set; }
        [Required]
        public string Metric { get; set; }
        [Required]
        public string Dimension { get; set; }
    }
}

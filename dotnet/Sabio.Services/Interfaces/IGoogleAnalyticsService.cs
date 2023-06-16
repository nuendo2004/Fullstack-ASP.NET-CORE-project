using Google.Apis.AnalyticsReporting.v4.Data;
using Sabio.Models.Domain;
using Sabio.Models.Domain.GoogleAnalytics;
using Sabio.Models.Requests;
using System.Collections.Generic;
using System.Drawing.Printing;

namespace Sabio.Services.Interfaces
{
    public interface IGoogleAnalyticsService
    {
         public GetReportsResponse Google(GoogleAnalyticsRequest model);
    }
}
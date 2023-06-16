using Sabio.Data.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Data;
using Google.Apis.Auth.OAuth2;
using System.Security.Cryptography.X509Certificates;
using Google.Apis.Services;
using Google.Apis.AnalyticsReporting.v4.Data;
using System.Data;
using Sabio.Models.Domain;
using Newtonsoft.Json;
using Sabio.Models;
using System.IO;
using System.Collections.Specialized;
using System.Net;
using System.Security.Cryptography;
using System.Xml.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using Sabio.Models.Domain.GoogleAnalytics;
using System.Linq.Expressions;
using Stripe;
using Sabio.Services.Interfaces;
using System.Net.Http.Headers;
using System.Drawing.Text;
using Sabio.Models.AppSettings;
using Microsoft.Extensions.Options;
using Google.Apis.AnalyticsReporting.v4;
using Amazon.Runtime.Internal;
using Sabio.Models.Requests;

namespace Sabio.Services
{

    public class GoogleAnalyticsService : IGoogleAnalyticsService
    {
        private GAOAuth _gaoAuth;
        public GoogleAnalyticsService(IOptions<GAOAuth> gaoAuth)
        {
            _gaoAuth = gaoAuth.Value;
        }

        public GetReportsResponse Google(GoogleAnalyticsRequest model)
            {
                var xCred = new ServiceAccountCredential(new ServiceAccountCredential.Initializer(_gaoAuth.ClientEmail)
                {
                    Scopes = new[]
                    {
                        AnalyticsReportingService.Scope.Analytics
                    }
                }
                .FromPrivateKey(_gaoAuth.PrivateKey));

                using (var svc = new AnalyticsReportingService(
                    new BaseClientService.Initializer
                    {
                        HttpClientInitializer = xCred,
                        ApplicationName = "All WebS Site Data"
                    }))
                {
                    DateRange dateRange = new DateRange() { StartDate = model.StartDate, EndDate = model.EndDate };

                    Metric metric = new Metric { Expression = $"ga:{model.Metric}", Alias = $"{model.Metric}"};

                    Dimension dimension = new Dimension { Name = $"ga:{model.Dimension}" };

                    ReportRequest reportRequest = new ReportRequest
                    {
                        ViewId = "280616447",
                        DateRanges = new List<DateRange>{ dateRange },
                        Dimensions = new List<Dimension> { dimension },
                        Metrics = new List<Metric> { metric },
                    };

                    List<ReportRequest> requests = new List<ReportRequest> ();
                    requests.Add(reportRequest);

                    GetReportsRequest getReport = new GetReportsRequest()
                    {
                        ReportRequests = requests
                    };

                    GetReportsResponse response = svc.Reports.BatchGet(getReport).Execute();

                    return response;
                }
            }
            
        }
    }


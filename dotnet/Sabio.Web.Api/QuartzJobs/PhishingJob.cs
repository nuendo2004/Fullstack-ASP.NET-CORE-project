using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using Quartz;
using Sabio.Data.Providers;
using Sabio.Models.AppSettings;
using Sabio.Models.Requests;
using Sabio.Services;
using System;
using System.IO;
using System.Threading.Tasks;


namespace Sabio.Web.Api.QuartzJobs
{
    public class PhishingJob : IJob, IPhishingJob
    {
        private readonly AppKeys _appKeys;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private IAuthenticationService<int> _authenticationService;
        private IDataProvider _dataProvider;

        public PhishingJob(IOptions<AppKeys> appKeys, IWebHostEnvironment webHostEnvironment, IAuthenticationService<int> authService, IDataProvider dataProvider)
        {
            _appKeys = appKeys.Value;
            _webHostEnvironment = webHostEnvironment;
            _authenticationService = authService;
            _dataProvider = dataProvider;

        }

        public async Task Execute(IJobExecutionContext context)
        {
            UserService service = new(_authenticationService, _dataProvider);
            var trainees = service.GetMostRecentTrainees();
            foreach (var trainee in trainees)
            {
                PhishingAddRequest model = new()
                {
                    #region model
                    ToEmail = trainee.Email,
                    FromEmail = "fakeEmail@dispostable.com",
                    FromName = "Lisa Admin",
                    Subject = "Click here!",
                    Body = "Have you heard about our lord and savior Cthulhu?"
                    #endregion
                };
                //PhishingEmail("token", model);
            }

            await Console.Out.WriteLineAsync("Queue Questions Job Execute running");

        }

        //private async void PhishingEmail(string token, PhishingAddRequest model)
        //{
        //    var fromEmail = new EmailAddress()
        //    {
        //        Email = model.FromEmail,
        //        Name = model.FromName
        //    };


        //    var toEmail = new EmailAddress()
        //    {
        //        Email = model.ToEmail,
        //        Name = model.ToName
        //    };

        //    var htmlContent = PhishingTemplate(token, model.ToEmail);
        //    var msg = MailHelper.CreateSingleEmail(fromEmail, toEmail, model.Subject, model.Body, htmlContent);
        //    await SendEmail(msg);
        //}

        //private string PhishingTemplate(string token, string email)
        //{
        //    string webRootPath = _webHostEnvironment.WebRootPath;

        //    string path = "";
        //    path = Path.Combine(webRootPath, "EmailTemplates", "PhishingEmail.html");
        //    string domain = _appKeys.Domain;
        //    string phishing = File.ReadAllText(path).Replace("{{domain}}", domain).Replace("{{token}}", token).Replace("{{email}}", email);
        //    return phishing;
        //}
        //private async Task SendEmail(SendGridMessage msg)
        //{
        //    var client = new SendGridClient(_appKeys.SendGridAppKey);
        //    var response = await client.SendEmailAsync(msg);
        //    var test = response;
        //}
    }
}


using Sabio.Data.Providers;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Requests;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.Extensions.Options;
using Sabio.Models.AppSettings;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Sabio.Services.Interfaces;
using Amazon.Runtime.Internal;
using Sabio.Models.Requests.InviteMembers;
using Sabio.Models.Domain.Messages;
using Sabio.Models.Enums;
using Sabio.Models.Domain.Organizations;
using System.Reflection;
using Sabio.Models.Requests.DemoAccounts;
using Sabio.Models.Domain.DemoAccounts;
using System.Diagnostics;
using sib_api_v3_sdk.Api;
using sib_api_v3_sdk.Client;
using sib_api_v3_sdk.Model;
using Task = System.Threading.Tasks.Task;
using Sabio.Models.Domain;
using System.Security.Policy;
using Sabio.Models.Domain.Users;
using Sabio.Models;
using Sabio.Models.Domain.Emails;

namespace Sabio.Services
{
    public class EmailsService : IEmailsService
    {
        private AppKeys _appKeys;
        private readonly IWebHostEnvironment _webHostEnvironment;
        IDataProvider _data = null;

        public EmailsService(IDataProvider data, IOptions<AppKeys> appKeys, IWebHostEnvironment webHostEnvironment)
        {
            _appKeys = appKeys.Value;
            Configuration.Default.AddApiKey("api-key", _appKeys.SendInBlueAPIkey); 
            _data = data;
            _webHostEnvironment = webHostEnvironment;
        }

        private async Task SendEmail(SendSmtpEmail sendSmtpEmail)
        {
            var apiInstance = new TransactionalEmailsApi();
            var result = await apiInstance.SendTransacEmailAsync(sendSmtpEmail);
        }

        public string LoadHtmlTemplate(string templateName)
        {
            string tempPath = Path.Combine(_webHostEnvironment.WebRootPath, "EmailTemplates", templateName); ;
            string template = File.ReadAllText(tempPath);
            return template;
        }

        public async void TestEmail(string toEmail)
        {
            string senderName = "Immersed Admin";
            string senderEmail = "immersedsysadmin@dispostable.com";
            SendSmtpEmailSender email = new SendSmtpEmailSender(senderName, senderEmail);
            SendSmtpEmailTo smtpEmailTo = new SendSmtpEmailTo(toEmail);
            List<SendSmtpEmailTo> to = new List<SendSmtpEmailTo>();
            to.Add(smtpEmailTo);
            string templateName = "DemoAccountSubscribed.html";
            string htmlContent = LoadHtmlTemplate(templateName);
            string textContent = "Text content";
            string subject = "Test Subject";

            SendSmtpEmail sendSmtpEmail = new SendSmtpEmail(email, to, null, null, htmlContent, textContent, subject);
            await SendEmail(sendSmtpEmail);
        }

        public string GetTemplate()
        {
            string webRootPath = _webHostEnvironment.WebRootPath;
            string path = "";
            path = Path.Combine(webRootPath, "EmailTemplates", "WelcomeTemplate.html");
            string template = File.ReadAllText(path);
            return template;
        }

        public string PhishingTemplate(string token, string email)
        {
            int tokenTypeId = (int)TokenType.TrainingEvent;
            string tokenType = tokenTypeId.ToString();
            string webRootPath = _webHostEnvironment.WebRootPath;
            string path = "";
            path = Path.Combine(webRootPath, "EmailTemplates", "PhishingEmail.html");
            string domain = _appKeys.Domain;
            string phishing = File.ReadAllText(path).Replace("{{domain}}", domain).Replace("{{token}}", token).Replace("{{email}}", email).Replace("{{tokenTypeId}}", tokenType);
            return phishing;
        }

        public string ForgotEmailTemplate(string token, string email)
        {
            string webRootPath = _webHostEnvironment.WebRootPath;
            string path = "";
            path = Path.Combine(webRootPath, "EmailTemplates", "ForgotPassword.html");
            string domain = _appKeys.Domain;
            string forgotPassword = File.ReadAllText(path).Replace("{{domain}}", domain).Replace("{{token}}", token).Replace("{{email}}", email);
            return forgotPassword;
        }
        
        public async void DemoAccountEmail(string toEmail)
        {
            string senderName = "Immersed Admin";
            string senderEmail = "immersedsysadmin@dispostable.com";
            SendSmtpEmailSender email = new SendSmtpEmailSender(senderName, senderEmail);
            SendSmtpEmailTo smtpEmailTo = new SendSmtpEmailTo(toEmail);
            List<SendSmtpEmailTo> to = new List<SendSmtpEmailTo>();
            to.Add(smtpEmailTo);
            string templateName = "DemoAccountSubscribed.html";
            string htmlContent = LoadHtmlTemplate(templateName);
            string textContent = "Demo Activated";
            string subject = "Demo Account Activated";
            SendSmtpEmail sendSmtpEmail = new SendSmtpEmail(email, to, null, null, htmlContent, textContent, subject);
            await SendEmail(sendSmtpEmail);
        }
    }
} 

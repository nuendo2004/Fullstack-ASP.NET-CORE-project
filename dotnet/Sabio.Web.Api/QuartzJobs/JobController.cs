using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using Quartz;
using Sabio.Data.Providers;
using Sabio.Models.AppSettings;
using Sabio.Models.Enums;
using Sabio.Models.Requests;
using Sabio.Services;
using System;
using Task = System.Threading.Tasks.Task;

namespace Sabio.Web.Api.QuartzJobs
{
    public class JobController: IJob
    {
        private readonly IJobControllerSettings _settings;
        private readonly IDataProvider _data;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IOptions<AppKeys> _appKeys;
        
        public JobController(IOptions<AppKeys> appKeys, 
                             IWebHostEnvironment webHostEnvironment, 
                             IJobControllerSettings settings, 
                             IDataProvider data
                             )
        {
            _settings = settings;
            _data = data;
            _webHostEnvironment = webHostEnvironment;
            _appKeys = appKeys;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            JobScheduleService jobScheduleService = new(_data);
            EmailsService emailService = new(_data, _appKeys, _webHostEnvironment);
            var jobs = jobScheduleService.GetAllPending();
            int currentDay = _settings.GetCurrentDay();
            int currentUtcHour = _settings.GetCurrentHour();
            int adminRole = (int)Roles.SysAdmin;
            foreach (var job in jobs.Daily)
            {
                try
                {
                    bool withinNextHour = ((job.UtcHourToRun - currentUtcHour) <= 1);
                    if (withinNextHour && (job.DaysOfWeekId == currentDay) ||
                                          (job.DaysOfWeekId == 8 && currentDay <= 5) ||
                                          (job.DaysOfWeekId == 9 && currentDay >= 6))
                        switch (job.ChronJobTypeId)
                        {
                            case 2:
                                PhishingAddRequest model = new()
                                {
                                    ToEmail = job.Recipient,
                                    FromEmail = "fakeEmail@dispostable.com",
                                    FromName = "Lisa Admin",
                                    Subject = "Click here!",
                                    Body = "Have you heard about our lord and savior Cthulhu?"
                                };
                                //emailService.PhishingEmail("token", model);
                                break;
                        }
                } catch
                {
                    throw;
                }
                if (!job.IsRecurring)
                {
                    jobScheduleService.Delete(job.Id, adminRole);
                }
                  
            }
            await Console.Out.WriteLineAsync("JobController is firing");
        }
    }
}

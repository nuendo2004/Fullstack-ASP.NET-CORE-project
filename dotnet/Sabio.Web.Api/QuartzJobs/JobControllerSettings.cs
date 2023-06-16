using System;

namespace Sabio.Web.Api.QuartzJobs
{
    public class JobControllerSettings: IJobControllerSettings
    {
        public int GetCurrentDay()
        {
            int currentDay = (int)DateTime.Now.DayOfWeek;
            return currentDay;
        }

        public int GetCurrentHour()
        {
            int currentHour = (int) DateTime.UtcNow.Hour;
            return currentHour;
        }
    }
}
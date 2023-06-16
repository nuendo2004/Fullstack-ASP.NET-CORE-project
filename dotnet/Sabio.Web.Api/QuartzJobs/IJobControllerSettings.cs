namespace Sabio.Web.Api.QuartzJobs
{
    public interface IJobControllerSettings
    {
        int GetCurrentDay();
        int GetCurrentHour();
    }
}
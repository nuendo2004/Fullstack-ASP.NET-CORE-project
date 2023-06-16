using Quartz;
using System.Threading.Tasks;

namespace Sabio.Web.Api.QuartzJobs
{
    public interface IPhishingJob
    {
        Task Execute(IJobExecutionContext context);
    }
}
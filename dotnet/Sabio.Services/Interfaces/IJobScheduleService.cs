using Sabio.Models.Domain.JobSchedules;
using Sabio.Models.Requests.JobSchedules;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IJobScheduleService
    {
        int Add(JobScheduleAddRequest model, int userId);
        void Update(JobScheduleUpdateRequest model, int userId);

        JobSchedulesPending GetAllPending();
        void Delete(int id, int userId);
    }
}

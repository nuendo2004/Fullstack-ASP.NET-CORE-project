using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.AccessLogs;
using Sabio.Models.Requests.AccessLogs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IAccessLogsService
    {
        int Add(AccessLogAddRequest model);
        AccessLogs Get(int id);
        Paged<AccessLogs> GetByEntityAccess(int pageIndex, int pageSize, int entityTypeId, int accessStatusId);
        Paged<AccessLogs> DateRangePagination(int pageIndex, int pageSize, DateTime startDate, DateTime endDate);
        Paged<AccessLogs> GetAllPagination(int pageIndex, int pageSize);
        Paged<AccessLogs> SearchPagination(int pageIndex, int pageSize, string query);
        int AddV2(AccessLogAddRequest model);
    }
}
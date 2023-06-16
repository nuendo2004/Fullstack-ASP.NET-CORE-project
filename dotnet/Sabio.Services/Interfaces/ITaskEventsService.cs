using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface ITaskEventsService
    {
        void Delete(int id);
        int Insert(TaskEventAddRequest taskEvent, int userId);
        List<TaskEvent> SelectAll();
        void Update(TaskEventUpdateRequest taskEvent, int userId);
        Paged<TaskEvent> PaginatedSearch(int pageIndex, int pageSize);
        public List<WinLossRecord> SelectWinLossByEntityId(int entityId);
    }
}
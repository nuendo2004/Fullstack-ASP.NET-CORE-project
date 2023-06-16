using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Data;
using Sabio.Models.Requests;
using Sabio.Models.Requests.Surveys;
using Sabio.Models.Domain.TraineeAccounts;

namespace Sabio.Services
{
    public class TaskEventsService : ITaskEventsService
    {

        IDataProvider _dataProvider = null;

        public TaskEventsService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public Paged<TaskEvent> PaginatedSearch(int pageIndex, int pageSize)
        {
            Paged<TaskEvent> pagedList = null;
            List<TaskEvent> list = null;
            int totalCount = 0;

            _dataProvider.ExecuteCmd(
                "[dbo].[TaskEvents_SelectAll_Paginated]",
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int index = 0;
                    TaskEvent taskEvent = Mapper(reader, ref index);
                    
                    if (totalCount == 0)
                    {
                    totalCount = reader.GetSafeInt32(index++);
                    }

                    if (list == null)
                    {
                        list = new List<TaskEvent>();
                    }
                    list.Add(taskEvent);
                });
            if (list != null)
            {
                pagedList = new Paged<TaskEvent>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public List<TaskEvent> SelectAll()
        {
            string procName = "[dbo].[TaskEvents_SelectAll]";
            List<TaskEvent> list = null;

            _dataProvider.ExecuteCmd(procName
            , null
            , delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                TaskEvent taskEvent = Mapper(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<TaskEvent>();
                }
                list.Add(taskEvent);
            });
            return list;
        }       
        
        public List<WinLossRecord> SelectWinLossByEntityId(int entityId)
        {
            string procName = "[dbo].[TaskEvents_SelectWinLossByEntityId]";
            List<WinLossRecord> list = null;

            _dataProvider.ExecuteCmd(procName
            , delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@EntityId", entityId);
            }
            , delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                WinLossRecord record = new WinLossRecord();
                record.WinLoss = reader.GetSafeInt32(startingIndex++);
                record.Total = reader.GetSafeInt32(startingIndex++);

                if (list == null)
                {
                    list = new List<WinLossRecord>();
                }
                list.Add(record);
            });
            return list;
        }

        public int Insert(TaskEventAddRequest taskEvent, int userId)
        {
            string procName = "[dbo].[TaskEvents_Insert]";
            int id = 0;

            _dataProvider.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                AddCommonParams(taskEvent, col);

                col.AddWithValue("@CreatedBy", userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);
            }
            , returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object outputId = returnCollection["@Id"].Value;
                int.TryParse(outputId.ToString(), out id);
            });
            return id;
        }

        public void Update(TaskEventUpdateRequest taskEvent, int userId)
        {
            {
                string procName = "[dbo].[TaskEvents_Update]";
                _dataProvider.ExecuteNonQuery(procName,
                    inputParamMapper: delegate (SqlParameterCollection col)
                    {
                        AddCommonParams(taskEvent, col);

                        col.AddWithValue("@ModifiedBy", userId);
                        col.AddWithValue("@Id", taskEvent.Id);

                    },
                    returnParameters: null);
            }
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[TaskEvents_Delete]";
            _dataProvider.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@Id", id);
                },
                returnParameters: null);
        }

        private static void AddCommonParams(TaskEventAddRequest taskEvent, SqlParameterCollection col)
        {
            col.AddWithValue("@ZoneId", taskEvent.ZoneId);
            col.AddWithValue("@EntityTypeId", taskEvent.EntityTypeId);
            col.AddWithValue("@EntityId", taskEvent.EntityId);
            col.AddWithValue("@TaskEventTypeId", taskEvent.TaskEventTypeId);
            col.AddWithValue("@NumericValue", taskEvent.NumericValue);
            col.AddWithValue("@BoolValue", taskEvent.BoolValue);
            col.AddWithValue("@Text", taskEvent.Text);
            col.AddWithValue("@Payload", taskEvent.Payload);
        }
        private static TaskEvent Mapper(IDataReader reader, ref int startingIndex)
        {
            TaskEvent taskEvent = new TaskEvent();
            taskEvent.Id = reader.GetSafeInt32(startingIndex++);
            taskEvent.ZoneId = reader.GetSafeInt32(startingIndex++);
            taskEvent.EntityType = new LookUp();
            taskEvent.EntityType.Id = reader.GetSafeInt32(startingIndex++);
            taskEvent.EntityType.Name = reader.GetSafeString(startingIndex++);
            taskEvent.EntityId = reader.GetSafeInt32(startingIndex++);
            taskEvent.TaskEventType = new LookUp();
            taskEvent.TaskEventType.Id = reader.GetSafeInt32(startingIndex++);
            taskEvent.TaskEventType.Name = reader.GetSafeString(startingIndex++);
            taskEvent.NumericValue = reader.GetSafeInt32Nullable(startingIndex++);
            taskEvent.BoolValue = reader.GetSafeBool(startingIndex++);
            taskEvent.Text = reader.GetSafeString(startingIndex++);
            taskEvent.Payload = reader.GetSafeString(startingIndex++);
            taskEvent.CreatedBy = reader.GetSafeInt32(startingIndex++);
            taskEvent.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            taskEvent.DateCreated = reader.GetSafeDateTime(startingIndex++);
            taskEvent.DateModified = reader.GetSafeDateTime(startingIndex++);
            return taskEvent;
        }
    }
}
    


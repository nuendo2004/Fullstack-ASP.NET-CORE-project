using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.TrainingScheduleRequests;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;


namespace Sabio.Services
{
    public class TrainingScheduleService : ITrainingScheduleService
    {
        IDataProvider _data = null;
        public TrainingScheduleService(IDataProvider data)
        {
            _data = data;
        }


        public TrainingSchedule Get(int id)
        {
            string procName = "[dbo].[TrainingSchedules_SelectById]";
            TrainingSchedule trainingSchedule = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                trainingSchedule = MapTrainingSchedule(reader, ref startingIndex);
            }
            );
            return trainingSchedule;
        }

        public int Add(TrainingScheduleAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[TrainingSchedules_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, userId);
                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);

            }, returnParameters: delegate (SqlParameterCollection returnCol)
            {
                object oId = returnCol["@Id"].Value;
                int.TryParse(oId.ToString(), out id);
            });

            return id;
        }

        public void Update(TrainingScheduleUpdateRequest model, int userId)
        {
            string procName = "[dbo].[TrainingSchedules_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParamsUpdate(model, col, userId);


            }, returnParameters: null);
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[TrainingSchedules_Update_IsDeleted_ById]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, returnParameters: null);
        }

        public Paged<TrainingSchedule> GetAllCreatedBy(int pageIndex, int pageSize, int createdBy)
        {
            Paged<TrainingSchedule> pagedList = null;
            List<TrainingSchedule> list = null;
            int totalCount = 0;

            TrainingSchedule trainingSchedule = null;

            string procName = "[dbo].[TrainingSchedules_Select_ByCreatedBy]";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@PageIndex", pageIndex);
                parameterCollection.AddWithValue("@PageSize", pageSize);
                parameterCollection.AddWithValue("@CreatedBy", createdBy);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;

                trainingSchedule = MapTrainingSchedule(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }

                if (list == null)
                {
                    list = new List<TrainingSchedule>();
                }
                list.Add(trainingSchedule);
            });
            if (list != null)
            {
                pagedList = new Paged<TrainingSchedule>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public List<TrainingSchedule> GetAllNonePagination(int userId)
        {
            
            List<TrainingSchedule> scheduleList = new List<TrainingSchedule>();
            
            string procName = "[dbo].[TrainingSchedules_Select_ByCreatedBy_NonePaginated_V2]";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection parameterCollection)
            {
             
                parameterCollection.AddWithValue("@CreatedBy", userId);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;

                TrainingSchedule schedule = MapTrainingSchedule(reader, ref startingIndex);
               

               scheduleList.Add(schedule);
            });

            return scheduleList;
        }

        public Paged<TrainingSchedule> GetAllByTrainingUnitId(int pageIndex, int pageSize, int trainingUnitId)
        {
            Paged<TrainingSchedule> pagedList = null;
            List<TrainingSchedule> list = null;
            int totalCount = 0;

            TrainingSchedule trainingSchedule = null;

            string procName = "[dbo].[TrainingSchedules_Select_ByTrainingUnitId]";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@PageIndex", pageIndex);
                parameterCollection.AddWithValue("@PageSize", pageSize);
                parameterCollection.AddWithValue("@TrainingUnitId", trainingUnitId);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;

                trainingSchedule = MapTrainingSchedule(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }

                if (list == null)
                {
                    list = new List<TrainingSchedule>();
                }
                list.Add(trainingSchedule);
            });
            if (list != null)
            {
                pagedList = new Paged<TrainingSchedule>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        private static TrainingSchedule MapTrainingSchedule(IDataReader reader, ref int startingIndex)
        {
            TrainingSchedule trainingSchedule = new TrainingSchedule();

            trainingSchedule.Id = reader.GetSafeInt32(startingIndex++);
            trainingSchedule.Name = reader.GetSafeString(startingIndex++);
            trainingSchedule.TrainingUnitId = reader.GetSafeInt32(startingIndex++);
            trainingSchedule.DaysOfWeekId = reader.GetSafeInt32(startingIndex++);
            trainingSchedule.StartTime = reader.GetSafeDateTime(startingIndex++);
            trainingSchedule.EndTime = reader.GetSafeDateTime(startingIndex++);
            trainingSchedule.StartDate = reader.GetSafeDateTime(startingIndex++);
            trainingSchedule.EndDate = reader.GetSafeDateTime(startingIndex++);
            trainingSchedule.IsDeleted = reader.GetSafeBool(startingIndex++);
            trainingSchedule.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            trainingSchedule.CreatedBy = reader.GetSafeInt32(startingIndex++);
            trainingSchedule.DateCreated = reader.GetSafeUtcDateTime(startingIndex++);
            trainingSchedule.DateModified = reader.GetSafeUtcDateTime(startingIndex++);
            return trainingSchedule;
        }

        private static void AddCommonParams(TrainingScheduleAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@TrainingUnitId", model.TrainingUnitId);
            col.AddWithValue("@DaysOfWeekId", model.DaysOfWeekId);
            col.AddWithValue("@StartTime", model.StartTime);
            col.AddWithValue("@EndTime", model.EndTime);
            col.AddWithValue("@StartDate", model.StartDate);
            col.AddWithValue("@EndDate", model.EndDate);
            col.AddWithValue("@CreatedBy", userId);
            col.AddWithValue("@ModifiedBy", userId);
        }

        // models defer enough to have 2 different AddPARAMS _ Hector Arias
        private static void AddCommonParamsUpdate(TrainingScheduleUpdateRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@DaysOfWeekId", model.DaysOfWeekId);
            col.AddWithValue("@StartTime", model.StartTime);
            col.AddWithValue("@EndTime", model.EndTime);
            col.AddWithValue("@StartDate", model.StartDate);
            col.AddWithValue("@EndDate", model.EndDate);
            col.AddWithValue("@ModifiedBy", userId);
            col.AddWithValue("@Id", model.Id);
        }


    }
}




using Sabio.Data.Providers;
using Sabio.Models.Requests.JobSchedules;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using Sabio.Models.Domain.JobSchedules;
using Microsoft.AspNetCore.Components.Forms;
using Newtonsoft.Json;
using Stripe.Terminal;
using Sabio.Data;

namespace Sabio.Services
{
    public class JobScheduleService : IJobScheduleService
    {
        IDataProvider _data = null;

        public JobScheduleService(IDataProvider data)
        {
            _data = data;
        }
        public int Add(JobScheduleAddRequest model, int userId)
        {
            string procName = "[dbo].[JobSchedules_Insert]";
            int id = 0;
            

            _data.ExecuteNonQuery(
                procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@CreatedBy", userId);
                    col.AddWithValue("@ModifiedBy", userId);
                    AddCommonParams(model, col);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);

                },
                returnParameters: delegate (SqlParameterCollection returnCol)
                {
                    object idObj = returnCol["@Id"].Value;

                    int.TryParse(idObj.ToString(), out id);
                });


            return id;
            
        }

        public void Update(JobScheduleUpdateRequest model, int userId)
        {
            string procName = "[dbo].[JobSchedules_Update]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", model.Id);
                    col.AddWithValue("@ModifiedBy", userId);
                    AddCommonUpdateParams(model, col);
                }, returnParameters: null);
        }

        public JobSchedulesPending GetAllPending()
        {
          
            string procName = "[dbo].[JobSchedules_SelectAllPending]";
            JobSchedulesPending jobSchedulesPending = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    jobSchedulesPending = MapPendingJobSchedule(reader);
                });
            return jobSchedulesPending;


           
        }

        public void Delete(int id, int userId)
        {
            string procName = "[dbo].[JobSchedules_Delete]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                    col.AddWithValue("@ModifiedBy", userId);
                }, returnParameters: null);
        }

        private static void AddCommonParams(JobScheduleAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@ChronJobTypeId", model.ChronJobTypeId);
            col.AddWithValue("@UtcHourToRun", model.UtcHourToRun);
            col.AddWithValue("@IntervalTypeId", model.IntervalTypeId);
            col.AddWithValue("@DaysOfWeekId", model.DaysOfWeekId);
            col.AddWithValue("@EntityTypeId", model.EntityTypeId);
            col.AddWithValue("@RecipientId", model.RecipientId);
            col.AddWithValue("@Recipient", model.Recipient);

        }

        private static void AddCommonUpdateParams(JobScheduleUpdateRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@ChronJobTypeId", model.ChronJobTypeId);
            col.AddWithValue("@IsRecurring", model.IsRecurring);
            col.AddWithValue("@UtcHourToRun", model.UtcHourToRun);
            col.AddWithValue("@IntervalTypeId", model.IntervalTypeId);
            col.AddWithValue("@DaysOfWeekId", model.DaysOfWeekId);
            col.AddWithValue("@EntityTypeId", model.EntityTypeId);
            col.AddWithValue("@RecipientId", model.RecipientId);
            col.AddWithValue("@Recipient", model.Recipient);
            col.AddWithValue("@IsActive", model.IsActive);
        }

        private static JobSchedulesPending MapPendingJobSchedule(IDataReader reader)
        {
            int startingIndex = 0;
            JobSchedulesPending jobSchedulesPending = new JobSchedulesPending();

           
            string daily = reader.GetSafeString(startingIndex++);
            string weekly = reader.GetSafeString(startingIndex++);
            string monthy = reader.GetSafeString(startingIndex++);
            string yearly = reader.GetSafeString(startingIndex++);
         

            if (!string.IsNullOrEmpty(daily))
            {
                jobSchedulesPending.Daily = JsonConvert.DeserializeObject<List<JobSchedule>>(daily);
            }
            if (!string.IsNullOrEmpty(weekly))
            {
                jobSchedulesPending.Weekly = JsonConvert.DeserializeObject<List<JobSchedule>>(weekly);
            }
            if (!string.IsNullOrEmpty(monthy))
            {
                jobSchedulesPending.Monthly = JsonConvert.DeserializeObject<List<JobSchedule>>(monthy);
            }
            if (!string.IsNullOrEmpty(yearly))
            {
                jobSchedulesPending.Yearly = JsonConvert.DeserializeObject<List<JobSchedule>>(yearly);
            }
            return jobSchedulesPending;
        }

        
    }
}

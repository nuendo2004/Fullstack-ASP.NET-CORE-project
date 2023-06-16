using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.TraineeAccounts;
using Sabio.Models.Domain.Trainees;
using Sabio.Models.Requests;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Sabio.Services
{
    public class RescueService : IRescueService
    {
        IDataProvider _data = null;
        ILookUpService _lookUpService = null;

        public RescueService(IDataProvider data, ILookUpService lookUpService)
        {
            _data = data;
            _lookUpService = lookUpService;
        }

        public int Create(RescueAddRequest model, int userId)
        {
            string procName = "[dbo].[SecurityEventReports_Insert]";
            int id = 0;

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    col.AddWithValue("@CreatedBy", userId);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    col.Add(idOut);
                }
                , returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;
                    Int32.TryParse(oId.ToString(), out id);
                });
            return id;
        }
        public Rescue Get(int id)
        {
            string procName = "[dbo].[SecurityEventReports_Select_ById]";
            Rescue rescue = null;
            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@Id", id);
                }
                , singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    rescue = MapSingleRescue(reader, ref startingIndex);

                });
            return rescue;
        }
        public Paged<Rescue> GetByTraineeId(int pageIndex, int pageSize, int traineeId)
        {
            Paged<Rescue> pagedResult = null;
            List<Rescue> list = null;
            int totalCount = 0;
            string procName = "[dbo].[SecurityEventReports_Select_ByTraineeId]";
            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@TraineeId", traineeId);
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                }
                , singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Rescue model = MapSingleRescue(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (list == null)
                    {
                        list = new List<Rescue>();
                    }
                    list.Add(model);
                });
            if (list != null)
            {
                pagedResult = new Paged<Rescue>(list, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }
        public Paged<Rescue> GetByZoneId(int pageIndex, int pageSize, int zoneId)
        {
            Paged<Rescue> pagedResult = null;
            List<Rescue> list = null;
            int totalCount = 0;
            string procName = "[dbo].[SecurityEventReports_Select_ByZoneId]";
            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@ZoneId", zoneId);
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                }
                , singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Rescue model = MapSingleRescue(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (list == null)
                    {
                        list = new List<Rescue>();
                    }
                    list.Add(model);
                });
            if (list != null)
            {
                pagedResult = new Paged<Rescue>(list, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }
        public Paged<Rescue> GetByTraineeAccountId(int pageIndex, int pageSize, int traineeAccountId)
        {
            Paged<Rescue> pagedResult = null;
            List<Rescue> list = null;
            int totalCount = 0;
            string procName = "[dbo].[SecurityEventReports_Select_ByTraineeAcccountId]";
            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@TraineeAccountId", traineeAccountId);
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                }
                , singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Rescue model = MapSingleRescue(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (list == null)
                    {
                        list = new List<Rescue>();
                    }
                    list.Add(model);
                });
            if (list != null)
            {
                pagedResult = new Paged<Rescue>(list, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }
        private Rescue MapSingleRescue(IDataReader reader, ref int startingIndex)
        {
            Rescue rescue = new Rescue();
            rescue.TraineeId = new Trainee();
            rescue.TraineeAccountId = new TraineeAccounts();
            rescue.TraineeAccountId.ZoneType = new LookUp();
            rescue.ZoneId = new Zone();
            rescue.ZoneId.ZoneType = new LookUp();
            rescue.ZoneId.ZoneStatus = new LookUp();
            rescue.UserId = new User();


            rescue.Id = reader.GetSafeInt32(startingIndex++);
            rescue.Subject = reader.GetSafeString(startingIndex++);
            rescue.Description = reader.GetSafeString(startingIndex++);
            rescue.EventType = _lookUpService.MapSingleLookUp(reader, ref startingIndex);

            rescue.TraineeId.Id = reader.GetSafeInt32(startingIndex++);
            rescue.TraineeId.UserId = reader.GetSafeInt32(startingIndex++);
            rescue.TraineeId.TrainingUnitId = reader.GetSafeInt32(startingIndex++);
            rescue.TraineeId.IsDeleted = reader.GetSafeBool(startingIndex++);
            rescue.TraineeId.CreatedBy = reader.GetSafeInt32(startingIndex++);
            rescue.TraineeId.ModifiedBy = reader.GetSafeInt32(startingIndex++);

            rescue.TraineeAccountId.Id = reader.GetSafeInt32(startingIndex++);
            rescue.TraineeAccountId.Username = reader.GetSafeString(startingIndex++);
            rescue.TraineeAccountId.AvatarUrl = reader.GetSafeString(startingIndex++);

            rescue.ZoneId.Id = reader.GetSafeInt32(startingIndex++);
            rescue.ZoneId.Name = reader.GetSafeString(startingIndex++);
            rescue.ZoneId.Description = reader.GetSafeString(startingIndex++);
            rescue.ZoneId.ZoneType.Id = reader.GetSafeInt32(startingIndex++);
            rescue.ZoneId.ZoneStatus.Id = reader.GetSafeInt32(startingIndex++);
            rescue.ZoneId.IsDeleted = reader.GetSafeBool(startingIndex++);
            rescue.ZoneId.CreatedBy = reader.GetSafeInt32(startingIndex++);
            rescue.ZoneId.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            rescue.ZoneId.DateCreated = reader.GetSafeDateTime(startingIndex++);
            rescue.ZoneId.DateModified = reader.GetSafeDateTime(startingIndex++);

            rescue.UserId.Id = reader.GetSafeInt32(startingIndex++);
            rescue.UserId.Email = reader.GetSafeString(startingIndex++);
            rescue.UserId.FirstName = reader.GetSafeString(startingIndex++);
            rescue.UserId.Mi = reader.GetSafeString(startingIndex++);
            rescue.UserId.LastName = reader.GetSafeString(startingIndex++);
            rescue.UserId.AvatarUrl = reader.GetSafeString(startingIndex++);
            rescue.DateCreated = reader.GetSafeDateTime(startingIndex++);

            return rescue;
        }
        private static void AddCommonParams(RescueAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Subject", model.Subject);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@EventReportingTypeId", model.EventReportingTypeId);
            col.AddWithValue("@TraineeId", model.TraineeId);
            col.AddWithValue("@TraineeAccountId", model.TraineeAccountId);
            col.AddWithValue("@ZoneId", model.ZoneId);
        }
    }
}
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Organizations;
using Sabio.Models.Domain.SecurityEvents;
using Sabio.Models.Requests;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class SecurityEventService : ISecurityEventService
    {
        IDataProvider _data = null;

        public SecurityEventService(IDataProvider data)
        {
            _data = data;
        }

        public int Create(SecurityEventAddRequest model)
        {
            string procName = "dbo.SecurityEvents_Insert";
            int id = 0;

            _data.ExecuteNonQuery(
                procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@ZoneId", model.ZoneId);
                    coll.AddWithValue("@Token", model.Token);
                    coll.AddWithValue("@TraineeId", model.TraineeId);
                    coll.AddWithValue("@TrainingUnitId", model.TrainingUnitId);
                    coll.AddWithValue("@TraineeAccountId", model.TraineeAccountId);
                    coll.AddWithValue("@CreatedById", model.CreatedById);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    coll.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnColl)
                {
                    object idObj = returnColl["@Id"].Value;
                    int.TryParse(idObj.ToString(), out id);
                });
            return id;
        }

        public Paged<SecurityEvent> GetByZoneId(int zoneId, int pageIndex, int pageSize)
        {
            string procName = "dbo.SecurityEvents_Select_ByZoneId";
            Paged<SecurityEvent> pagedList = null;
            List<SecurityEvent> list = null;
            int i = 0;
            int totalCount = 0;

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@ZoneId", zoneId);
                    coll.AddWithValue("@PageIndex", pageIndex);
                    coll.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    SecurityEvent secEv = MapSingleSecurityEvent(reader, ref i);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(i++);
                    }
                    if (list == null)
                    {
                        list = new List<SecurityEvent>();
                    }
                    list.Add(secEv);
                });
            if (list != null)
            {
                pagedList = new Paged<SecurityEvent>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<SecurityEvent> GetByUserId(int userId, int pageIndex, int pageSize)
        {
            string procName = "dbo.SecurityEvents_Select_ByUserId";
            Paged<SecurityEvent> pagedList = null;
            List<SecurityEvent> list = null;
            int i = 0;
            int totalCount = 0;

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@UserId", userId);
                    coll.AddWithValue("@PageIndex", pageIndex);
                    coll.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    SecurityEvent secEv = MapSingleSecurityEvent(reader, ref i);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(i++);
                    }
                    if (list == null)
                    {
                        list = new List<SecurityEvent>();
                    }
                    list.Add(secEv);
                });
            if (list != null)
            {
                pagedList = new Paged<SecurityEvent>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<SecurityEvent> GetByTrainingUnitId(int trainingUnitId, int pageIndex, int pageSize)
        {
            string procName = "dbo.SecurityEvents_Select_ByTrainingUnitId";
            Paged<SecurityEvent> pagedList = null;
            List<SecurityEvent> list = null;
            int i = 0;
            int totalCount = 0;

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@TrainingUnitId", trainingUnitId);
                    coll.AddWithValue("@PageIndex", pageIndex);
                    coll.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    SecurityEvent secEv = MapSingleSecurityEvent(reader, ref i);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(i++);
                    }
                    if (list == null)
                    {
                        list = new List<SecurityEvent>();
                    }
                    list.Add(secEv);
                });
            if (list != null)
            {
                pagedList = new Paged<SecurityEvent>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<SecurityEvent> GetByTraineeId(int traineeId, int pageIndex, int pageSize)
        {
            string procName = "dbo.SecurityEvents_Select_ByTraineeId";
            Paged<SecurityEvent> pagedList = null;
            List<SecurityEvent> list = null;
            int i = 0;
            int totalCount = 0;

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@TraineeId", traineeId);
                    coll.AddWithValue("@PageIndex", pageIndex);
                    coll.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    SecurityEvent secEv = MapSingleSecurityEvent(reader, ref i);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(i++);
                    }
                    if (list == null)
                    {
                        list = new List<SecurityEvent>();
                    }
                    list.Add(secEv);
                });
            if (list != null)
            {
                pagedList = new Paged<SecurityEvent>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<SecurityEvent> GetByTraineeAccountId(int traineeAccountId, int pageIndex, int pageSize)
        {
            string procName = "dbo.SecurityEvents_Select_ByTraineeAccountId";
            Paged<SecurityEvent> pagedList = null;
            List<SecurityEvent> list = null;
            int i = 0;
            int totalCount = 0;

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@TraineeAccountId", traineeAccountId);
                    coll.AddWithValue("@PageIndex", pageIndex);
                    coll.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    SecurityEvent secEv = MapSingleSecurityEvent(reader, ref i);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(i++);
                    }
                    if (list == null)
                    {
                        list = new List<SecurityEvent>();
                    }
                    list.Add(secEv);
                });
            if (list != null)
            {
                pagedList = new Paged<SecurityEvent>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public List<List<SecurityEventOrgStats>> GetOrganizationStats(int orgId)
        {
            string procName = "[dbo].[SecurityEvents_Select_ByOrgId_PerDate]";
            List<SecurityEventOrgStats> weeksList = null;
            List<SecurityEventOrgStats> monthsList = null;
            List<SecurityEventOrgStats> yearsList = null;
            List<List<SecurityEventOrgStats>> returnList = new List<List<SecurityEventOrgStats>>();

            _data.ExecuteCmd
                (
                    storedProc: procName,
                    inputParamMapper: delegate(SqlParameterCollection sqlParams)
                    {
                        sqlParams.AddWithValue("@OrgId", orgId);
                    },
                    singleRecordMapper: delegate(IDataReader reader, short set)
                    {
                        switch(set)
                        {
                            case 0:
                                {
                                    int columnIndex = 0;
                                    SecurityEventOrgStats stats = MapSingleOrgStats(reader, columnIndex);

                                    if (weeksList == null)
                                    {
                                        weeksList = new List<SecurityEventOrgStats>();
                                    }
                                    weeksList.Add(stats);
                                    break;
                                }
                            case 1:
                                {
                                    int columnIndex = 0;
                                    SecurityEventOrgStats stats = MapSingleOrgStats(reader, columnIndex);

                                    if (monthsList == null)
                                    {
                                        monthsList = new List<SecurityEventOrgStats>();
                                    }
                                    monthsList.Add(stats);
                                    break;
                                }
                            case 2:
                                {
                                    int columnIndex = 0;
                                    SecurityEventOrgStats stats = MapSingleOrgStats(reader, columnIndex);

                                    if (yearsList == null)
                                    {
                                        yearsList = new List<SecurityEventOrgStats>();
                                    }
                                    yearsList.Add(stats);
                                    break;
                                }
                        }
                    }
                );
            returnList.Add(weeksList);
            returnList.Add(monthsList);
            returnList.Add(yearsList);
            return returnList;
        }

        private static SecurityEventOrgStats MapSingleOrgStats(IDataReader reader, int index)
        {
            SecurityEventOrgStats stats = new SecurityEventOrgStats();
            stats.Date = reader.GetSafeDateTime(index++);
            stats.DateInt = reader.GetSafeInt32(index++);
            stats.SecurityEventTotals = reader.GetSafeInt32(index++);
            return stats;
        }

        private static SecurityEvent MapSingleSecurityEvent(IDataReader reader, ref int i)
        {
            SecurityEvent secEv = new SecurityEvent();
            i = 0;

            secEv.Id = reader.GetSafeInt32(i++);
            secEv.ZoneId = reader.GetSafeInt32(i++);
            secEv.ZoneName = reader.GetSafeString(i++);
            secEv.TraineeId = reader.GetSafeInt32(i++);
            secEv.FirstName = reader.GetSafeString(i++);
            secEv.LastName = reader.GetSafeString(i++);
            secEv.Email = reader.GetSafeString(i++);
            secEv.TraineeAccountId = reader.GetSafeInt32(i++);
            secEv.UserName = reader.GetSafeString(i++);
            secEv.TrainingUnitId = reader.GetSafeInt32(i++);
            secEv.TrainingUnitName = reader.GetSafeString(i++);
            secEv.OrganizationId = reader.GetSafeInt32(i++);
            secEv.OrganizationName = reader.GetSafeString(i++);
            secEv.CreatedById = reader.GetSafeInt32(i++);
            secEv.DateCreated = reader.GetSafeDateTime(i++);

            return secEv;
        }
    }
}

using Microsoft.AspNetCore.HttpLogging;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.AccessLogs;
using Sabio.Models.Requests.AccessLogs;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Drawing.Drawing2D;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public  class AccessLogsService : IAccessLogsService
    {
        IDataProvider _data = null;

        public AccessLogsService(IDataProvider data)
        {
            _data = data;
        }

        public int Add(AccessLogAddRequest model)
        {
            int id = 0;

            string procName = "[dbo].[AccessLogs_Insert]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);

                    SqlParameter idOut = new SqlParameter("@Id", System.Data.SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);
                }, returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;

                    int.TryParse(oId.ToString(), out id);
                });

            return id;
        }

        public AccessLogs Get(int id)
        {
            string procName = "[dbo].[AccessLogs_Select_ById]";

            AccessLogs accessLog = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                accessLog = MapSingleLog(reader, ref startingIndex);
                 
            }
            );

            return accessLog;
        }

        public Paged<AccessLogs> GetByEntityAccess(int pageIndex, int pageSize, int entityTypeId, int accessStatusId)
        {
            Paged<AccessLogs> pagedList = null;

            List<AccessLogs> list = null;

            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[AccessLogs_Select_ByEntityAccess]",
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@PageIndex", pageIndex);
                parameterCollection.AddWithValue("@PageSize", pageSize);
                parameterCollection.AddWithValue("@EntityTypeId", entityTypeId);
                parameterCollection.AddWithValue("@AccessStatusId", accessStatusId);
            },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    AccessLogs aLog = MapSingleLog(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (list == null)
                    {
                        list = new List<AccessLogs>();
                    }
                    list.Add(aLog);
                });
            if (list != null)
            {
                pagedList = new Paged<AccessLogs>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<AccessLogs> DateRangePagination(int pageIndex, int pageSize, DateTime startDate, DateTime endDate )
        {
            Paged<AccessLogs> pagedList = null;

            List<AccessLogs> list = null;

            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[AccessLogs_Select_ByDateRange]", 
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                    parameterCollection.AddWithValue("@StartDate", startDate);
                    parameterCollection.AddWithValue("@EndDate", endDate);

                },

                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    AccessLogs aLog = MapSingleLog(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (list == null)
                    {
                        list = new List<AccessLogs>();
                    }
                    list.Add(aLog);
                });
            if(list != null)
            {
                pagedList = new Paged<AccessLogs>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<AccessLogs> GetAllPagination(int pageIndex, int pageSize)
        {
            Paged<AccessLogs> pagedList = null;

            List<AccessLogs> list = null;

            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[AccessLogs_SelectAll_Paged]",
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    AccessLogs accessLog = MapSingleLog(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)
                    {
                        list = new List<AccessLogs>();
                    }
                    list.Add(accessLog);
                });
            if(list != null)
            {
                pagedList = new Paged<AccessLogs>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<AccessLogs> SearchPagination(int pageIndex, int pageSize, string query)
        {
            Paged<AccessLogs> pagedList = null;

            List<AccessLogs> list = null;

            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[AccessLogs_Search_Pagination]",
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                    parameterCollection.AddWithValue("@Query", query);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    AccessLogs accessLog = MapSingleLog(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)
                    {
                        list = new List<AccessLogs>();
                    }
                    list.Add(accessLog);
                });
            if (list != null)
            {
                pagedList = new Paged<AccessLogs>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        private static AccessLogs MapSingleLog(IDataReader reader, ref int startingIndex)
        {
            AccessLogs aLog = new AccessLogs();
            aLog.EntityType = new LookUp();
            aLog.AccessType = new LookUp();
            aLog.AccessStatus = new LookUp();
            aLog.DeviceType = new LookUp();

            aLog.Id = reader.GetSafeInt32(startingIndex++);
            aLog.EntityType.Id = reader.GetSafeInt32(startingIndex++);
            aLog.EntityType.Name = reader.GetSafeString(startingIndex++);
            aLog.EntityId = reader.GetSafeInt32(startingIndex++);        
            aLog.AccessType.Id = reader.GetSafeInt32(startingIndex++);
            aLog.AccessType.Name = reader.GetSafeString(startingIndex++);
            aLog.AccessStatus.Id = reader.GetSafeInt32(startingIndex++);
            aLog.AccessStatus.Name = reader.GetSafeString(startingIndex++);
            aLog.IPAddressPort = reader.GetSafeString(startingIndex++);
            aLog.EndpointName = reader.GetSafeString(startingIndex++);
            aLog.DateCreated = reader.GetSafeUtcDateTime(startingIndex++);
            aLog.PayloadName = reader.GetSafeString(startingIndex++);
            aLog.Route = reader.GetSafeString(startingIndex++);
            aLog.DeviceType.Id = reader.GetSafeInt32(startingIndex++);
            aLog.DeviceType.Name = reader.GetSafeString(startingIndex++);


            return aLog;
        }

        private static void AddCommonParams(AccessLogAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@EntityTypeId", model.EntityTypeId);
            col.AddWithValue("@EntityId", model.EntityId);
            col.AddWithValue("@AccessTypeId", model.AccessTypeId);
            col.AddWithValue("@AccessStatusId", model.AccessStatusId);
            col.AddWithValue("@IPAddressPort", model.IPAddressPort);
            col.AddWithValue("@EndpointName", model.EndpointName);            
            col.AddWithValue("@PayloadName", model.PayloadName);
            col.AddWithValue("@Route", model.Route);
            col.AddWithValue("@DeviceTypeId", model.DeviceTypeId);
            col.AddWithValue("@ZoneId", model.ZoneId);
        }
        public int AddV2(AccessLogAddRequest model)
        {
            int id = 0;

            string procName = "[dbo].[AccessLogs_Insert_V2]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);

                    SqlParameter idOut = new SqlParameter("@Id", System.Data.SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);
                }, returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;

                    int.TryParse(oId.ToString(), out id);
                });

            return id;
        }
    }  
}



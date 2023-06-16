using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Zones;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Sabio.Services
{
    public class ZonesService : IZonesService
    {
        IDataProvider _data = null;
        public ZonesService(IDataProvider data)
        {
            _data = data;
        }

        public List<Zone> GetAllZones()
        {
            List<Zone> list = null;
            string procName = "[dbo].[Zones_SelectAll]";
            _data.ExecuteCmd(procName, inputParamMapper: null,
                 singleRecordMapper: delegate (IDataReader reader, short set)
               {
                   int startingIndex = 0;
                   Zone zone = MapSingleZone(reader, ref startingIndex);
                   if (list == null)
                   {
                       list = new List<Zone>();
                   }
                   list.Add(zone);
               });
               return list;
        }

        public int Add(ZoneAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[Zones_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, userId);
                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);
            },
            returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;
                int.TryParse(oId.ToString(), out id);

            });
            return id;
        }

        public void Update(ZoneUpdateRequest model, int userId)
        {

            string procName = "[dbo].[Zones_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, userId);
                col.AddWithValue("@Id", model.Id);
            },
            returnParameters: null);

        }

        public Zone GetById(int id)
        {
            string procName = "[dbo].[Zones_SelectByIdV2]";
            Zone oneZone = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                oneZone = MapSingleZone(reader, ref startingIndex);
            });

            return oneZone;
        }

        public Paged<Zone> SelectAllPaginated(int pageIndex, int pageSize)
        {
            Paged<Zone> pagedList = null;
            List<Zone> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[Zones_SelectAll_Paged]",
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    Zone friend = MapSingleZone(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(startingIndex);

                    if (list == null)
                    {
                        list = new List<Zone>();
                    }

                    list.Add(friend);
                }

                );
            if (list != null)
            {
                pagedList = new Paged<Zone>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<Zone> GetByZoneStatusIdPaged(int id, int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Zones_SelectByZoneStatusId_Paginated]";

            Paged<Zone> paged = null;
            List<Zone> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@ZStatusId", id);
                paramCollection.AddWithValue("@PageIndex", pageIndex);
                paramCollection.AddWithValue("@PageSize", pageSize);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                Zone aZoneStatus = MapSingleZone(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex);
                }
                if (list == null)
                {
                    list = new List<Zone>();
                }
                list.Add(aZoneStatus);
            }
            );
            if (list != null)
            {
                paged = new Paged<Zone>(list, pageIndex, pageSize, totalCount);
            }
            return paged;
        }
        public List<Zone> GetByZoneStatusId(int statusId)
        {
            string procName = "[dbo].[Zones_SelectByZoneStatusId]";
            List<Zone> list = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@ZStatusId", statusId);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                Zone aZoneStatus = MapSingleZone(reader, ref startingIndex);
                if (list == null)
                {
                    list = new List<Zone>();
                }
                list.Add(aZoneStatus);
            });
            return list;
        }

        public Paged<Zone> GetByZoneTypeId(int id, int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Zones_SelectByZoneTypeId]";

            Paged<Zone> paged = null;
            List<Zone> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@ZTypeId", id);
                paramCollection.AddWithValue("@PageIndex", pageIndex);
                paramCollection.AddWithValue("@PageSize", pageSize);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                Zone aZoneType = MapSingleZone(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex);
                }
                if (list == null)
                {
                    list = new List<Zone>();
                }
                list.Add(aZoneType);
            }
            );
            if (list != null)
            {
                paged = new Paged<Zone>(list, pageIndex, pageSize, totalCount);
            }
            return paged;
        }

        public Paged<Zone> GetByZoneStatusIdAndByZoneTypeId(int statusid, int typeid, int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Zones_SelectByZoneStatusIdAndByZoneTypeId]";

            Paged<Zone> paged = null;
            List<Zone> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@ZStatusId", statusid);
                paramCollection.AddWithValue("@ZTypeId", typeid);
                paramCollection.AddWithValue("@PageIndex", pageIndex);
                paramCollection.AddWithValue("@PageSize", pageSize);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                Zone aZone = MapSingleZone(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex);
                }
                if (list == null)
                {
                    list = new List<Zone>();
                }
                list.Add(aZone);
            }
            );
            if (list != null)
            {
                paged = new Paged<Zone>(list, pageIndex, pageSize, totalCount);
            }
            return paged;
        }

        public Paged<Zone> Search(int pageIndex, int pageSize, string query)
        {
            Paged<Zone> pagedList = null;
            List<Zone> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "dbo.Zones_Search_Paginated",
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                    param.AddWithValue("@Query", query);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    Zone friend = MapSingleZone(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex);
                    }
                    if (list == null)
                    {
                        list = new List<Zone>();
                    }

                    list.Add(friend);
                }

                );
            if (list != null)
            {
                pagedList = new Paged<Zone>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public void Delete(int id, int userId)
        {

            string procName = "[dbo].[Zones_Delete]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
                col.AddWithValue("@ModifiedBy", userId);
            },
            returnParameters: null);

        }

        public void UpdateStatusId(int id, int statusId, int userId)
        {

            string procName = "[dbo].[Zones_Update_StatusId]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@ZoneStatusId", statusId);
                col.AddWithValue("@ModifiedBy", userId);
                col.AddWithValue("@Id", id);
            },
            returnParameters: null);

        }

        private static void AddCommonParams(ZoneAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@ZoneTypeId", model.ZoneTypeId);
            col.AddWithValue("@ZoneStatusId", model.ZoneStatusId);
            col.AddWithValue("@UserId", userId);
        }
        private static Zone MapSingleZone(IDataReader reader, ref int startingIndex)
        {
            Zone aZone = new Zone();
            aZone.ZoneType = new LookUp();
            aZone.ZoneStatus = new LookUp();

            aZone.Id = reader.GetSafeInt32(startingIndex++);
            aZone.Name = reader.GetSafeString(startingIndex++);
            aZone.Description = reader.GetSafeString(startingIndex++);
            aZone.ImageUrl = reader.GetSafeString(startingIndex++);
            aZone.ZoneType.Id = reader.GetSafeInt32(startingIndex++);
            aZone.ZoneType.Name = reader.GetSafeString(startingIndex++);
            aZone.ZoneStatus.Id = reader.GetSafeInt32(startingIndex++);
            aZone.ZoneStatus.Name = reader.GetSafeString(startingIndex++);
            aZone.IsDeleted = reader.GetSafeBool(startingIndex++);
            aZone.CreatedBy = reader.GetSafeInt32(startingIndex++);
            aZone.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            aZone.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aZone.DateModified = reader.GetSafeDateTime(startingIndex++);

            return aZone;
        }


    }
}



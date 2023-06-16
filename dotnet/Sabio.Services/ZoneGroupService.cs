using Newtonsoft.Json;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Requests.Example;
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
    public class ZoneGroupService : IZoneGroupService
    {
        IDataProvider _data = null;
        
        public ZoneGroupService(IDataProvider data)
        {
            _data = data;
        }
        public int AddZoneGroup(ZoneGroupAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[ZoneGroups_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@CreatedBy", userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);
            }
            , returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oldId = returnCollection["@Id"].Value;

                int.TryParse(oldId.ToString(), out id);
            });
            return id;
        }

        #region ZoneGroup Update/Update_IsDeleted_ById
        public void UpdateZoneGroup(ZoneGroupUpdateRequest model, int userId)
        {
            string procName = "[dbo].[ZoneGroups_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    col.AddWithValue("@ModifiedBy", userId);
                    col.AddWithValue("@Id", model.Id);
                },
                returnParameters: null);
        }

        public void DeleteZoneGroup(int id, int userId)
        {
            string procName = "[dbo].[ZoneGroups_Update_IsDeleted_ById]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@ModifiedBy", userId);
                    col.AddWithValue("@Id",id);
                },
                returnParameters: null);
        }
        #endregion

        #region ZoneGroup Select_ById/Select_ByZoneId(Paginated)/SelectAll(Paginated)
        public ZoneGroup GetZoneGroupById(int id)
        {
            ZoneGroup aZoneGroup = null;

            _data.ExecuteCmd(
                "[dbo].[ZoneGroups_Select_ById]",
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;

                    aZoneGroup = ZoneGroupMapper(reader, ref startingIndex);
                }
                );
            return aZoneGroup;
        }

        public Paged<ZoneGroup> GetZoneGroupsByZoneId(int pageIndex, int pageSize, int zoneId)
        {
            Paged<ZoneGroup> pagedList = null;
            List<ZoneGroup> list = null;
            int totalCount = 0;

            _data.ExecuteCmd("[dbo].[ZoneGroups_Select_ByZoneId]"
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                    col.AddWithValue("@ZoneId", zoneId);

                }, singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;

                    ZoneGroup aZoneGroup = ZoneGroupMapper(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)
                    {
                        list = new List<ZoneGroup>();
                    }

                    list.Add(aZoneGroup);
                }
            );

            if (list != null)
            {
                pagedList = new Paged<ZoneGroup>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        public Paged<ZoneGroup> SearchZoneGroupsByZoneId(int pageIndex, int pageSize, int zoneId, string query)
        {
            Paged<ZoneGroup> pagedList = null;
            List<ZoneGroup> list = null;
            int totalCount = 0;

            _data.ExecuteCmd("[dbo].[ZoneGroups_Search_Select_ByZoneId]"
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                    col.AddWithValue("@ZoneId", zoneId);
                    col.AddWithValue("@Query", query);

                }, singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;

                    ZoneGroup aZoneGroup = ZoneGroupMapper(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)
                    {
                        list = new List<ZoneGroup>();
                    }

                    list.Add(aZoneGroup);
                }
            );

            if (list != null)
            {
                pagedList = new Paged<ZoneGroup>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        public Paged<ZoneGroup> GetAllZoneGroups(int pageIndex, int pageSize)
        {
            Paged<ZoneGroup> pagedList = null;
            List<ZoneGroup> list = null;
            int totalCount = 0;

            _data.ExecuteCmd("[dbo].[ZoneGroups_SelectAll]"
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);

                }, singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;

                    ZoneGroup aZoneGroup = ZoneGroupMapper(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)
                    {
                        list = new List<ZoneGroup>();
                    }

                    list.Add(aZoneGroup);
                }
            );

            if (list != null)
            {
                pagedList = new Paged<ZoneGroup>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }
        #endregion

        private static ZoneGroup ZoneGroupMapper(IDataReader reader, ref int startingIndex)
        {
            ZoneGroup aZoneGroup = new ZoneGroup();

            aZoneGroup.Id = reader.GetSafeInt32(startingIndex++);
            aZoneGroup.Name = reader.GetSafeString(startingIndex++);
            aZoneGroup.Description = reader.GetSafeString(startingIndex++);
            aZoneGroup.ImageUrl = reader.GetSafeString(startingIndex++);
            aZoneGroup.Zone = reader.DeserializeObject<List<ZoneBase>>(startingIndex++);
            aZoneGroup.EntityType = reader.DeserializeObject<List<LookUp>>(startingIndex++);
            aZoneGroup.GroupAdminId = reader.GetSafeInt32(startingIndex++);
            aZoneGroup.IsDeleted = reader.GetSafeBool(startingIndex++);
            aZoneGroup.DateCreated = reader.GetDateTime(startingIndex++);
            aZoneGroup.DateModified = reader.GetDateTime(startingIndex++);
            aZoneGroup.CreatedBy = reader.GetSafeInt32(startingIndex++);
            aZoneGroup.ModifiedBy = reader.GetSafeInt32(startingIndex++);

            return aZoneGroup;
        }

        private static void AddCommonParams(ZoneGroupAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@ImageUrl", model.ImageUrl);
            col.AddWithValue("@ZoneId", model.ZoneId);
            col.AddWithValue("@EntityTypeId", model.EntityTypeId);
            col.AddWithValue("@GroupAdminId", model.GroupAdminId);

        }
    }
}

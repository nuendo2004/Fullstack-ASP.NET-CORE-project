using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.TrainingZones;
using Sabio.Models.Requests.TrainingZones;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class ZoneConfigServices : IZoneConfigServices
    {
        IDataProvider _data = null;

        public ZoneConfigServices(IDataProvider data)
        {
            _data = data;
        }

        public int Add(ZoneConfigAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[ZoneThreatConfigurationRules_Insert]";
            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                Mapping(model, col, userId);
                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);
            },
            delegate (SqlParameterCollection returnCol)
            {
                object oId = returnCol["@Id"].Value;
                int.TryParse(oId.ToString(), out id);

            });
            return id;
        }
        
        public void Update(ZoneConfigUpdateRequest model, int userId)
        {

            string procName = "[dbo].[ZoneThreatConfigurationRules_Update]";
            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)

        {

            MappingUpdate(model,col,userId);

        }, null);
        }
        public void Delete(int id)
        {
            string procName = "[dbo].[ZoneThreatConfigurationRules_Update_IsDeleted_ById]";
            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, null);
        }
        public Paged<ZoneThreatConfigurationRules> Pagination(int pageIndex, int pageSize, int organizationId)
        {
            Paged<ZoneThreatConfigurationRules> pagedList = null;
            List<ZoneThreatConfigurationRules> list = null;
            int totalCount = 0;
            string procName = "[dbo].[ZoneThreatConfigurationRules_Select_ByOrgId]";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCol)
            {
                paramCol.AddWithValue("@pageIndex", pageIndex);
                paramCol.AddWithValue("@pageSize", pageSize);
                paramCol.AddWithValue("@OrganizationId", organizationId);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                ZoneThreatConfigurationRules rules = SingleUserMapper(reader, ref startingIndex);
                if (totalCount == 0)
                    totalCount = reader.GetSafeInt32(startingIndex);

                if (list == null)
                {
                    list = new List<ZoneThreatConfigurationRules>();
                }
                list.Add(rules);
            });
            if (list != null)
            {
                pagedList = new Paged<ZoneThreatConfigurationRules>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<ZoneThreatConfigurationRules> PaginationSpeed(int pageIndex, int pageSize, int organizationId, int speedCategoryId)
        {
            Paged<ZoneThreatConfigurationRules> pagedList = null;
            List<ZoneThreatConfigurationRules> list = null;
            int totalCount = 0;
            string procName = "[dbo].[ZoneThreatConfigurationRules_Select_ByOrgId_BySpeedId]";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCol)
            {
                paramCol.AddWithValue("@pageIndex", pageIndex);
                paramCol.AddWithValue("@pageSize", pageSize);
                paramCol.AddWithValue("@OrganizationId", organizationId);
                paramCol.AddWithValue("@SpeedCategoryId", speedCategoryId);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                ZoneThreatConfigurationRules rules = SingleUserMapper(reader, ref startingIndex);
                if (totalCount == 0)
                    totalCount = reader.GetSafeInt32(startingIndex++);

                if (list == null)
                {
                    list = new List<ZoneThreatConfigurationRules>();
                }
                list.Add(rules);
            });
            if (list != null)
            {
                pagedList = new Paged<ZoneThreatConfigurationRules>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<ZoneThreatConfigurationRules> PaginationSpread(int pageIndex, int pageSize, int organizationId, int spreadLevelId)
        {
            Paged<ZoneThreatConfigurationRules> pagedList = null;
            List<ZoneThreatConfigurationRules> list = null;
            int totalCount = 0;
            string procName = "[dbo].[ZoneThreatConfigurationRules_Select_ByOrgId_BySpreadId]";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCol)
            {
                paramCol.AddWithValue("@pageIndex", pageIndex);
                paramCol.AddWithValue("@pageSize", pageSize);
                paramCol.AddWithValue("@OrganizationId", organizationId);
                paramCol.AddWithValue("@SpreadLevelId", spreadLevelId);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                ZoneThreatConfigurationRules rules = SingleUserMapper(reader, ref startingIndex);
                if (totalCount == 0)
                    totalCount = reader.GetSafeInt32(startingIndex);

                if (list == null)
                {
                    list = new List<ZoneThreatConfigurationRules>();
                }
                list.Add(rules);
            });
            if (list != null)
            {
                pagedList = new Paged<ZoneThreatConfigurationRules>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public ZoneThreatConfigurationRules Get(int id)
        {
            string procName = "[dbo].[ZoneThreatConfigurationRules_Select_ById]";
            ZoneThreatConfigurationRules user = null;
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);


            }


            , delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                user = SingleUserMapper(reader, ref startingIndex);

            });
            return user;
        }
        private static ZoneThreatConfigurationRules SingleUserMapper(IDataReader reader, ref int startingIndex)
        {
            ZoneThreatConfigurationRules zone = new ZoneThreatConfigurationRules();
            zone.Id = reader.GetInt32(startingIndex++);
            zone.Name = reader.GetString(startingIndex++);
            zone.Description = reader.GetString(startingIndex++);
            zone.IsDeleted = reader.GetBoolean(startingIndex++);
            zone.CreatedBy = reader.GetSafeInt32(startingIndex++);
            zone.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            zone.DateCreated = reader.GetDateTime(startingIndex++);
            zone.DateModified = reader.GetDateTime(startingIndex++);
            zone.SpeedCategory = new LookUp();
            zone.SpeedCategory.Id = reader.GetInt32(startingIndex++);
            zone.SpeedCategory.Name = reader.GetString(startingIndex++);
            zone.SpreadLevel = new SpreadLevel();
            zone.SpreadLevel.Id = reader.GetInt32(startingIndex++);
            zone.SpreadLevel.Name = reader.GetString(startingIndex++);
            zone.SpreadLevel.Description = reader.GetString(startingIndex++);
            zone.Organization = new Organizations();
            zone.Organization.Id = reader.GetInt32(startingIndex++);
            zone.Organization.Name = reader.GetString(startingIndex++);
            zone.Organization.PrimaryLocationId = reader.GetSafeInt32(startingIndex++);
            return zone;

        }
        private static void MappingUpdate(ZoneConfigUpdateRequest model, SqlParameterCollection col ,int userId)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@OrganizationId", model.OrganizationId);
            col.AddWithValue("@SpreadLevelId", model.SpreadLevelId);
            col.AddWithValue("@SpeedCategoryId", model.SpeedCategoryId);
            col.AddWithValue("@IsDeleted", model.IsDeleted);
            col.AddWithValue("@ModifiedBy", userId);
            col.AddWithValue("@Id", model.Id);
        }
        private static void Mapping(ZoneConfigAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@OrganizationId", model.OrganizationId);
            col.AddWithValue("@SpreadLevelId", model.SpreadLevelId);
            col.AddWithValue("@SpeedCategoryId", model.SpeedCategoryId);
            col.AddWithValue("@IsDeleted", model.IsDeleted);
            col.AddWithValue("@UserId", userId);
        }
    }
}

using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Organizations;
using Sabio.Models.Requests.Organizations;
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
    public class OrganizationService : IOrganizationService
    {
        IDataProvider _data = null;

        public OrganizationService(IDataProvider data)
        {
            _data = data;
        }

        public int Add(OrganizationAddRequest model, int userId)
        {
            string procName = "[dbo].[Organizations_Insert]";
            int id = 0;

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    col.AddWithValue("@CreatedBy", userId);
                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    col.Add(idOut);
                }, returnParameters: delegate (SqlParameterCollection retCol)
                {
                    object oId = retCol["@Id"].Value;
                    int.TryParse(oId.ToString(), out id);
                });

            return id;
        }

        public int AddV2(OrganizationAddRequestV2 model, int userId)
        {
            string procName = "[dbo].[Organizations_InsertV2]";
            int id = 0;

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParamsV2(model, col);
                    col.AddWithValue("@UserId", userId);
                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    col.Add(idOut);
                }, returnParameters: delegate(SqlParameterCollection retCol)
                {
                    object oId = retCol["@Id"].Value;
                    int.TryParse(oId.ToString(), out id);
                });

            return id;
        }
        
        public void Delete(int id, int userId)
        {
            string procName = "[dbo].[Organizations_Update_IsDeleted_ById]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                    col.AddWithValue("@UserId", userId);
                });
        }

        public Paged<Organization> Search(int pageIndex, int pageSize, string query)
        {
            string procName = "[dbo].[Organizations_Search]";
            int totalCount = 0;
            Paged<Organization> pagedList = null;
            List<Organization> list = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                    col.AddWithValue("@Query", query);
                }, singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Organization org = MapSingleOrganization(reader, ref startingIndex);

                    if (totalCount == 0)
                        totalCount = reader.GetSafeInt32(startingIndex);

                    if (list == null)
                        list = new List<Organization>();
                    list.Add(org);
                });

            if (list != null)
                pagedList = new Paged<Organization>(list, pageIndex, pageSize, totalCount);

            return pagedList;
        }

        public List<Organization> GetAll()
        {
            string procName = "[dbo].[Organizations_SelectAll]";
            int totalCount = 0;
            List<Organization> list = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Organization org = MapSingleOrganization(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)
                        list = new List<Organization>();

                    list.Add(org);
                });

            return list;
        }
        public Organization Get(int id)
        {
            Organization org = null;
            string procName = "[dbo].[Organizations_Select_ById]";

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                }, singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    org = MapSingleOrganization(reader, ref startingIndex);
                });

            return org;
        }

        public Paged<Organization> GetByUserId(int pageIndex, int pageSize, int userId)
        {
            string procName = "[dbo].[Organizations_Select_ByUserIdV2]";
            Paged<Organization> pagedList = null;
            List<Organization> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                    col.AddWithValue("@UserId", userId);
                }, singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    Organization org = null;
                    int startingIndex = 0;
                    org = MapSingleOrganization(reader, ref startingIndex);
                    if (totalCount == 0)
                        totalCount = reader.GetSafeInt32(startingIndex++);

                    if (list == null)
                        list = new List<Organization>();
                    list.Add(org);
                });

            if (list != null)
                pagedList = new Paged<Organization>(list, pageIndex, pageSize, totalCount);

            return pagedList;
        }

        public void Update(OrganizationUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Organizations_Update]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col);
                    col.AddWithValue("@UserId", userId);
                    col.AddWithValue("@Id", model.Id);
                });
        }

        public List<OrgUserData> GetTotalUsers()
        {
            string procName = "[dbo].[Organizations_Select_TotalUsers]";
            List<OrgUserData> orgList = null;

            _data.ExecuteCmd
                (
                    storedProc: procName,
                    inputParamMapper: null,
                    singleRecordMapper: delegate (IDataReader reader, short set)
                    {
                        int columnIndex = 0;
                        OrgUserData data = MapSingleOrgData(reader, columnIndex);

                        if (orgList == null)
                        {
                            orgList = new List<OrgUserData>();
                        }
                        orgList.Add(data);
                    }
                );
            return orgList;
        }

        public List<OrgUserData> GetTotalTrainees()
        {
            string procName = "[dbo].[Organizations_Select_TotalTrainees]";
            List<OrgUserData> orgList = null;

            _data.ExecuteCmd
                (
                    storedProc: procName,
                    inputParamMapper: null,
                    singleRecordMapper: delegate (IDataReader reader, short set)
                    {
                        int columnIndex = 0;
                        OrgUserData data = MapSingleOrgData(reader, columnIndex);

                        if (orgList == null)
                        {
                            orgList = new List<OrgUserData>();
                        }
                        orgList.Add(data);
                    }
                );
            return orgList;
        }

        private static void AddCommonParams(OrganizationAddRequest model, SqlParameterCollection col)
        {

            col.AddWithValue("@OrganizationTypeId", model.OrganizationTypeId);
            col.AddWithValue("@OrganizationTypeId", model.OrganizationTypeId );
            col.AddWithValue("@Name", model.Name);

            if (model.Description == null)
                col.AddWithValue("@Description", DBNull.Value);
            else
                col.AddWithValue("@Description", model.Description);

            if (model.LogoUrl == null)
                col.AddWithValue("@LogoUrl", DBNull.Value);
            else
                col.AddWithValue("@LogoUrl", model.LogoUrl);

            if (model.BusinessPhone == null)
                col.AddWithValue("@BusinessPhone", DBNull.Value);
            else
                col.AddWithValue("@BusinessPhone", model.BusinessPhone);

            if (model.PrimaryLocationId == null)
                col.AddWithValue("@PrimaryLocationId", DBNull.Value);
            else
                col.AddWithValue("@PrimaryLocationId", model.PrimaryLocationId);

            if (model.SiteUrl == null)
                col.AddWithValue("@SiteUrl", DBNull.Value);
            else

            col.AddWithValue("@IsDeleted", model.IsDeleted);
        }

        private static void AddCommonParamsV2(OrganizationAddRequestV2 model, SqlParameterCollection col)
        {

            col.AddWithValue("@OrganizationTypeId", model.OrganizationTypeId);
            col.AddWithValue("@Name", model.Name);

            if (model.Description == null)
                col.AddWithValue("@Description", DBNull.Value);
            else
                col.AddWithValue("@Description", model.Description);

            if (model.LogoUrl == null)
                col.AddWithValue("@LogoUrl", DBNull.Value);
            else
                col.AddWithValue("@LogoUrl", model.LogoUrl);

            if (model.BusinessPhone == null)
                col.AddWithValue("@BusinessPhone", DBNull.Value);
            else
                col.AddWithValue("@BusinessPhone", model.BusinessPhone);

            if (model.SiteUrl == null)
                col.AddWithValue("@SiteUrl", DBNull.Value);
            else
                col.AddWithValue("@SiteUrl", model.SiteUrl);

            col.AddWithValue("@IsDeleted", model.IsDeleted);
            col.AddWithValue("@LocationTypeId", model.LocationTypeId);
            col.AddWithValue("@LineOne", model.LineOne);

            if (model.LineTwo == null)
                col.AddWithValue("@LineTwo", DBNull.Value);
            else
                col.AddWithValue("@LineTwo", model.LineTwo);
            col.AddWithValue("@City", model.City);
            col.AddWithValue("@Zip", model.Zip);
            col.AddWithValue("@StateId", model.StateId);
            col.AddWithValue("@Latitude", model.Latitude);
            col.AddWithValue("@Longitude", model.Longitude);
        }

        private static Organization MapSingleOrganization(IDataReader reader, ref int startingIndex)
        {
            Organization organization = new Organization();
            organization.OrganizationType = new LookUp();


            organization.Id = reader.GetSafeInt32(startingIndex++);

            organization.OrganizationType.Id = reader.GetSafeInt32(startingIndex++);
            organization.OrganizationType.Name = reader.GetSafeString(startingIndex++);
            organization.Name = reader.GetSafeString(startingIndex++);
            organization.Description = reader.GetSafeString(startingIndex++);
            organization.LogoUrl = reader.GetSafeString(startingIndex++);
            organization.BusinessPhone = reader.GetSafeString(startingIndex++);
            organization.PrimaryLocationId = reader.GetSafeInt32(startingIndex++);

            organization.LocationTypeId = reader.GetSafeInt32(startingIndex++);

            // Location model is not created yet. Will change it once its created
            organization.LocationName = reader.GetSafeString(startingIndex++);
            organization.LocationLineOne = reader.GetSafeString(startingIndex++);
            organization.LocationLineTwo = reader.GetSafeString(startingIndex++);
            organization.LocationCity = reader.GetSafeString(startingIndex++);
            organization.LocationZip = reader.GetSafeString(startingIndex++);
            organization.LocationStateId = reader.GetSafeInt32(startingIndex++);
            organization.LocationLatitude = reader.GetSafeDouble(startingIndex++);
            organization.LocationLongitude = reader.GetSafeDouble(startingIndex++);

            organization.SiteUrl = reader.GetSafeString(startingIndex++);
            organization.DateCreated = reader.GetSafeDateTime(startingIndex++);
            organization.DateModified = reader.GetSafeDateTime(startingIndex++);
            organization.CreatedBy = reader.GetSafeInt32(startingIndex++);
            organization.ModifiedBy = reader.GetSafeInt32(startingIndex++);

            return organization;
        }

        private static OrgUserData MapSingleOrgData(IDataReader reader, int index)
        {
            OrgUserData data = new OrgUserData();
            data.Id = reader.GetSafeInt32(index++);
            data.Name = reader.GetSafeString(index++);
            data.TotalAmount = reader.GetSafeInt32(index++);
            
            return data;
        }

        public List<LookUp> GetOrgLookUpById(int userId)
        {
            List<LookUp> list = null;
            string procName = "[dbo].[OrganizationsV2_SelectAll]";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramcollection)
            {
                paramcollection.AddWithValue("@currentUserId", userId);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                LookUp organization = OrgLookUpMapper(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<LookUp>();
                }

                list.Add(organization);
            }
            );
            return list;
        }

        private static LookUp OrgLookUpMapper(IDataReader reader, ref int startingIndex)
        {
            LookUp organization = new LookUp();
            


            organization.Id = reader.GetSafeInt32(startingIndex++);
            organization.Name = reader.GetSafeString(startingIndex++);
            return organization;
        }
    }
}
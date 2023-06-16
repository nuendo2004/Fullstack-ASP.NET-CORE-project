using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Advertisements;
using Sabio.Models.Requests.Advertisements;
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
    public class AdvertisementService : IAdvertisementService
    {
        IDataProvider _data = null;

        public AdvertisementService(IDataProvider data)
        {
            _data = data;
        }

        public int Add(AdvertisementAddRequest model, int userId)
        {
            string procName = "[dbo].[Advertisements_Insert]";
            int id = 0;

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    CommonParamsMapper(model, col);
                    col.AddWithValue("@UserId", userId);
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

        public void Delete(int id, int userId)
        {
            string procName = "[dbo].[Advertisements_DeleteById]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                    col.AddWithValue("@UserId", userId);
                });
        }

        public Advertisement Get(int id)
        {
            Advertisement advertisement = null;
            string procName = "[dbo].[Advertisements_SelectById]";

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate(SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                }, singleRecordMapper: delegate(IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    advertisement = MapSingleAdvertisement(reader, ref startingIndex);
                });

            return advertisement;
        }

        public Paged<Advertisement> GetAll(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Advertisements_SelectAll]";
            int totalCount = 0;
            Paged<Advertisement> pagedList = null;
            List<Advertisement> list = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate(SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                }, singleRecordMapper: delegate(IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Advertisement ad = MapSingleAdvertisement(reader, ref startingIndex);

                    if (totalCount == 0)
                        totalCount = reader.GetSafeInt32(startingIndex);

                    if(list == null)
                        list = new List<Advertisement>();

                    list.Add(ad);
                });
            if (list != null)
                pagedList = new Paged<Advertisement>(list, pageIndex, pageSize, totalCount);
            return pagedList; 
            }

        public Paged<Advertisement> GetByCreatedBy(int userId, int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Advertisements_SelectByCreatedBy]";
            int totalCount = 0;
            Paged<Advertisement> pagedList = null;
            List<Advertisement> list = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate(SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                    col.AddWithValue("@UserId", userId);
                }, singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Advertisement ad = MapSingleAdvertisement(reader, ref startingIndex);

                    if (totalCount == 0)
                        totalCount = reader.GetSafeInt32(startingIndex);

                    if (list == null)
                        list = new List<Advertisement>();

                    list.Add(ad);
                });

            if (list != null)
                pagedList = new Paged<Advertisement>(list, pageIndex, pageSize, totalCount);

            return pagedList;
        }

        public void Update(AdvertisementUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Advertisements_Update]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate(SqlParameterCollection col)
                {
                    CommonParamsMapper(model, col);
                    col.AddWithValue("@UserId", userId);
                    col.AddWithValue("@Id", model.Id);
                });
        }

        public void UpdateStatus(int id, int userId, bool isDisabled)
        {
            string procName = "[dbo].[Advertisements_UpdateStatus]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate(SqlParameterCollection col)
                {
                    col.AddWithValue("@Status", isDisabled);
                    col.AddWithValue("@UserId", userId);
                    col.AddWithValue("@Id", id);
                });
        }

        public static void CommonParamsMapper(AdvertisementAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@EntityId", model.EntityId);
            col.AddWithValue("@EntityTypeId", model.EntityTypeId);
            col.AddWithValue("Title", model.Title);

            if(model.AdMainImageUrl == null)
                col.AddWithValue("AdMainImageUrl", "");
            else
                col.AddWithValue("AdMainImageUrl", model.AdMainImageUrl);

            if (model.Details == null)
                col.AddWithValue("Details", "");
            else
                col.AddWithValue("Details", model.Details);

            col.AddWithValue("ActionId", model.ActionId);
        }

        public static Advertisement MapSingleAdvertisement(IDataReader reader, ref int startingIndex)
        {
            Advertisement advertisement = new Advertisement();
            advertisement.EntityType = new LookUp();

            advertisement.Id = reader.GetSafeInt32(startingIndex++);
            advertisement.EntityId = reader.GetSafeInt32(startingIndex++);
            advertisement.EntityType.Id = reader.GetSafeInt32(startingIndex++);
            advertisement.EntityType.Name = reader.GetSafeString(startingIndex++);
            advertisement.Title = reader.GetSafeString(startingIndex++);
            advertisement.AdMainImageUrl = reader.GetSafeString(startingIndex++);
            advertisement.Details = reader.GetSafeString(startingIndex++);
            advertisement.ActionId = reader.GetSafeString(startingIndex++);
            advertisement.IsDisabled = reader.GetSafeBool(startingIndex++);
            advertisement.DateCreated = reader.GetSafeDateTime(startingIndex++);
            advertisement.DateModified = reader.GetSafeDateTime(startingIndex++);
            advertisement.CreatedBy = reader.GetSafeInt32(startingIndex++);
            advertisement.ModifiedBy = reader.GetSafeInt32(startingIndex++);

            return advertisement;
        }
    }
}
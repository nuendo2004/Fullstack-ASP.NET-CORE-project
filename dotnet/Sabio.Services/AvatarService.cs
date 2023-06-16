using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Files;
using Sabio.Models.Requests.Avatars;
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
    public class AvatarService : IAvatarService
    {
        IDataProvider _data = null;
        public AvatarService(IDataProvider data)
        {
            _data = data;
        }
        public List<Avatar> GetAll()
        {
            string procName = "[dbo].[Avatars_SelectAll]";
            List<Avatar> list = null;
            Avatar avatar = null;
            _data.ExecuteCmd(procName,
                inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    avatar = MapSingleAvatar(reader, ref index);
                    if (list == null)
                    {
                        list = new List<Avatar>();
                    }
                    list.Add(avatar);
                });
            return list;
        }
        public Avatar GetById(int id)
        {
            Avatar avatar = null;
            string procName = "[dbo].[Avatars_SelectById]";
            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                }, singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    avatar = MapSingleAvatar(reader, ref index);
                });
            return avatar;
        }
        public Paged<Avatar> GetPaged(int pageIndex, int pageSize, string query)
        {
            Paged<Avatar> pagedList = null;
            List<Avatar> list = null;
            int totalCount = 0;
            string procName = "[dbo].[Avatar_Select_Paged]";
            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                    col.AddWithValue("@Query", query);
                }, singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    Avatar avatar = MapSingleAvatar(reader, ref index);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(index++);
                    }
                    if (list == null)
                    {
                        list = new List<Avatar>();
                    }
                    list.Add(avatar);
                });
            if (list != null)
            {
                pagedList = new Paged<Avatar>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public void UpdateDelete(AvatarUpdateDelete model)
        {
            string procName = "[dbo].[Avatars_Update_IsDeleted_ById]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", model.Id);
                    col.AddWithValue("@IsDeleted", model.IsDeleted);
                }, returnParameters: null);
        }
        public void Update(UpdateAvatarRequest model)
        {
            string procName = "[dbo].[Avatars_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", model.Id);
                    col.AddWithValue("@FileId", model.FileId);
                    col.AddWithValue("@CreatedBy", model.CreatedBy);
                }, returnParameters: null);
        }
        public void Create(List<AvatarAddRequest> model)
        {
            string procName = "[dbo].[Avatars_Insert_Batch]";
            DataTable dataTable = MapFileUserTable(model);

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@fileIdUserIdTable", dataTable);

                }, returnParameters: null); ;
        }
        private DataTable MapFileUserTable(List<AvatarAddRequest> mappedFileUser)
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("FileId", typeof(int));
            dt.Columns.Add("UserId", typeof(int));

            if (mappedFileUser != null)
            {
                foreach (AvatarAddRequest singleAvatar in mappedFileUser)
                {
                    DataRow dr = dt.NewRow();
                    int index = 0;
                    dr.SetField(index++, singleAvatar.FileId);
                    dr.SetField(index++, singleAvatar.UserId);

                    dt.Rows.Add(dr);
                }
            }
            return dt;
        }

        private Avatar MapSingleAvatar(IDataReader reader, ref int index)
        {
            Avatar avatar = new Avatar();
            avatar.FileId = new File();
            avatar.CreatedBy = new User();
            avatar.Id = reader.GetSafeInt32(index++);
            avatar.FileId.Id = reader.GetSafeInt32(index++);
            avatar.FileId.Name = reader.GetSafeString(index++);
            avatar.FileId.Url = reader.GetSafeString(index++);
            avatar.IsDeleted = reader.GetSafeBool(index++);
            avatar.CreatedBy.Id = reader.GetSafeInt32(index++);
            avatar.CreatedBy.Email = reader.GetSafeString(index++);
            avatar.CreatedBy.FirstName = reader.GetSafeString(index++);
            avatar.CreatedBy.LastName = reader.GetSafeString(index++);
            avatar.DateCreated = reader.GetSafeDateTime(index++);
            return avatar;
        }
    }
}

using Google.Apis.AnalyticsReporting.v4.Data;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Employees;
using Sabio.Models.Requests.Avatars;
using Sabio.Models.Requests.Employees;
using Sabio.Models.Requests.ExternalLink;
using Sabio.Models.Requests.Faqs;
using Sabio.Models.Requests.InviteMembers;
using Sabio.Services.Interfaces;
using Stripe.Terminal;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Reflection.PortableExecutable;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class ExternalLinkService : IExternalLinkService
    {

        IDataProvider _data = null;
        ILookUpService _lookupService = null;

        public ExternalLinkService(IDataProvider data, ILookUpService service)
        {
            _data = data;
            _lookupService = service;
        }

        public List<ExternalLink> GetByCreated(int creatorId)
        {
            List<ExternalLink> list = null;
            string procName = "[dbo].[ExternalLinks_SelectByCreatedBy]";
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@CreatorId", creatorId);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                ExternalLink ExternLink = MapSingleExternalLink(reader);

                if (list == null)
                {
                    list = new List<ExternalLink>();
                }
                list.Add(ExternLink);
            });
            return list;
        }

        public void DeleteById(int Id)
        {
            string procName = "[dbo].[ExternalLinks_DeleteById]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", Id);
                },
                returnParameters: null);
        }

        public void Update(ExternalLinkUpdateRequest model, int Id, int UserId)
        {
            string procName = "[dbo].[ExternalLinks_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col, UserId);
                    col.AddWithValue("@Id", Id);
                },
                    returnParameters: null);
        }

        public int Add(ExternalLinkAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[ExternalLinks_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, userId);

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

        public void AddByBatch(ExternalLinkBatchAddRequest model, int userId)
        {
            

            string procName = "[dbo].[ExternalLinks_Batch_Insert]";
            DataTable dataTable = null;
            List<LookUp> list = model.UrlType;
            if(model!=null)
            {
                dataTable=MapBatchInsertTable(model, userId, list);
            }
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@CreatedBy", userId);
                col.AddWithValue("@batchExternalLinkInsert", dataTable);
                col.AddWithValue("@EntityId", model.EntityId);
                col.AddWithValue("@EntityTypeId", model.EntityTypeId);
            },
            returnParameters: null);
        }

        private static void AddCommonParams(ExternalLinkAddRequest model, SqlParameterCollection col, int UserId)
        {
            col.AddWithValue("@CreatedBy", UserId);
            col.AddWithValue("@UrlTypeId", model.UrlTypeId);
            col.AddWithValue("@Url", model.Url);
            col.AddWithValue("@EntityId", model.EntityId);
            col.AddWithValue("@EntityTypeId", model.EntityTypeId);
        }

        private ExternalLink MapSingleExternalLink(IDataReader reader)
        {
            ExternalLink ExtLink = new ExternalLink();
            int startingIndex = 0;
            ExtLink.Id = reader.GetSafeInt32(startingIndex++);
            ExtLink.UserId = reader.GetSafeInt32(startingIndex++);
            ExtLink.UrlType = _lookupService.MapSingleLookUp(reader, ref startingIndex);
            ExtLink.Url = reader.GetSafeString(startingIndex++);
            ExtLink.EntityId = reader.GetSafeInt32(startingIndex++);
            ExtLink.EntityType = _lookupService.MapSingleLookUp(reader, ref startingIndex);
            ExtLink.DateCreated = reader.GetSafeDateTime(startingIndex++);
            ExtLink.DateModified = reader.GetSafeDateTime(startingIndex++);

            return ExtLink;
        }
        private static DataTable MapBatchInsertTable(ExternalLinkBatchAddRequest model, int userId, List<LookUp> list)
        {
            DataTable batchInsert = new DataTable();
            
            batchInsert.Columns.Add("UrlTypeId", typeof(int));
            batchInsert.Columns.Add("Url", typeof(string));
            
            if (model != null)
            {
                foreach (LookUp line in list)
                {
                    DataRow dr = batchInsert.NewRow();
                    int index = 0;
                    dr.SetField(index++, line.Id);
                    dr.SetField(index++, line.Name);
            
                    batchInsert.Rows.Add(dr);
                }
            }
            return batchInsert;
        }
    }
    
}

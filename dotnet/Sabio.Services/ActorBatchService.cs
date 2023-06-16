using Amazon.S3.Model;
using Newtonsoft.Json;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Actors;
using Sabio.Models.Domain.Consequences;
using Sabio.Models.Requests;
using Sabio.Models.Requests.ActorAccountRequests;
using Sabio.Models.Requests.Actors;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Text.Json.Nodes;

namespace Sabio.Services
{
    public class ActorBatchService : IActorBatchService
    {
        readonly IDataProvider _data = null;

        public ActorBatchService(IDataProvider data)
        {
            _data = data;
        }

        public int AddActorBatch(ComprehensiveActorAccountAddRequest request, int userId)
        {
            
            int id = 0;  
           
            DataTable actorAccountTable = MapActorToTable(request.ActorAccount);

            string procName = "[dbo].[ActorAccount_Batch_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(request, col, userId, actorAccountTable);                
                SqlParameter id = new SqlParameter("@Id", SqlDbType.Int);
                id.Direction = ParameterDirection.Output;
                SqlParameter accountId = new SqlParameter("@ActorId", SqlDbType.Int);
                accountId.Direction = ParameterDirection.Output;
                SqlParameter conId = new SqlParameter("@ConId", SqlDbType.Int);
                conId.Direction = ParameterDirection.Output;

                
                col.Add(id);
                col.Add(accountId);
                col.Add(conId);
                
            },
            returnParameters: delegate(SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;              
                int.TryParse(oId.ToString(), out id);                               
            }
            );

            return id;
        }

        public Paged<ActorBatch> GetActorByCreator(int pageIndex, int pageSize, string creator)
        {
            Paged<ActorBatch> pagedList = null;
            List<ActorBatch> list = null;
            int totalCount = 0;

            string procName = "[dbo].[ActorsBatch_SelectByCreatedBy]";
            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@pageIndex", pageIndex);
                col.AddWithValue("@pageSize", pageSize);
                col.AddWithValue("@CreatedBy", creator);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                ActorBatch loki = MapActor(reader, ref startingIndex);

                if (totalCount == 0) totalCount = reader.GetSafeInt32(startingIndex);

                if (list == null)
                {
                    list = new List<ActorBatch>();
                }
                list.Add(loki);
            });
            if (list != null)
            {
                pagedList = new Paged<ActorBatch>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<ActorBatchV2> GetActorByActorName(int pageIndex, int pageSize, string actorName)
        {
            Paged<ActorBatchV2> pagedList = null;
            List<ActorBatchV2> list = null;
            int totalCount = 0;

            string procName = "[dbo].[ActorsBatch_SelectByActorName]";
            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@pageIndex", pageIndex);
                col.AddWithValue("@pageSize", pageSize);
                col.AddWithValue("@actorName", actorName);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                ActorBatchV2 loki = MapActorV2(reader, ref startingIndex);

                if (totalCount == 0) totalCount = reader.GetSafeInt32(startingIndex);

                if (list == null)
                {
                    list = new List<ActorBatchV2>();
                }
                list.Add(loki);
            });
            if (list != null)
            {
                pagedList = new Paged<ActorBatchV2>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<ActorBatchV2> GetAllActorsPaginated(int pageIndex, int pageSize)
        {
            Paged<ActorBatchV2> pagedList = null;
            List<ActorBatchV2> list = null;
            int totalCount = 0;

            string procName = "[dbo].[ActorAccount_Batch_Paginate_All]";
            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@pageIndex", pageIndex);
                col.AddWithValue("@pageSize", pageSize);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                ActorBatchV2 actor = MapActorV2(reader, ref startingIndex);

                if (totalCount == 0) totalCount = reader.GetSafeInt32(startingIndex);

                if (list == null)
                {
                    list = new List<ActorBatchV2>();
                }
                list.Add(actor);
            });
            if (list != null)
            {
                pagedList = new Paged<ActorBatchV2>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        private static ActorBatch MapActor(IDataReader reader, ref int startingIndex)
        {
            ActorBatch actor = new ActorBatch();
            actor.ActorTypeId = new LookUp();
            actor.StatusTypeId = new LookUp();
            actor.ConsequenceType = new LookUp();
            actor.AccountStatus = new LookUp();
            actor.ZoneId = new Zone();

            startingIndex = 0;

            actor.Id = reader.GetSafeInt32(startingIndex++);
            actor.Name = reader.GetSafeString(startingIndex++);
            actor.Description = reader.GetSafeString(startingIndex++);
            actor.ActorTypeId.Id = reader.GetSafeInt32(startingIndex++);
            actor.StatusTypeId.Id = reader.GetSafeInt32(startingIndex++);
            actor.ConName = reader.GetSafeString(startingIndex++);
            actor.ConDescription = reader.GetSafeString(startingIndex++);
            actor.ConsequenceType.Id = reader.GetSafeInt32(startingIndex++);
            actor.ConsequenceType.Name = reader.GetSafeString(startingIndex++);
            actor.ZoneId.Id = reader.GetSafeInt32(startingIndex++);
            actor.UserName = reader.GetSafeString(startingIndex++);
            actor.AvatarUrl = reader.GetSafeString(startingIndex++);
            actor.AccountStatus.Id = reader.GetSafeInt32(startingIndex++);
            actor.ZoneId.Name = reader.GetSafeString(startingIndex++);
            actor.ZoneId.Description = reader.GetSafeString(startingIndex++);
            actor.DateCreated = reader.GetSafeDateTime(startingIndex++);
            actor.DateModified = reader.GetSafeDateTime(startingIndex++);

            return actor;
        }

        private static ActorBatchV2 MapActorV2(IDataReader reader, ref int startingIndex)
        {
            startingIndex = 0; 

            ActorBatchV2 actor = new ActorBatchV2();
            actor.ActorTypeId = new LookUp();
            actor.StatusTypeId = new LookUp();
            actor.Consequence = new Consequence();
            actor.Consequence.ConsequenceType = new LookUp();
            actor.Consequence.ZoneId = new Zone();

            actor.Id = reader.GetSafeInt32(startingIndex++);
            actor.Name = reader.GetSafeString(startingIndex++);
            actor.Description = reader.GetSafeString(startingIndex++);
            actor.ActorTypeId.Id = reader.GetSafeInt32(startingIndex++);
            actor.StatusTypeId.Id = reader.GetSafeInt32(startingIndex++);
            actor.CreatedBy = reader.GetSafeInt32(startingIndex++);
            actor.ModifiedBy = reader.GetSafeInt32(startingIndex++);
     
            string actorAccount = reader.GetSafeString(startingIndex++);
            if(!string.IsNullOrEmpty(actorAccount))
            { 
            actor.ActorAccounts = JsonConvert.DeserializeObject<List<ActorAccountBase>>(actorAccount);
            }
            actor.Consequence.Name = reader.GetSafeString(startingIndex++);
            actor.Consequence.Description = reader.GetSafeString(startingIndex++);
            actor.Consequence.ConsequenceType.Id = reader.GetSafeInt32(startingIndex++);
            actor.Consequence.ZoneId.Id = reader.GetSafeInt32(startingIndex++);
            actor.Consequence.ZoneId.Name = reader.GetSafeString(startingIndex++);
            actor.Consequence.ZoneId.Description = reader.GetSafeString(startingIndex++);
            actor.DateCreated = reader.GetSafeUtcDateTime(startingIndex++);
            actor.DateCreated = reader.GetSafeUtcDateTime(startingIndex++);

            return actor; 
        }

        private DataTable MapActorToTable(List<ActorAccountAddRequest> actorAccount) 
        {

            DataTable dt = new DataTable();
            dt.Columns.Add("UserName", typeof(string));
            dt.Columns.Add("AvatarUrl", typeof(string));           
            dt.Columns.Add("AccountStatusId", typeof(int));          

            foreach (ActorAccountAddRequest actor in actorAccount)

            {
                DataRow dr = dt.NewRow();
                int index = 0;
                
                dr.SetField(index++, actor.UserName);
                dr.SetField(index++, actor.AvatarUrl);               
                dr.SetField(index++, actor.AccountStatusId);
                
                dt.Rows.Add(dr);
            }
            return dt;
        }
        private static void AddCommonParams(ComprehensiveActorAccountAddRequest request, SqlParameterCollection col, int userId, DataTable actorAccountTableTable)
        {
            col.AddWithValue("@newActorAccounts", actorAccountTableTable);
            col.AddWithValue("@ActorName", request.ActorName);
            col.AddWithValue("@ActorDescription", request.ActorDescription);
            col.AddWithValue("@ActorTypeId", request.ActorTypeId);
            col.AddWithValue("@StatusTypeId", request.StatustypeId);
            col.AddWithValue("@conName", request.ConName);
            col.AddWithValue("@conDescription", request.ConDescription);
            col.AddWithValue("@ConsequenceTypeId", request.ConsequenceTypeId);
            col.AddWithValue("@ZoneId", request.ZoneId);
            col.AddWithValue("@CreatedBy", userId);
            col.AddWithValue("@ModifiedBy", userId);
        }
    }
}

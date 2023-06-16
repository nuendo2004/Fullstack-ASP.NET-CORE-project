using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Actors;
using Sabio.Models.Requests.ActorAccountRequests;
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
    public class ActorAccountServices : IActorAccountServices
    {
        IDataProvider _data = null;
        ILookUpService _lookUpService = null;

        public ActorAccountServices(IDataProvider data, ILookUpService lookUpService)
        {
            _data = data;
            _lookUpService = lookUpService;
        }

        public ActorAccount GetById(int id)
        {
            ActorAccount actorAcc = null;
            string procName = "[dbo].[ActorAccounts_SelectById]";
            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);

                }, singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    actorAcc = MapSingleActorAccount(reader, ref index);
                });
            return actorAcc;
        }

        public Paged<ActorAccount> GetByActorId(int actorId, int pageIndex, int pageSize)
        {
            Paged<ActorAccount> paged = null;
            List<ActorAccount> list = null;
            int totalCount = 0;
            string procName = "[dbo].[ActorAccounts_Select_ByActorId]";
            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@ActorId", actorId);
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);

                }, singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    ActorAccount actorAcc = MapSingleActorAccount(reader, ref index);
                    if (totalCount == 0)
                    { 
                        totalCount = reader.GetSafeInt32(index++); 
                    }
                    if (list == null)
                    {
                        list = new List<ActorAccount>();
                    }
                    list.Add(actorAcc);
                });
            if (list != null)
            {
                paged = new Paged<ActorAccount>(list, pageIndex, pageSize, totalCount);
            }
            return paged;
        }

        public List<ActorAccount> GetByZoneId(int zoneId)
        {
            List<ActorAccount> list = null;
            ActorAccount actorAcc = null;
            string procName = "[dbo].[ActorAccounts_Select_ByZoneId]";
            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@ZoneId", zoneId);
                }, singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    actorAcc = MapSingleActorAccount(reader, ref index);
                    if (list == null)
                    {
                        list = new List<ActorAccount>();
                    }
                    list.Add(actorAcc);
                });
            return list;
        }

        public int Add(ActorAccountAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[ActorAccounts_Insert]";
            _data.ExecuteNonQuery(procName,
              inputParamMapper: delegate (SqlParameterCollection col)
              {
                  AddCommonParams(model, col,userId);
                  col.AddWithValue("@CreatedBy", userId);
                  SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                  idOut.Direction = ParameterDirection.Output;
                  col.Add(idOut);
              },
              returnParameters: delegate (SqlParameterCollection returnCol)
              {
                  object objectId = returnCol["@Id"].Value;
                  int.TryParse(objectId.ToString(), out id);
              });
            return id;
        }

        public void Update(ActorAccountUpdateRequest model, int userId)
        {
            string procName = "[dbo].[ActorAccounts_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col,userId);
                    col.AddWithValue("@Id", model.Id);
                }, returnParameters: null);

        }
        public void UpdateStatus(ActorAccountStatusUpdateRequest model, int userId)
        {
            string procName = "[dbo].[ActorAccounts_Update_Status]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", model.Id);
                    col.AddWithValue("@ModifiedBy", userId);
                    col.AddWithValue("@AccountStatusId", model.AccountStatusId);
                }, returnParameters: null);
        }

        private static void AddCommonParams(ActorAccountAddRequest model, SqlParameterCollection col,int userId)
        {
            col.AddWithValue("@UserName", model.UserName);            
            col.AddWithValue("@AvatarUrl", model.AvatarUrl);                      
            col.AddWithValue("@AccountStatusId", model.AccountStatusId);
            col.AddWithValue("@ModifiedBy", userId);
        }

        private ActorAccount MapSingleActorAccount(IDataReader reader, ref int index)
        {
            ActorAccount actorAcc = new ActorAccount();

            actorAcc.Id = reader.GetSafeInt32(index++);
            actorAcc.UserName = reader.GetSafeString(index++);            
            actorAcc.AvatarUrl = reader.GetSafeString(index++);
            actorAcc.Zone = _lookUpService.MapSingleLookUp(reader, ref index);
            actorAcc.ZoneStatus = _lookUpService.MapSingleLookUp(reader, ref index);
            actorAcc.Actor = new Actor();
            actorAcc.Actor.Id = reader.GetSafeInt32(index++);
            actorAcc.Actor.Name = reader.GetSafeString(index++);
            actorAcc.Actor.ActorTypeId = _lookUpService.MapSingleLookUp(reader, ref index);
            actorAcc.Actor.StatusTypeId = _lookUpService.MapSingleLookUp(reader, ref index);
            actorAcc.AccountStatus = _lookUpService.MapSingleLookUp(reader, ref index);
            actorAcc.CreatedBy = new User();
            actorAcc.CreatedBy.Id = reader.GetSafeInt32(index++);
            actorAcc.CreatedBy.FirstName = reader.GetSafeString(index++);
            actorAcc.CreatedBy.LastName = reader.GetSafeString(index++);
            actorAcc.ModifiedBy = new User();
            actorAcc.ModifiedBy.Id = reader.GetSafeInt32(index++);
            actorAcc.ModifiedBy.FirstName = reader.GetSafeString(index++);
            actorAcc.ModifiedBy.LastName = reader.GetSafeString(index++);
            actorAcc.DateCreated = reader.GetSafeDateTime(index++);
            actorAcc.DateModified = reader.GetSafeDateTime(index++);

            return actorAcc;
        }
    }
}

using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Consequences;
using Sabio.Models.Requests.Consequences;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class ConsequenceService : IConsequenceService 
    {
        IDataProvider _data = null;
        ILookUpService _lookUpService = null;

        public ConsequenceService(IDataProvider data, ILookUpService lookUp)
        {
            _data = data;
            _lookUpService = lookUp;
        }

        public Consequence GetById(int id)
        {
            string procName = "[dbo].[Consequence_Select_ById]";
            int index = 0;
            Consequence consequence = null;

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                consequence = MapSingleConsequence(reader, ref index);
            });
            return consequence;
        }

        public int AddConsequence(ConsequenceAddRequest model, int userId)
        {
            string procName = "[dbo].[Consequences_Insert]";

            int Id = 0;

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);
            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object idObj = returnCollection["@Id"].Value;

                int.TryParse(idObj.ToString(), out Id);
            });
            return Id;
        }

        public Paged<Consequence> GetByActorId(int pageIndex, int pageSize, int actorId)
        {
            string procName = "[dbo].[Consequence_Select_ByActorId]";

            Paged<Consequence> pagedList = null;
            List<Consequence> list = null;
            int index = 0;
            int totalCount = 0;

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
                col.AddWithValue("@actorId", actorId);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                Consequence consequence = MapSingleConsequence(reader, ref index);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(index++);
                }
                if (list == null)
                {
                    list = new List<Consequence>();
                }
                list.Add(consequence);
            });
            if(list != null)
            {
                pagedList = new Paged<Consequence>(list, pageIndex, pageSize, actorId);
            }
            return pagedList;
        }

        public List<Consequence> GetByZoneId(int zoneId)
        {
            string procName = "[dbo].[Consequence_Select_ByZoneId]";
            List<Consequence> list = null;
            int index = 0;

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@ZoneId", zoneId);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
               Consequence consequence = MapSingleConsequence(reader, ref index);
                if(list == null)
                {
                    list = new List<Consequence>();
                }
                list.Add(consequence);
            });
            return list;
        }

        public Paged<Consequence> Paged(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Consequence_Select_Paged]";
            Paged<Consequence> pagedList = null;
            List<Consequence> list = null;
            int index = 0;
            int totalCount = 0;

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                Consequence consequence = MapSingleConsequence(reader, ref index);
                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(index++);
                }
                if (list == null)
                {
                    list = new List<Consequence>();
                }
                list.Add(consequence);
            });
            if(list != null)
            {
                pagedList = new Paged<Consequence>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public void UpdateConsequence(ConsequenceUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Consequences_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", model.Id);
                col.AddWithValue("@isActive", model.IsActive);
                col.AddWithValue("@isDeleted", model.isDeleted);
                AddCommonParams(model, col, userId);
            }, returnParameters: null);

        }

        public void UpdateDeleteConsequence(int id)
        {
            string procName = "[dbo].[Consequences_Update_IsDelete_ById]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, returnParameters: null);

        }

        private Consequence MapSingleConsequence(IDataReader reader, ref int index)
        {
            Consequence consequence = new Consequence();
            consequence.ConsequenceType = new LookUp();
            consequence.ModifiedBy = new User();
            consequence.CreatedBy = new User();
            consequence.ActorId = new ActorTemp();
            consequence.ZoneId = new Zone();
            consequence.ZoneId.ZoneType = new LookUp();
            consequence.ZoneId.ZoneStatus = new LookUp();
            index = 0;

            consequence.Id = reader.GetSafeInt32(index++);
            consequence.Name = reader.GetSafeString(index++);
            consequence.Description = reader.GetSafeString(index++);
            consequence.ConsequenceType.Id = reader.GetSafeInt32(index++);
            consequence.ConsequenceType.Name = reader.GetSafeString(index++);
            //consequence.ConsequenceType = _lookUpService.MapSingleLookUp(reader, ref index++);
            consequence.ActorId.Id = reader.GetSafeInt32(index++);
            consequence.ActorId.Name = reader.GetSafeString(index++);
            consequence.ActorId.Description = reader.GetSafeString(index++);
            consequence.ActorId.ActorTypeId = reader.GetSafeInt32(index++);
            consequence.ActorId.StatusTypeId = reader.GetSafeInt32(index++);
            consequence.ActorId.CreatedBy = reader.GetSafeInt32(index++);
            consequence.ActorId.ModifiedBy = reader.GetSafeInt32(index++);
            consequence.ActorId.DateCreated = reader.GetSafeDateTime(index++);
            consequence.ActorId.DateModified = reader.GetSafeDateTime(index++);

            consequence.ZoneId.Id = reader.GetSafeInt32(index++);
            consequence.ZoneId.Name = reader.GetSafeString(index++);
            consequence.ZoneId.Description = reader.GetSafeString(index++);
            consequence.ZoneId.ZoneType.Id = reader.GetSafeInt32(index++);
            consequence.ZoneId.ZoneStatus.Id = reader.GetSafeInt32(index++);
            consequence.ZoneId.IsDeleted = reader.GetSafeBool(index++);
            consequence.ZoneId.CreatedBy = reader.GetSafeInt32(index++);
            consequence.ZoneId.ModifiedBy = reader.GetSafeInt32(index++);
            consequence.ZoneId.DateCreated = reader.GetSafeDateTime(index++);
            consequence.ZoneId.DateModified = reader.GetSafeDateTime(index++);

            consequence.isActive = reader.GetSafeBool(index++);
            consequence.isDeleted = reader.GetSafeBool(index++);
            
            consequence.CreatedBy.Id = reader.GetSafeInt32(index++);
            consequence.CreatedBy.Email = reader.GetSafeString(index++);
            consequence.CreatedBy.FirstName = reader.GetSafeString(index++);
            consequence.CreatedBy.LastName = reader.GetSafeString(index++);
            consequence.CreatedBy.Mi = reader.GetSafeString(index++);
            consequence.CreatedBy.AvatarUrl = reader.GetSafeString(index++);

            consequence.ModifiedBy.Id = reader.GetSafeInt32(index++);
            consequence.ModifiedBy.Email = reader.GetSafeString(index++);
            consequence.ModifiedBy.FirstName = reader.GetSafeString(index++);
            consequence.ModifiedBy.LastName = reader.GetSafeString(index++);
            consequence.ModifiedBy.Mi = reader.GetSafeString(index++);
            consequence.ModifiedBy.AvatarUrl = reader.GetSafeString(index++);

            consequence.DateCreated = reader.GetSafeDateTime(index++);
            consequence.DateModified = reader.GetSafeDateTime(index++);

            return consequence;
        }

        private static void AddCommonParams(ConsequenceAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@ConsequenceTypeId", model.ConsequenceTypeId);
            col.AddWithValue("@ActorId", model.ActorId);
            col.AddWithValue("@ZoneId", model.ZoneId);
            col.AddWithValue("@CreatedBy", userId);
            col.AddWithValue("@ModifiedBy", userId);
        }
    }
}

using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain.Actors;
using Sabio.Models.Requests.Actors;
using Sabio.Services.Interfaces;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Sabio.Services
{
    public class ActorService : IActorService
    {
        IDataProvider _data = null;
        ILookUpService _lookUpService = null;

        public ActorService(IDataProvider data, ILookUpService lookUp)
        {
            _data = data;
            _lookUpService = lookUp;
        }
        public int AddActor(ActorsAddRequest request, int userId)
        {
            int id = 0;

            string procName = "[dbo].[Actors_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(request, col, userId);
                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);
            },
            returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;

                int.TryParse(oId.ToString(), out id);
            }
            );
            return id;
        }
        public List<Actor> GetAllActors()
        {
            List<Actor> list = null;

            string procName = "[dbo].[Actors_SelectAll]";
            _data.ExecuteCmd(procName, inputParamMapper: null,
               singleRecordMapper: delegate (IDataReader reader, short set)
               {
                   int startingIndex = 0;
                   Actor actor = MapActor(reader, ref startingIndex);

                   if (list == null)
                   {
                       list = new List<Actor>();
                   }
                   list.Add(actor);
               });

            return list;
        }

        public Paged<Actor> GetAllActorsPaginate(int pageIndex, int pageSize)
        {
            Paged<Actor> pagedList = null;
            List<Actor> list = null;
            int totalCount = 0;

            string procName = "[dbo].[Actors_Paginate_All]";
            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                Actor actor = MapActor(reader, ref startingIndex);

                if (totalCount == 0) totalCount = reader.GetSafeInt32(startingIndex);

                if (list == null)
                {
                    list = new List<Actor>();
                }
                list.Add(actor);
            });           
                if (list != null)
                {
                    pagedList = new Paged<Actor>(list, pageIndex, pageSize, totalCount);
                }
                return pagedList;            
        }

        public Actor GetActorById(int id)
        {
            Actor actor = null;

            string procName = "[dbo].[Actors_SelectById]";
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                actor = MapActor(reader, ref startingIndex);
            }
            );
            return actor;
        }
        public Paged<Actor> GetByCreator(int pageIndex, int pageSize, string creator)
        {
            Paged<Actor> pagedList = null;
            List<Actor> list = null;
            int totalCount = 0;

            string procName = "[dbo].[Actors_SelectByCreatedBy]";
            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
                col.AddWithValue("@CreatedBy", creator);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                Actor actor = MapActor(reader, ref startingIndex);

                if (totalCount == 0) totalCount = reader.GetSafeInt32(startingIndex);

                if (list == null)
                {
                    list = new List<Actor>();
                }
                list.Add(actor);
            });
            if (list != null)
            {
                pagedList = new Paged<Actor>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public void DeleteActor(int id, int userId)
        {
            string procName = "[dbo].[Actors_Delete]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
                col.AddWithValue("@ModifiedBy", userId);
            },
            returnParameters: null);
        }
        public void UpdateActor(ActorUpdateRequest update, int userId)
        {
            string procName = "[dbo].[Actors_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(update, col, userId);
                col.AddWithValue("@Id", update.Id);
            },
            returnParameters: null);
        }

        private Actor MapActor(IDataReader reader, ref int startingIndex)
        {
            Actor actor = new Actor();
            startingIndex = 0;

            actor.Id = reader.GetSafeInt32(startingIndex++);
            actor.Name = reader.GetSafeString(startingIndex++);
            actor.Description = reader.GetSafeString(startingIndex++);
            actor.ActorTypeId = _lookUpService.MapSingleLookUp(reader, ref startingIndex); // return Id and name from lookup 
            actor.StatusTypeId = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            actor.CreatedBy = reader.GetSafeString(startingIndex++);
            actor.ModifiedBy = reader.GetSafeString(startingIndex++);
            actor.DateCreated = reader.GetSafeDateTime(startingIndex++);
            actor.DateModified = reader.GetSafeDateTime(startingIndex++);

            return actor;
        }
        private static void AddCommonParams(ActorsAddRequest request, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@Name", request.Name);
            col.AddWithValue("@Description", request.Description);
            col.AddWithValue("@ActorTypeId", request.ActorTypeId);
            col.AddWithValue("@StatusTypeId", request.StatustypeId);
            col.AddWithValue("@CreatedBy", request.CreatedBy);
            col.AddWithValue("@ModifiedBy", userId);
        }
    }
}

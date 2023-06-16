using Sabio.Data.Providers;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Requests.Ratings;
using Sabio.Data;
using Sabio.Services.Interfaces;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Ratings;
using Sabio.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Reflection;
using System.Drawing.Printing;


namespace Sabio.Services
{
    public class RatingService : IRatingService
    {
        IDataProvider _data = null;
        ILookUpService _lookUpService = null;

        public RatingService(IDataProvider data, ILookUpService lookUpService)
        {
            _data = data;
            _lookUpService = lookUpService;
        }

        public int Add(RatingAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[Ratings_Insert]"; 
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@UserId", userId);
                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);          
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);
            },
            returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;
                int.TryParse(oId.ToString(), out id);

            });
            return id;
        }

        public Rating GetById(int id)
        {

            string procName = "[dbo].[Ratings_SelectById]";

            Rating rating = null;
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                rating = MapSingleRating(reader, ref startingIndex);
            });

            return rating;
        }

        public void Update(RatingUpdateRequest model, int userId) 
        {

            string procName = "[dbo].[Ratings_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@UserId", userId);
                col.AddWithValue("@Id", model.Id);
            },
            returnParameters: null);

        }

        public Paged<Rating> SelectAllPaginated(int pageIndex, int pageSize)
        {
            Paged<Rating> pagedList = null;
            List<Rating> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[Ratings_SelectAll_Paginated]",
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },

                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Rating rating = MapSingleRating(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex);
                    }


                    if (list == null)
                    {
                        list = new List<Rating>();
                    }

                    list.Add(rating);
                }

            );
            if (list != null)
            {
                pagedList = new Paged<Rating>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        public Paged<Rating> GetByCreatedBy(int userId, int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Ratings_Select_ByCreatedBy]";
            int totalCount = 0;
            Paged<Rating> pagedList = null;
            List<Rating> list = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                    col.AddWithValue("@UserId", userId);
                }, singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Rating ad = MapSingleRating(reader, ref startingIndex);

                    if (totalCount == 0)
                        totalCount = reader.GetSafeInt32(startingIndex);

                    if (list == null)
                        list = new List<Rating>();

                    list.Add(ad);
                });

            if (list != null)
                pagedList = new Paged<Rating>(list, pageIndex, pageSize, totalCount);

            return pagedList;
        }

        public void Delete(int id, int userId)
        {

            string procName = "[dbo].[Ratings_DeleteById]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
                col.AddWithValue("@ModifiedBy", userId);
            },
            returnParameters: null);

        }

        public List<RatingBase> GetRatingsAverage(int EntityId, int EntityTypeId)
        {
            List<RatingBase> list = null;

            string procName = "[dbo].[Ratings_Average]";
            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@EntityId", EntityId);
                col.AddWithValue("@EntityTypeId", EntityTypeId);
                
            },
               singleRecordMapper: delegate (IDataReader reader, short set)
               {
                   int startingIndex = 0;
                   RatingBase rating = MapRatingAverage(reader, ref startingIndex);

                   if (list == null)
                   {
                       list = new List<RatingBase>();
                   }
                   list.Add(rating);
               });

            return list;
        }

        private static void AddCommonParams(RatingAddRequest model, SqlParameterCollection col) 
        {
            col.AddWithValue("@Rating", model.RatingValue);
            col.AddWithValue("@CommentId", model.CommentId); 
            col.AddWithValue("@EntityTypeId", model.EntityTypeId);
            col.AddWithValue("@EntityId", model.EntityId);
           
        }

        private Rating MapSingleRating(IDataReader reader, ref int startingIndex)
        {
            Rating aRating = new Rating();

            aRating.Id = reader.GetSafeInt32(startingIndex++);
            aRating.RatingValue = reader.GetSafeByte(startingIndex++);
            aRating.CommentId = reader.GetSafeInt32(startingIndex++);

            aRating.EntityType = _lookUpService.MapSingleLookUp(reader, ref startingIndex);  

            aRating.EntityId = reader.GetSafeInt32(startingIndex++);
            aRating.CreatedBy = reader.GetSafeInt32(startingIndex++);
            
            aRating.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aRating.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            aRating.DateModified = reader.GetSafeDateTime(startingIndex++);
            aRating.IsDeleted = reader.GetSafeBool(startingIndex++);

            return aRating;
        }
        private RatingBase MapRatingAverage(IDataReader reader, ref int startingIndex)
        {
            RatingBase aRating = new RatingBase();
            aRating.EntityType = new LookUp();


            aRating.EntityId = reader.GetSafeInt32(startingIndex++);
            aRating.EntityType.Id = reader.GetSafeInt32(startingIndex++);
            aRating.RatingAverage = reader.GetSafeInt32(startingIndex++);
            aRating.TotalRatings = reader.GetSafeInt32(startingIndex++);


            return aRating;
        }
    }
}

using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models;
using Sabio.Models.Requests;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Data;
using Google.Apis.AnalyticsReporting.v4.Data;
using Sabio.Models.Domain.Users;
using Sabio.Services.Interfaces;

namespace Sabio.Services
{
    public class NewsletterService : INewsletterService
    {
        IDataProvider _data = null;
        IMapUser _mapUser = null;
        public NewsletterService(IDataProvider data, IMapUser mapUser)

        {
            _data = data;
            _mapUser = mapUser;
        }

        public int Add(NewsletterAddRequest addModel, int Id)
        {
            string procName = "[dbo].[Newsletters_Insert]";
            int id = 0;

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(addModel, col);
                    col.AddWithValue("@CreatedBy", Id);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCol)
            {
                object idObj = returnCol["@Id"].Value;

                int.TryParse(idObj.ToString(), out id);
            });
            return id;
        }

        public void Update(NewsletterUpdateRequest updateModel)
        {
            string procName = "[dbo].[Newsletters_Update]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(updateModel, col);
                    col.AddWithValue("@Id", updateModel.Id);

                },
                returnParameters: null);
        }

        public void DeleteById(int Id)
        {
            string procName = "[dbo].[Newsletters_DeleteById]";

            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", Id);


            }, null);
        }

        public Paged<Newsletter> GetAllPaged(int pageIndex, int pageSize)
        {
            Paged<Newsletter> pagedResult = null;
            List<Newsletter> list = null;
            int totalCount = 0;
            string procName = "[dbo].[Newsletters_SelectAll_Paged]";
            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                }
                , singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Newsletter model = MapSingleNewsletters(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (list == null)
                    {
                        list = new List<Newsletter>();
                    }
                    list.Add(model);
                });
            if (list != null)
            {
                pagedResult = new Paged<Newsletter>(list, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }

        public Paged<Newsletter> GetSearchPaged(int pageIndex, int pageSize, string query)
        {
            string procName = "[dbo].[Newsletters_Search_Paged]";
            Paged<Newsletter> pagedList = null;
            List<Newsletter> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
                delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@PageIndex", pageIndex);
                    paramCollection.AddWithValue("@PageSize", pageSize);
                    paramCollection.AddWithValue("@Query", query);
                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    Newsletter aNewsletter = MapSingleNewsletters(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(startingIndex++);

                    if (list == null)
                    {
                        list = new List<Newsletter>();
                    }

                    list.Add(aNewsletter);
                });

            if (list != null)
            {
                pagedList = new Paged<Newsletter>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;

        }

        private Newsletter MapSingleNewsletters(IDataReader reader, ref int startingIndex)
        {
            Newsletter newsletters = new Newsletter();
            newsletters.Author = new BaseUser();

            newsletters.Id = reader.GetSafeInt32(startingIndex++);
            newsletters.DateModified = reader.GetSafeDateTime(startingIndex++);
            newsletters.TemplateId = reader.GetSafeInt32(startingIndex++);
            newsletters.Name = reader.GetSafeString(startingIndex++);
            newsletters.CoverPhoto = reader.GetSafeString(startingIndex++);
            newsletters.DateToPublish = reader.GetSafeDateTime(startingIndex++);
            newsletters.DateToExpire = reader.GetSafeDateTime(startingIndex++);
            newsletters.DateCreated = reader.GetSafeDateTime(startingIndex++);
            newsletters.Author = _mapUser.MapSingleUser(reader, ref startingIndex);
            return newsletters;
        }

        private static void AddCommonParams(NewsletterAddRequest updateModel, SqlParameterCollection col)
        {
            col.AddWithValue("@TemplateId", updateModel.TemplateId);
            col.AddWithValue("@Name", updateModel.Name);
            col.AddWithValue("@CoverPhoto", updateModel.CoverPhoto);
            
           
        }
    }

  

}

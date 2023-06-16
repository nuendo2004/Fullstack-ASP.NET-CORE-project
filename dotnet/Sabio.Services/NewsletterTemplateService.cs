using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Services.Interfaces;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;


namespace Sabio.Services
{
    public class NewsletterTemplateService : INewsletterTemplateService
    {

        IDataProvider _data = null;

        public NewsletterTemplateService(IDataProvider data)
        {
            _data = data;
        }

        public void DeleteById(int id)
        {
            string procName = "[dbo].[NewsletterTemplates_DeleteById]";

            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, null);
        }

        public void Update(NewsletterTemplateUpdateRequest updateModel, int id, int userId)
        {
            string procName = "[dbo].[NewsletterTemplates_Update]";

            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
                col.AddWithValue("@ModifiedBy", userId);
                AddCommonParams(updateModel, col);
            }, null);
        }

        public int Insert(NewsletterTemplateAddRequest addModel, int userId)
        {
            string procName = "[dbo].[NewsletterTemplates_Insert]";
            int id = 0;

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(addModel, col);
                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);
                col.AddWithValue("@CreatedBy", userId);
            }, returnParameters: delegate (SqlParameterCollection returnCol)
            {
                object idObj = returnCol["@Id"].Value;

                int.TryParse(idObj.ToString(), out id);
            });
            return id;
        }

        public Paged<NewsletterTemplate> SelectAll(int pageIndex, int pageSize)
        {
            Paged<NewsletterTemplate> pagedResult = null;
            List<NewsletterTemplate> list = null;
            int totalCount = 0;
            string procName = "[dbo].[NewsletterTemplates_SelectAll]";
            _data.ExecuteCmd(procName,
              inputParamMapper: delegate (SqlParameterCollection parameterCollection)
              {
                  parameterCollection.AddWithValue("@PageIndex", pageIndex);
                  parameterCollection.AddWithValue("@PageSize", pageSize);
              }
              , singleRecordMapper: delegate (IDataReader reader, short set)
              {
                  int startingIndex = 0;
                  NewsletterTemplate model = MapSingleNewsletterTemplate(reader, ref startingIndex);
                  if (totalCount == 0)
                  {
                      totalCount = reader.GetSafeInt32(startingIndex++);
                  }
                  if (list == null)
                  {
                      list = new List<NewsletterTemplate>();
                  }
                  list.Add(model);
              });
            if (list != null)
            {
                pagedResult = new Paged<NewsletterTemplate>(list, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }

        private NewsletterTemplate MapSingleNewsletterTemplate(IDataReader reader, ref int startingIndex)
        {
            NewsletterTemplate newsletterTemplate = new NewsletterTemplate();
            newsletterTemplate.Id = reader.GetSafeInt32(startingIndex++);
            newsletterTemplate.Name = reader.GetSafeString(startingIndex++);
            newsletterTemplate.Description = reader.GetSafeString(startingIndex++);
            newsletterTemplate.Content = reader.GetSafeString(startingIndex++);
            newsletterTemplate.PrimaryImage = reader.GetSafeString(startingIndex++);
            newsletterTemplate.DateCreated = reader.GetSafeDateTime(startingIndex++);
            newsletterTemplate.DateModified = reader.GetSafeDateTime(startingIndex++);
            newsletterTemplate.CreatedBy = reader.GetSafeInt32(startingIndex++);
            newsletterTemplate.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            return newsletterTemplate;
        }
        
        private static void AddCommonParams(NewsletterTemplateAddRequest updateModel, SqlParameterCollection col)
        {
            col.AddWithValue("@Name", updateModel.Name);
            col.AddWithValue("@Description", updateModel.Description);
            col.AddWithValue("@Content", updateModel.Content);
            col.AddWithValue("@PrimaryImage", updateModel.PrimaryImage);   
        }
    }
}

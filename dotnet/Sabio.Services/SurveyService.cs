using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Data;
using Sabio.Models;
using Sabio.Models.Requests.Surveys;
using System.Collections;
using Sabio.Models.Domain.Surveys;
using Sabio.Models.Domain.Surveys.Details;

namespace Sabio.Services
{
    public class SurveyService : ISurveyService
    {
        IDataProvider _data = null;
        IMapUser _mapUser = null;

        public SurveyService(IDataProvider data, IMapUser mapUser)
        {
            _data = data;
            _mapUser = mapUser;
        }
        
        public Survey GetSurvey(int id)
        {
            string procName = "[dbo].[Surveys_Select_ById]";
            Survey survey = null;
            
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            },
            delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                survey = MapSingleSurvey(reader, ref startingIndex);
            });
            
            return survey;
        }
        
        public Paged<Survey> GetPaginate(int pageIndex, int pageSize)
        {
            Paged<Survey> pagedList = null;
            List<Survey> list = null;
            int totalCount = 0;
            string procName = "[dbo].[Surveys_SelectAll]";
            
            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@PageIndex", pageIndex);
                    collection.AddWithValue("@PageSize", pageSize);
                }, singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    
                    Survey survey = MapSingleSurvey(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (list == null)
                    {
                        list = new List<Survey>();
                    }

                    list.Add(survey);
                });
            
            if (list != null)
            {
                pagedList = new Paged<Survey>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        
        public Paged<Survey> GetCreatedBy(int pageIndex, int pageSize, int userId)
        {
            Paged<Survey> pagedList = null;
            List<Survey> list = null;
            int totalCount = 0;
            string procName = "[dbo].[Surveys_ByCreatedBy]";
            
            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@PageIndex", pageIndex);
                    collection.AddWithValue("@PageSize", pageSize);
                    collection.AddWithValue("@Id", userId);
                }, singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    
                    Survey survey = MapSingleSurvey(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (list == null)
                    {
                        list = new List<Survey>();
                    }
                    
                    list.Add(survey);
                });
            
            if (list != null)
            {
                pagedList = new Paged<Survey>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        
        public int Add(SurveyAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[Surveys_Insert]";
            
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    AddCommonParams(model, collection);
                    collection.AddWithValue("@CreatedBy", userId);
                    collection.AddWithValue("@ModifiedBy", userId);
                    
                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    
                    collection.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object outputId = returnCollection["@Id"].Value;
                    Int32.TryParse(outputId.ToString(), out id);
                });
            
            return id;
            
        }
        
        public void Update(SurveyUpdateRequest model, int userId)
        {
            {
                string procName = "[dbo].[Surveys_Update]";
                _data.ExecuteNonQuery(procName,
                    inputParamMapper: delegate (SqlParameterCollection collection)
                    {
                        AddCommonParams(model, collection);
                        collection.AddWithValue("@Id", model.Id);
                        collection.AddWithValue("@ModifiedBy", userId);
                    },
                    returnParameters: null);
            }
        }
        
        public void Delete(int id, int userId)
        {
            string procName = "[dbo].[Surveys_Delete_ById]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@Id", id);
                    collection.AddWithValue("@ModifiedBy", userId);
                },
                returnParameters: null);
        }
        
        public Paged<Survey> GetSearchPaginate(SurveySearchRequest model)
        {
            Paged<Survey> pagedList = null;
            List<Survey> list = null;
            DataTable statusTypes = null;
            DataTable surveyTypes = null;
            int totalCount = 0;
            string procName = "[dbo].[Surveys_Search]";
            if (model.StatusTypes != null)
            {
                statusTypes = CreateStatusTypesDataTable(model.StatusTypes);
            }
            if (model.SurveyTypes != null)
            {
                surveyTypes = CreateSurveyTypesDataTable(model.SurveyTypes);
            }
            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@PageIndex", model.PageIndex);
                    collection.AddWithValue("@PageSize", model.PageSize);
                    collection.AddWithValue("@Query", model.Query);
                    collection.AddWithValue("@StatusTypes", statusTypes);
                    collection.AddWithValue("@SurveyTypes", surveyTypes);
                    
                }, singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    
                    Survey survey = MapSingleSurvey(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (list == null)
                    {
                        list = new List<Survey>();
                    }
                    
                    list.Add(survey);
                });
            
            if (list != null)
            {
                pagedList = new Paged<Survey>(list, model.PageIndex, model.PageSize, totalCount);
            }
            return pagedList;
        }

        public SurveyDetails GetSurveyDetails(int id)
        {
            string procName = "[dbo].[Survey_SelectById_Details]";
            SurveyDetails survey = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection collection)
            {
                collection.AddWithValue("@Id", id);
            },
                delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    survey = MapSingleSurveyDetailed(reader, ref startingIndex);
                }
            );

            return survey;
        }

        public Paged<SurveyDetails> GetSurveyDetailsPaginate(int pageIndex, int pageSize)
        {
            Paged<SurveyDetails> pagedList = null;
            List<SurveyDetails> list = null;
            int totalCount = 0;
            string procName = "[dbo].[Survey_SelectAll_Details]";

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    collection.AddWithValue("@PageIndex", pageIndex);
                    collection.AddWithValue("@PageSize", pageSize);
                }, singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;

                    SurveyDetails survey = MapSingleSurveyDetailed(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (list == null)
                    {
                        list = new List<SurveyDetails>();
                    }

                    list.Add(survey);
                });

            if (list != null)
            {
                pagedList = new Paged<SurveyDetails>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        private Survey MapSingleSurvey(IDataReader reader, ref int startingIndex)
        {
            Survey survey = new Survey();
            survey.SurveyStatus = new LookUp();
            survey.SurveyType = new LookUp();
            
            survey.Id = reader.GetSafeInt32(startingIndex++);
            survey.Name = reader.GetSafeString(startingIndex++);
            survey.Description = reader.GetSafeString(startingIndex++);
            survey.SurveyStatus.Id = reader.GetSafeInt32(startingIndex++);
            survey.SurveyStatus.Name = reader.GetSafeString(startingIndex++);
            survey.SurveyType.Id = reader.GetSafeInt32(startingIndex++);
            survey.SurveyType.Name = reader.GetSafeString(startingIndex++);
            survey.DateCreated = reader.GetSafeDateTime(startingIndex++);
            survey.DateModified = reader.GetSafeDateTime(startingIndex++);
            survey.CreatedBy = reader.GetSafeInt32(startingIndex++);
            survey.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            
            return survey;
        }

        private SurveyDetails MapSingleSurveyDetailed(IDataReader reader, ref int startingIndex)
        {
            SurveyDetails survey = new SurveyDetails();
            survey.SurveyStatus = new LookUp();
            survey.SurveyType = new LookUp();

            survey.Id = reader.GetSafeInt32(startingIndex++);
            survey.Name = reader.GetSafeString(startingIndex++);
            survey.Description = reader.GetSafeString(startingIndex++);
            survey.SurveyStatus.Id = reader.GetSafeInt32(startingIndex++);
            survey.SurveyStatus.Name = reader.GetSafeString(startingIndex++);
            survey.SurveyType.Id = reader.GetSafeInt32(startingIndex++);
            survey.SurveyType.Name = reader.GetSafeString(startingIndex++);
            survey.CreatedBy = _mapUser.MapSingleUser(reader, ref startingIndex);
            survey.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            survey.DateCreated = reader.GetSafeDateTime(startingIndex++);
            survey.DateModified = reader.GetSafeDateTime(startingIndex++);
            survey.Questions = reader.DeserializeObject<List<SurveyDetailsQuestion>>(startingIndex++);

            return survey;
        }

        private static void AddCommonParams(SurveyAddRequest model, SqlParameterCollection collection)
        {
            collection.AddWithValue("@Name", model.Name);
            collection.AddWithValue("@Description", model.Description);
            collection.AddWithValue("@StatusId", model.StatusId);
            collection.AddWithValue("@SurveyTypeId", model.SurveyTypeId);
        }
        
        private DataTable CreateStatusTypesDataTable(List<int> statusIds)
        {
            DataTable statusTypes = new DataTable();
            statusTypes.Columns.Add("Id", typeof(int));
            
            foreach (int statusId in statusIds)
            { 
                statusTypes.Rows.Add(statusId);
            }
            
            return statusTypes;
        }
    
        private DataTable CreateSurveyTypesDataTable(List<int> typeIds)
        {
            DataTable surveyTypes = new DataTable();
            surveyTypes.Columns.Add("Id", typeof(int));
            
            foreach (int typeId in typeIds)
            {
                surveyTypes.Rows.Add(typeId);
            }
            
            return surveyTypes;
        }
    
    }
}
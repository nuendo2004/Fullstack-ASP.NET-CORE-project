using Sabio.Data.Providers;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Requests.SurveyQuestions;
using Stripe;
using Sabio.Data;
using Sabio.Models;
using Sabio.Models.Domain.Users;
using Sabio.Services.Interfaces;
using Google.Apis.AnalyticsReporting.v4.Data;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Surveys.Questions;

namespace Sabio.Services
{
    public class SurveyQuestionService : ISurveyQuestionService
    {

        IDataProvider _data = null;
        IMapUser _mapUser = null;

        public SurveyQuestionService(IDataProvider data, IMapUser mapUser)
        {
            _data = data;
            _mapUser = mapUser;
        }

        public int AddQuestion(SurveyQuestionAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[SurveyQuestions_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@CreatedBy", userId);
                col.AddWithValue("@ModifiedBy", userId);
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

        public void UpdateQuestion(SurveyQuestionUpdateRequest model, int userId)
        {
            string procName = "[dbo].[SurveyQuestions_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@Id", model.Id);
                col.AddWithValue("@CreatedBy", userId);
                col.AddWithValue("@ModifiedBy", userId);
            },
            returnParameters: null);
        }

        public void DeleteQuestion(int id)
        {
            string procName = "[dbo].[SurveyQuestions_Delete_ById]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            },
              returnParameters: null);
        }

        public SurveyQuestion GetSurveyQuestionById(int id)
        {
            string procName = "[dbo].[SurveyQuestions_Select_ById]";

            SurveyQuestion aQuestion = null;

            _data.ExecuteCmd(
                procName,
                delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", id);
                },
                delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    aQuestion = MapSingleSurveyQuestion(reader, ref startingIndex);
                }
            );
            return aQuestion;
        }

        public Paged<SurveyQuestion> Pagination(int pageIndex, int pageSize)
        {
            Paged<SurveyQuestion> pagedList = null;
            List<SurveyQuestion> list = null;
            int totalCount = 0;



            _data.ExecuteCmd(
                "dbo.SurveyQuestions_SelectAll",
                (param) =>

                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },

                (reader, recordSetIndex) =>

                {

                    int startingIndex = 0;

                    SurveyQuestion aQuestion = MapSingleSurveyQuestion(reader, ref startingIndex);


                    if (totalCount == 0)
                    {

                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)

                    {
                        list = new List<SurveyQuestion>();
                    }

                    list.Add(aQuestion);

                }
            );
            if (list != null)
            {
                pagedList = new Paged<SurveyQuestion>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;

        }

        public Paged<SurveyQuestion> GetByCreator(int creator, int pageIndex, int pageSize)
        {
            Paged<SurveyQuestion> pagedList = null;
            List<SurveyQuestion> list = null;
            int totalCount = 0;

            string procName = "[dbo].[SurveyQuestions_Select_ByCreatedBy]";
            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {

                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
                col.AddWithValue("@CreatedBy", creator);

            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                SurveyQuestion aQuestion = MapSingleSurveyQuestion(reader, ref startingIndex);

                if (totalCount == 0) totalCount = reader.GetSafeInt32(startingIndex);

                if (list == null)
                {
                    list = new List<SurveyQuestion>();
                }
                list.Add(aQuestion);
            });
            if (list != null)
            {
                pagedList = new Paged<SurveyQuestion>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        private SurveyQuestion MapSingleSurveyQuestion(IDataReader reader, ref int startingIndex)
        {

            SurveyQuestion aQuestion = new SurveyQuestion();
            aQuestion.QuestionTypeId = new LookUp();
            aQuestion.StatusId = new LookUp();


            aQuestion.Id = reader.GetSafeInt32(startingIndex++);
            aQuestion.CreatedBy = _mapUser.MapSingleUser(reader, ref startingIndex);
            aQuestion.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            aQuestion.Question = reader.GetSafeString(startingIndex++);
            aQuestion.HelpText = reader.GetSafeString(startingIndex++);
            aQuestion.IsRequired = reader.GetSafeBool(startingIndex++);
            aQuestion.IsMultipleAllowed = reader.GetSafeBool(startingIndex++);
            aQuestion.QuestionTypeId.Id = reader.GetSafeInt32(startingIndex++);
            aQuestion.QuestionTypeId.Name = reader.GetSafeString(startingIndex++);
            aQuestion.SurveyId = reader.GetSafeInt32(startingIndex++);
            aQuestion.StatusId.Id = reader.GetSafeInt32(startingIndex++);
            aQuestion.StatusId.Name = reader.GetSafeString(startingIndex++);
            aQuestion.SortOrder = reader.GetSafeInt32(startingIndex++);
            aQuestion.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aQuestion.DateModified = reader.GetSafeDateTime(startingIndex++);

            return aQuestion;
        }

        private static void AddCommonParams(SurveyQuestionAddRequest model, SqlParameterCollection col)
        {

            col.AddWithValue("@Question", model.Question);
            col.AddWithValue("@HelpText", model.HelpText);
            col.AddWithValue("@IsRequired", model.IsRequired);
            col.AddWithValue("@IsMultipleAllowed", model.IsMultipleAllowed);
            col.AddWithValue("@QuestionTypeId", model.QuestionTypeId);
            col.AddWithValue("@SurveyId", model.SurveyId);
            col.AddWithValue("@StatusId", model.StatusId);
            col.AddWithValue("@SortOrder", model.SortOrder);
        }

    }
}

using Sabio.Data.Providers;
using Sabio.Models.Domain.Surveys.Instances;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Data;
using Sabio.Models;
using Sabio.Models.Requests.SurveysInstancesRequests;
using Sabio.Models.Requests.SurveyAnswers;
using Sabio.Services.Interfaces;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Surveys.Answers;
using System.Reflection;

namespace Sabio.Services
{
    public class SurveyAnswerService : ISurveyAnswerService
    {
        IDataProvider _data = null;

        public SurveyAnswerService(IDataProvider data)
        {
            _data = data;
        }

        public SurveyAnswer Get(int id)
        {
            string procName = "[dbo].[SurveyAnswers_Select_ByIdV2]";

            SurveyAnswer answer = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                answer = MapSingleSurveyAnswer(reader, ref startingIndex);
            });

            return answer;
        }

        public SurveyAnswer GetBySurveyInstanceId(int id)
        {
            string procName = "[dbo].[SurveyAnswers_Select_BySurveyInstanceIdV2]";

            SurveyAnswer answer = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@InstanceId", id);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                answer = MapSingleSurveyAnswer(reader, ref startingIndex);
            });

            return answer;
        }

        public Paged<SurveyAnswer> GetAll(int pageIndex, int pageSize)
        {
            Paged<SurveyAnswer> pagedList = null;

            List<SurveyAnswer> list = null;

            int totalCount = 0;

            string procName = "[dbo].[SurveyAnswers_SelectAllV2]";

            _data.ExecuteCmd(procName, (param) =>
            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);

            }, (reader, recordSetIndex) =>
            {
                int startingIndex = 0;
                SurveyAnswer answer = MapSingleSurveyAnswer(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }

                if (list == null)
                {
                    list = new List<SurveyAnswer>();
                }
                list.Add(answer);
            });
            if (list != null)
            {
                pagedList = new Paged<SurveyAnswer>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        public Paged<SurveyAnswer> GetByCreatedBy(int pageIndex, int pageSize, int userId)
        {
            Paged<SurveyAnswer> pagedList = null;

            List<SurveyAnswer> list = null;

            int totalCount = 0;

            string procName = "[dbo].[SurveyAnswers_Select_ByCreatedByV2]";

            _data.ExecuteCmd(procName, (param) =>
            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
                param.AddWithValue("@CreatedBy", userId);

            }, (reader, recordSetIndex) =>
            {
                int startingIndex = 0;
                SurveyAnswer answer = MapSingleSurveyAnswer(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }

                if (list == null)
                {
                    list = new List<SurveyAnswer>();
                }
                list.Add(answer);
            });
            if (list != null)
            {
                pagedList = new Paged<SurveyAnswer>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        public Paged<SurveyAnswer> GetBySurveyId(int pageIndex, int pageSize, int surveyId)
        {
            Paged<SurveyAnswer> pagedList = null;

            List<SurveyAnswer> list = null;

            int totalCount = 0;

            string procName = "[dbo].[SurveyAnswers_Select_BySurveyIdV2]";

            _data.ExecuteCmd(procName, (param) =>
            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
                param.AddWithValue("@SurveyId", surveyId);

            }, (reader, recordSetIndex) =>
            {
                int startingIndex = 0;
                SurveyAnswer answer = MapSingleSurveyAnswer(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }

                if (list == null)
                {
                    list = new List<SurveyAnswer>();
                }
                list.Add(answer);
            });
            if (list != null)
            {
                pagedList = new Paged<SurveyAnswer>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        public int Add(List<SurveyAnswerAddRequest> models, int userId)
        {
            int id = 0;
            DataTable dt = new DataTable();
            dt.Columns.Add("SurveyId", typeof(int));
            dt.Columns.Add("QuestionId", typeof(int));
            dt.Columns.Add("AnswerOptionId", typeof(int));
            dt.Columns.Add("Answer", typeof(string));
            dt.Columns.Add("AnswerNumber", typeof(int));
            dt.Columns.Add("UserId", typeof(int));

            foreach (var model in models)
            {
                DataRow dr = dt.NewRow();
                dr["SurveyId"] = model.SurveyId;
                dr["QuestionId"] = model.QuestionId;
                if (model.AnswerOptionId != null)
                {
                    dr["AnswerOptionId"] = model.AnswerOptionId;
                }
                else
                {
                    dr["AnswerOptionId"] = DBNull.Value;
                }
                if (model.Answer != null)
                {
                    dr["Answer"] = model.Answer;
                }
                else
                {
                    dr["Answer"] = DBNull.Value;
                }
                if (model.AnswerNumber != null)
                {
                    dr["AnswerNumber"] = model.AnswerNumber;
                }
                else
                {
                    dr["AnswerNumber"] = DBNull.Value;
                }
                dr["UserId"] = userId;
                dt.Rows.Add(dr);
            }

            string procName = "[dbo].[SurveyAnswers_Batch_Insert]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@BatchInsertSurveyAnswers", dt);
                

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);

                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);

            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;

                int.TryParse(oId.ToString(), out id);

            });

            return id;
        }

        public void Update(SurveyAnswerUpdateRequest model, int userId)
        {
            string procName = "[dbo].[SurveyAnswers_Update]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);

                col.AddWithValue("@Id", model.Id);
                col.AddWithValue("@UserId", userId);
            },
            returnParameters: null);
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[SurveyAnswers_Delete_ById]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection collection)
            {
                collection.AddWithValue("@Id", id);
            },
            returnParameters: null);
        }

        private static SurveyAnswer MapSingleSurveyAnswer(IDataReader reader, ref int startingIndex)
        {
            SurveyAnswer anAnswer = new SurveyAnswer();
            anAnswer.Status = new LookUp();
            anAnswer.SurveyType = new LookUp();

            anAnswer.Id = reader.GetSafeInt32(startingIndex++);
            anAnswer.InstanceId = reader.GetSafeInt32(startingIndex++);
            anAnswer.SurveyId = reader.GetSafeInt32(startingIndex++);
            anAnswer.SurveyName = reader.GetSafeString(startingIndex++);
            anAnswer.SurveyDescription = reader.GetSafeString(startingIndex++);
            anAnswer.Status.Id = reader.GetSafeInt32(startingIndex++);
            anAnswer.Status.Name = reader.GetSafeString(startingIndex++);
            anAnswer.SurveyType.Id = reader.GetSafeInt32(startingIndex++);
            anAnswer.SurveyType.Name = reader.GetSafeString(startingIndex++);
            anAnswer.QuestionDetails = reader.DeserializeObject<List<SurveyAnswerQuestion>>(startingIndex++);
            anAnswer.AnswerOptionDetails = reader.DeserializeObject<List<Option>>(startingIndex++);
            anAnswer.AnswerNumber = reader.GetSafeInt32(startingIndex++);
            anAnswer.Answer = reader.GetSafeString(startingIndex++);
            anAnswer.UserId = reader.GetSafeInt32(startingIndex++);
            anAnswer.DateCreated = reader.GetSafeDateTime(startingIndex++);
            anAnswer.DateModified = reader.GetSafeDateTime(startingIndex++);

            return anAnswer;
        }
        private static void AddCommonParams(SurveyAnswerAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@SurveyId", model.SurveyId);
            col.AddWithValue("@QuestionId", model.QuestionId);
            col.AddWithValue("@AnswerOptionId", model.AnswerOptionId);
            col.AddWithValue("@Answer", model.Answer);
            col.AddWithValue("@AnswerNumber", model.AnswerNumber);
        }
    }
}
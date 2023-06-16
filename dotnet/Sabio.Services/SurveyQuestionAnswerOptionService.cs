using Sabio.Data.Providers;
using Sabio.Models.Requests.SurveyQuestions;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.SurveyQuestionAnswerOptions;
using Sabio.Data;
using Sabio.Models;
using Sabio.Services.Interfaces;
using Sabio.Models.Domain.Surveys.Questions;
using Amazon.Runtime.Internal;

namespace Sabio.Services
{
    public class SurveyQuestionAnswerOptionService : ISurveyQuestionAnswerOptionService
    {

        IDataProvider _data = null;
        IMapUser _mapUser = null;
        public SurveyQuestionAnswerOptionService(IDataProvider data, IMapUser mapUser)
        {
            _data = data;
            _mapUser = mapUser;
        }

        public int AddSurveyOption(List<SurveyQuestionAnswerOptionAddRequestItem> model, int userId)
        {
            int id = 0;
            DataTable myParamValue = MapAnswerOptionsToTable(model);
            string procName = "[dbo].[SurveyQuestionAnswerOptions_Batch_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
               
                AddCommonParams(myParamValue, col);
          
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

    

        public void DeleteSurveyOption(int id)
        {
            string procName = "[dbo].[SurveyQuestionAnswerOptions_Delete_ById]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            },
             returnParameters: null);
        }

        public void UpdateSurveyOption(List<SurveyQuestionAnswerOptionAddRequestItem> model, int userId)
        {
            DataTable myParamValue = MapAnswerOptionsToTable(model);
            string procName = "[dbo].[SurveyQuestionAnswerOptions_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(myParamValue, col);
            },
            returnParameters: null);
        }

        public SurveyQuestionAnswerOption GetSurveyOptionById(int id)
        {
            string procName = "[dbo].[SurveyQuestionAnswerOptions_Select_ById]";

            SurveyQuestionAnswerOption anOption = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);


            }, delegate (IDataReader reader, short set)
            {

                int startingIndex = 0;
                anOption = MapSingleSurveyQuestionAnswerOption(reader, ref startingIndex);
            }
            );


            return anOption;
        }

        public Paged<SurveyQuestionAnswerOption> Pagination(int pageIndex, int pageSize)
        {
            Paged<SurveyQuestionAnswerOption> pagedList = null;
            List<SurveyQuestionAnswerOption> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "dbo.SurveyQuestionAnswerOptions_SelectAll",
                (param) =>

                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },

                (reader, recordSetIndex) =>

                {

                    int startingIndex = 0;

                    SurveyQuestionAnswerOption anOption = MapSingleSurveyQuestionAnswerOption(reader, ref startingIndex);


                    if (totalCount == 0)
                    {

                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)

                    {
                        list = new List<SurveyQuestionAnswerOption>();
                    }

                    list.Add(anOption);

                }
            );
            if (list != null)
            {
                pagedList = new Paged<SurveyQuestionAnswerOption>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;

        }

        public Paged<SurveyQuestionAnswerOption> GetByCreator(int creator, int pageIndex, int pageSize)
        {
            Paged<SurveyQuestionAnswerOption> pagedList = null;
            List<SurveyQuestionAnswerOption> list = null;
            int totalCount = 0;

            string procName = "[dbo].[SurveyQuestionAnswerOptions_Select_ByCreatedBy]";
            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@CreatedBy", creator);
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
               
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                SurveyQuestionAnswerOption anOption = MapSingleSurveyQuestionAnswerOption(reader, ref startingIndex);

                if (totalCount == 0) totalCount = reader.GetSafeInt32(startingIndex);

                if (list == null)
                {
                    list = new List<SurveyQuestionAnswerOption>();
                }
                list.Add(anOption);
            });
            if (list != null)
            {
                pagedList = new Paged<SurveyQuestionAnswerOption>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        private SurveyQuestionAnswerOption MapSingleSurveyQuestionAnswerOption(IDataReader reader, ref int startingIndex)
        {

            SurveyQuestionAnswerOption anOption = new SurveyQuestionAnswerOption();

            anOption.Id = reader.GetSafeInt32(startingIndex++);
            anOption.CreatedBy = _mapUser.MapSingleUser(reader, ref startingIndex);
            anOption.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            anOption.QuestionId = reader.GetSafeInt32(startingIndex++);
            anOption.Text = reader.GetSafeString(startingIndex++);
            anOption.Value = reader.GetSafeString(startingIndex++);
            anOption.AdditionalInfo = reader.GetSafeString(startingIndex++);
            anOption.DateCreated = reader.GetSafeDateTime(startingIndex++);
            anOption.DateModified = reader.GetSafeDateTime(startingIndex++);

            return anOption;
        }

        private DataTable MapAnswerOptionsToTable(List<SurveyQuestionAnswerOptionAddRequestItem> answerOptionsToMap)
        {
            DataTable dt = new DataTable();

            if (answerOptionsToMap != null)
            {
                dt.Columns.Add("QuestionId", typeof(int));
                dt.Columns.Add("Text", typeof(string));
                dt.Columns.Add("Value", typeof(string));
                dt.Columns.Add("AdditionalInfo", typeof(string));
                dt.Columns.Add("CreatedBy", typeof(int));
                dt.Columns.Add("ModifiedBy", typeof(int));

                foreach (SurveyQuestionAnswerOptionAddRequestItem item in answerOptionsToMap)
                {
                    DataRow dr = dt.NewRow();
                    int startingIndex = 0;

                    dr.SetField(startingIndex++, item.QuestionId);
                    dr.SetField(startingIndex++, item.Text);
                    dr.SetField(startingIndex++, item.Value ?? string.Empty);
                    dr.SetField(startingIndex++, item.AdditionalInfo ?? string.Empty);
                    dr.SetField(startingIndex++, item.CreatedBy);
                    dr.SetField(startingIndex++, item.ModifiedBy);

                    dt.Rows.Add(dr);
                }
            }
            return dt;
        }

        private static void AddCommonParams(DataTable myParamValue, SqlParameterCollection col)
        {
            col.AddWithValue("@BatchSurveyQuestionAnswerOptions", myParamValue);
        }
    }
}

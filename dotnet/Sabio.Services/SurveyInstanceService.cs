using Sabio.Data.Providers;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Data;
using Sabio.Services.Interfaces;
using Sabio.Models;
using Sabio.Models.Requests.SurveysInstancesRequests;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Users;
using Sabio.Models.Domain.Comments;
using Sabio.Models.Domain.Surveys.Answers;
using Sabio.Models.Domain.Surveys.Instances;
using Sabio.Models.Domain.Surveys.Details;

namespace Sabio.Services
{
    public class SurveyInstanceService : ISurveyInstanceService
    {
        IDataProvider _data = null;
        IMapUser _mapUser = null;

        public SurveyInstanceService(IDataProvider data, IMapUser mapUser)
        {
            _data = data;
            _mapUser = mapUser;
        }

        public SurveysInstance Get(int id)
        {
            string procName = "[dbo].[SurveysInstances_Select_ByIdV2]";

            SurveysInstance instance = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                instance = MapSingleSurveysInstance(reader, ref startingIndex);
            });

            return instance;
        }

        public SurveyInstanceDetails GetDetailsById(int id)
        {
            string procName = "[dbo].[SurveyInstances_SelectById_Details]";

            SurveyInstanceDetails details = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                details = MapSingleSurveyInstanceDetails(reader, ref startingIndex);
            });

            return details;
        }

        public Paged<SurveysInstance> GetAll(int pageIndex, int pageSize)
        {
            Paged<SurveysInstance> pagedList = null;

            List<SurveysInstance> list = null;

            int totalCount = 0;

            string procName = "[dbo].[SurveysInstances_SelectAllV2]";

            _data.ExecuteCmd(procName, (param) =>
            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);

            }, (reader, recordSetIndex) =>
            {
                int startingIndex = 0;
                SurveysInstance instance = MapSingleSurveysInstance(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }

                if (list == null)
                {
                    list = new List<SurveysInstance>();
                }
                list.Add(instance);
            });
            if (list != null)
            {
                pagedList = new Paged<SurveysInstance>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        public Paged<SurveysInstance> GetByCreatedBy(int pageIndex, int pageSize, int userId)
        {
            Paged<SurveysInstance> pagedList = null;

            List<SurveysInstance> list = null;

            int totalCount = 0;

            string procName = "[dbo].[SurveysInstances_Select_ByCreatedByV2]";

            _data.ExecuteCmd(procName, (param) =>
            {
                param.AddWithValue("@PageIndex", pageIndex);
                param.AddWithValue("@PageSize", pageSize);
                param.AddWithValue("@CreatedBy", userId);

            }, (reader, recordSetIndex) =>
            {
                int startingIndex = 0;
                SurveysInstance instance = MapSingleSurveysInstance(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }

                if (list == null)
                {
                    list = new List<SurveysInstance>();
                }
                list.Add(instance);
            });
            if (list != null)
            {
                pagedList = new Paged<SurveysInstance>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        public int Add(SurveysInstanceAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[SurveysInstances_Insert]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {

                AddCommonParams(model, col);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);

                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);

                col.AddWithValue("@UserId", userId);

            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {

                object oId = returnCollection["@Id"].Value;

                int.TryParse(oId.ToString(), out id);

            });

            return id;
        }

        public void Update(SurveysInstanceUpdateRequest model, int userId)
        {
            string procName = "[dbo].[SurveysInstances_Update]";

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
            string procName = "[dbo].[SurveysInstances_Delete_ById]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection collection)
            {
                collection.AddWithValue("@Id", id);
            },
            returnParameters: null);
        }

        private SurveysInstance MapSingleSurveysInstance(IDataReader reader, ref int startingIndex)
        {
            SurveysInstance anInstance = new SurveysInstance();
            anInstance.Survey = new BaseSurvey();

            anInstance.Id = reader.GetSafeInt32(startingIndex++);
            anInstance.Survey.Id = reader.GetSafeInt32(startingIndex++);
            anInstance.Survey.Name = reader.GetSafeString(startingIndex++);
            anInstance.Survey.Description = reader.GetSafeString(startingIndex++);
            anInstance.Survey.AnsweredBy = reader.DeserializeObject<List<BaseUser>>(startingIndex++);
            anInstance.AnswerId = reader.GetSafeInt32(startingIndex++);
            anInstance.UserId = reader.GetSafeInt32(startingIndex++);
            anInstance.DateCreated = reader.GetSafeDateTime(startingIndex++);
            anInstance.DateModified = reader.GetSafeDateTime(startingIndex++);

            return anInstance;
        }

        private SurveyInstanceDetails MapSingleSurveyInstanceDetails(IDataReader reader, ref int startingIndex)
        {
            SurveyInstanceDetails detailedInstance = new SurveyInstanceDetails();
            detailedInstance.Survey = new SurveyInstanceDetailsAnswer();

            detailedInstance.Id = reader.GetSafeInt32(startingIndex++);
            detailedInstance.DateCreated = reader.GetSafeDateTime(startingIndex++);
            detailedInstance.DateModified = reader.GetSafeDateTime(startingIndex++);
            detailedInstance.CreatedBy = _mapUser.MapSingleUser(reader, ref startingIndex);
            detailedInstance.Survey = reader.DeserializeObject<SurveyInstanceDetailsAnswer>(startingIndex++);

            return detailedInstance;
        }

        private static void AddCommonParams(SurveysInstanceAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@SurveyId", model.SurveyId);
        }
    }
}

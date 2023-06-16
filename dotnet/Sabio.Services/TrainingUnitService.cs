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
using Sabio.Models.Domain.TrainingUnits;

using System.Reflection;
using Sabio.Models.Requests.TrainingUnits;
using Sabio.Models.Domain;
using Sabio.Models;
using static System.Net.Mime.MediaTypeNames;
using Sabio.Models.Domain.Organizations;
using Sabio.Models.Domain.Trainees;

namespace Sabio.Services
{
    public class TrainingUnitService : ITrainingUnitService
    {
        IDataProvider _data = null;
        public TrainingUnitService(IDataProvider data)
        {
            _data = data;
        }
        public void Update(TrainingUnitUpdateRequest model, int userId)
        {
            string procName = "[dbo].[TrainingUnits_Update]";


            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", model.Id);
                col.AddWithValue("Name", model.Name);
                col.AddWithValue("Description", model.Description);
                col.AddWithValue("TrainingStatusId", model.TrainingStatusId);
                col.AddWithValue("PrimaryTrainerId", model.PrimaryTrainerId);
                col.AddWithValue("UserId", userId);




            }, returnParameters: null);
        }
        public void UpdateStatus(TrainingUnitBaseUpdateRequest model, int userId)

        {

            string procName = "[dbo].[TrainingUnits_Update_Status]";



            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {


                col.AddWithValue("@Id", model.Id);
                col.AddWithValue("@UserId", userId);
                col.AddWithValue("@TrainingStatusId", model.TrainingStatusId);





            }, returnParameters: null);
        }
        public int Add(TrainingUnitAddRequest model, int userId)
        {
            int id = 0;




            string procName = "[dbo].[TrainingUnits_Insert]";


            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddTrainingUnitParams(model, col, userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);



            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object objectId = returnCollection["@Id"].Value;

                int.TryParse(objectId.ToString(), out id);



            });

            return id;
        }

        public List<TrainingUnit> GetAll()
        {
            List<TrainingUnit> list = null;
            string procName = "[dbo].[TrainingUnits_SelectAllV2]";

            _data.ExecuteCmd(procName, inputParamMapper: null
            , singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                TrainingUnit trainingUnit = MapSingleTrainingUnit(reader, ref startingIndex);


                if (list == null)
                {
                    list = new List<TrainingUnit>();
                }

                list.Add(trainingUnit);
            }
            );
            return list;
        }

        public TrainingUnit GetById(int id)
        {
            string procName = "[dbo].[TrainingUnits_Select_ByIdV2]";

            TrainingUnit trainingUnit = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramcollection)
            {


                paramcollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {

                int startingIndex = 0;
                trainingUnit = MapSingleTrainingUnit(reader, ref startingIndex);


            }
            );

            return trainingUnit;

        }
        public List<TrainingUnitPrimaryTrainer> GetByPrimaryTrainerId(int userId)
        {
            List<TrainingUnitPrimaryTrainer> list = null;
            string procName = "[dbo].[TrainingUnits_Select_ByPrimaryTrainerId]";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramcollection)
            {
                paramcollection.AddWithValue("@currentUserId", userId);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                TrainingUnitPrimaryTrainer trainer = MapPrimaryTrainer(reader);

                if (list == null)
                { 
                    list = new List<TrainingUnitPrimaryTrainer>();
                }

                list.Add(trainer);
            }
            );
            return list;
        }

        public Paged<TrainingUnit> GetByOrgId(int pageIndex, int pageSize, int query, int organizationId)
        {
            Paged<TrainingUnit> pagedResult = null;

            List<TrainingUnit> result = null;

            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[TrainingUnits_Select_ByOrgIdV2]",
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)



                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                    parameterCollection.AddWithValue("@Query", query);
                    parameterCollection.AddWithValue("@OrganizationId", organizationId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    TrainingUnit trainingUnit = MapSingleTrainingUnit(reader, ref startingIndex);



                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }


                    if (result == null)
                    {
                        result = new List<TrainingUnit>();
                    }

                    result.Add(trainingUnit);
                }

            );
            if (result != null)
            {
                pagedResult = new Paged<TrainingUnit>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }
        public List<TrainingUnit> GetByOrgIdV3(int query, int organizationId)
        {
            List<TrainingUnit> result = new List<TrainingUnit>();
            _data.ExecuteCmd(
                "[dbo].[TrainingUnits_Select_ByOrgIdV3]",
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@Query", query);
                    parameterCollection.AddWithValue("@OrgId", organizationId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    TrainingUnit trainingUnit = MapSingleTrainingUnit(reader, ref startingIndex);
                    result.Add(trainingUnit);
                }
            );
            return result;
        }
        public List<TrainingUnit> GetByOrgIdV3HasStudent(int query, int organizationId)
        {
            List<TrainingUnit> result = new List<TrainingUnit>();
            _data.ExecuteCmd(
                "[dbo].[TrainingUnits_Select_ByOrgId_HasStudent]",
                inputParamMapper: delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@Query", query);
                    parameterCollection.AddWithValue("@OrgId", organizationId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    TrainingUnit trainingUnit = MapSingleTrainingUnit(reader, ref startingIndex);
                    result.Add(trainingUnit);
                }
            );
            return result;
        }


        private static TrainingUnit MapSingleTrainingUnit(IDataReader reader, ref int startingIndex)
        {
            TrainingUnit trainingUnit = new TrainingUnit();
            trainingUnit.Organization = new OrganizationTrainingUnit();
            trainingUnit.PrimaryTrainerId = new TrainingUnitPrimaryTrainer();
            trainingUnit.TrainingStatusId = new LookUp();

            trainingUnit.Id = reader.GetSafeInt32(startingIndex++);
            trainingUnit.Name = reader.GetString(startingIndex++);
            trainingUnit.Description = reader.GetString(startingIndex++);
            trainingUnit.Organization.Id = reader.GetSafeInt32(startingIndex++);
            trainingUnit.Organization.Name = reader.GetString(startingIndex++);
            trainingUnit.Organization.LogoUrl = reader.GetString(startingIndex++);
            trainingUnit.TrainingStatusId.Id = reader.GetSafeInt32(startingIndex++);
            trainingUnit.TrainingStatusId.Name = reader.GetString(startingIndex++);
            trainingUnit.PrimaryTrainerId.Id = reader.GetSafeInt32(startingIndex++);
            trainingUnit.PrimaryTrainerId.FirstName = reader.GetString(startingIndex++);
            trainingUnit.PrimaryTrainerId.LastName = reader.GetString(startingIndex++);
            trainingUnit.CreatedBy = reader.GetSafeInt32(startingIndex++);
            trainingUnit.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            return trainingUnit;
        }

        private static TrainingUnitPrimaryTrainer MapPrimaryTrainer(IDataReader reader)
        {
            TrainingUnitPrimaryTrainer trainer = new TrainingUnitPrimaryTrainer();
            int startingIndex = 0;

            trainer.Id = reader.GetSafeInt32(startingIndex++);
            trainer.FirstName = reader.GetString(startingIndex++);
            trainer.LastName = reader.GetString(startingIndex++);

            return trainer;
        }

        private static void AddTrainingUnitParams(TrainingUnitAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@OrganizationId", model.OrganizationId);
            col.AddWithValue("@TrainingStatusId", model.TrainingStatusId);
            col.AddWithValue("@PrimaryTrainerId", model.PrimaryTrainerId);
            col.AddWithValue("@UserId", userId);
        }
    }
}
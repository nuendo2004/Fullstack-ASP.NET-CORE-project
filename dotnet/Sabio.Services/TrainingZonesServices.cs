using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Domain.TrainingZones;
using Sabio.Models.Requests.TrainingZones;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class TrainingZonesServices : ITrainingZonesServices
    {
        IDataProvider _data = null;
        public TrainingZonesServices(IDataProvider data)
        {
            _data = data;
        }
        
        public Training Get(int trainingUnitId, int zoneId)
        {
            string procName = "[dbo].[TrainingZones_Select_ByTrainingUnitId_ByZoneId]";
            Training training = null;
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@trainingUnitId", trainingUnitId);
                paramCollection.AddWithValue("@zoneId", zoneId);
            }
            , delegate (IDataReader reader, short set)
            {
                training = Mapper(reader);
            });
            return training;
        }

        public Training GetUnit(int trainingUnitId)
        {
            string procName = "[dbo].[TrainingZones_Select_ByTrainingUnitId]";
            Training training = null;
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                MapperTraining(trainingUnitId, paramCollection);

            }
            , delegate (IDataReader reader, short set)
            {
                training = Mapper(reader);
            });
            return training;
        }
        public Training GetTrainee(int traineeId)
        {
            string procName = "[dbo].[TrainingZones_Select_ByTraineeId]";
            Training training = null;
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@TraineeId", traineeId);
            }
            , delegate (IDataReader reader, short set)
            {
                training = Mapper(reader);

            });
            return training;
        }
        public void Delete(int trainingUnitId, int zoneId, int userId)
        {
            string procName = "[dbo].[TrainingZones_Delete_ByTrainingUnitId_ByZoneId]";
            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@TrainingUnitId", trainingUnitId);
                paramCollection.AddWithValue("@ZoneId", zoneId);
            }, null); }
        public int Add(TrainingZonesAddRequest model,int userId)
        {
            int id = 0;
            string procName = "[dbo].[TrainingZones_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@TrainingUnitId", model.TrainingUnitId);
                col.AddWithValue("@ZoneId", model.ZoneId);
                col.AddWithValue("@ThreatConfigId", model.ThreatConfigId);
                col.AddWithValue("@ZoneStatusId", model.ZoneStatusId);
                col.AddWithValue("@CreatedBy", userId);
                SqlParameter idOut = new SqlParameter("@TrainingUnitId", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);},
                 delegate (SqlParameterCollection returnCol)
                 {
                     object oId = returnCol["@TrainingUnitId"].Value;
                     Console.WriteLine("");
                 });
            return id;
        }
        private static Training Mapper(IDataReader reader)
        {
            Training zones = new Training();
            int startingIndex = 0;

            zones.CreatedBy = reader.GetSafeInt32(startingIndex++);
            zones.DateCreated = reader.GetSafeDateTime(startingIndex++);
            zones.TrainingUnits = new TrainingUnits();
            zones.TrainingUnits.Id = reader.GetSafeInt32(startingIndex++);
            zones.TrainingUnits.Name = reader.GetSafeString(startingIndex++);
            zones.TrainingUnits.Description = reader.GetSafeString(startingIndex++);
            zones.TrainingUnits.OrganizationId = reader.GetSafeInt32(startingIndex++);
            zones.TrainingUnits.TrainingStatusId = reader.GetSafeInt32(startingIndex++);
            zones.TrainingUnits.PrimaryTrainerId = reader.GetSafeInt32(startingIndex++);
            zones.TrainingUnits.CreatedBy = reader.GetSafeInt32(startingIndex++);
            zones.TrainingUnits.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            zones.TrainingUnits.DateCreated = reader.GetSafeDateTime(startingIndex++);
            zones.TrainingUnits.DateModified = reader.GetSafeDateTime(startingIndex++);
            zones.Zones = new Zones();
            zones.Zones.Id = reader.GetSafeInt32(startingIndex++);
            zones.Zones.Name = reader.GetSafeString(startingIndex++);
            zones.Zones.Description = reader.GetSafeString(startingIndex++);
            zones.Zones.ZoneTypeId = reader.GetSafeInt32(startingIndex++);
            zones.Zones.ZoneStatusId = reader.GetSafeInt32(startingIndex++);
            zones.Zones.IsDeleted = reader.GetSafeBool(startingIndex++);
            zones.Zones.CreatedBy = reader.GetSafeInt32(startingIndex++);
            zones.Zones.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            zones.Zones.DateCreated = reader.GetSafeDateTime(startingIndex++);
            zones.Zones.DateModified = reader.GetSafeDateTime(startingIndex++);
            zones.ZoneTypes = new LookUp();
            zones.ZoneTypes.Id = reader.GetSafeInt32(startingIndex++);
            zones.ZoneTypes.Name = reader.GetSafeString(startingIndex++);
            zones.ZoneStatus = new LookUp();
            zones.ZoneStatus.Id = reader.GetSafeInt32(startingIndex++);
            zones.ZoneStatus.Name = reader.GetSafeString(startingIndex++);
            zones.ZoneThreatConfigurationRules = new ZoneThreatConfigurationRules();
            zones.ZoneThreatConfigurationRules.Id = reader.GetSafeInt32(startingIndex++);
            zones.ZoneThreatConfigurationRules.Name = reader.GetSafeString(startingIndex++);
            zones.ZoneThreatConfigurationRules.Description = reader.GetSafeString(startingIndex++);
            zones.ZoneThreatConfigurationRules.IsDeleted = reader.GetSafeBool(startingIndex++);
            zones.ZoneThreatConfigurationRules.CreatedBy = reader.GetSafeInt32(startingIndex++);
            zones.ZoneThreatConfigurationRules.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            zones.ZoneThreatConfigurationRules.DateCreated = reader.GetSafeDateTime(startingIndex++);
            zones.ZoneThreatConfigurationRules.DateModified = reader.GetSafeDateTime(startingIndex++);
            return zones;
        }
        private static void MapperTraining(int trainingUnitId, SqlParameterCollection paramCollection)
        {
            paramCollection.AddWithValue("@trainingUnitId", trainingUnitId);
        }
    }
}

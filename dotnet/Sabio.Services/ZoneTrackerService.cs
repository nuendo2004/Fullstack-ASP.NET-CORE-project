using Amazon.S3.Model;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain.Users;
using Sabio.Models.Domain.ZoneTracker;
using Sabio.Models.Domain.ZoneTrackers;
using Sabio.Models.Requests;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Reflection.Metadata;

namespace Sabio.Services
{
    public class ZoneTrackerService : IZoneTrackerService
    {
        IDataProvider _provider;
        public ZoneTrackerService(IDataProvider provider)
        {
            _provider = provider;
        }

        public Paged<ZoneTracker> GetAll(int pageIndex, int pageSize)
        {
            string recordProc = "dbo.ZoneRecords_SelectAll_Paginated";
            List<ZoneTracker> records = new List<ZoneTracker>();
            int totalCount = 0;
            _provider.ExecuteCmd(recordProc, (col) =>
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
            }, (reader, dataset) =>
            {
                int ctr = 0;
                var record = MapCommonParams(reader, ref ctr);
                totalCount = reader.GetSafeInt32(ctr++);
                records.Add(record);
            });
            return new Paged<ZoneTracker>(records, pageIndex, pageSize, totalCount);
        }

        public Paged<ZoneTracker> GetByTrainingUnitId(int pageIndex, int pageSize, int trainingUnitId, bool hasRecordOnly)
        {
            string recordProc;
            if (hasRecordOnly)
                recordProc = "dbo.ZoneRecords_SelectByTrainingUnitId_HasRecordOnly_Paginated";
            else
                recordProc = "dbo.ZoneRecords_SelectByTrainingUnitId_Paginated";
            List<ZoneTracker> records = new List<ZoneTracker>();
            int totalCount = 0;
            _provider.ExecuteCmd(recordProc, (col) =>
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
                col.AddWithValue("@TrainingUnitId", trainingUnitId);
            }, (reader, dataset) =>
            {
                int ctr = 0;
                var record = MapCommonParams(reader, ref ctr);
                totalCount = reader.GetSafeInt32(ctr++);
                records.Add(record);
            });
            return new Paged<ZoneTracker>(records, pageIndex, pageSize, totalCount);
        }

        public Paged<ZoneTracker> GetByOrganizationId(int pageIndex, int pageSize, int orgId, bool hasRecordOnly)
        {
            string recordProc;
            if (hasRecordOnly) 
                recordProc = "dbo.ZoneRecords_SelectByOrgId_HasRecordOnly_Paginated";
            else
                recordProc = "dbo.ZoneRecords_SelectByOrgId_Paginated";
            List<ZoneTracker> records = new List<ZoneTracker>();
            int totalCount = 0;
            _provider.ExecuteCmd(recordProc, (col) =>
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
                col.AddWithValue("@OrgId", orgId);
            }, (reader, dataset) =>
            {
                int ctr = 0;
                var record = MapCommonParams(reader, ref ctr);
                totalCount = reader.GetSafeInt32(ctr++);
                Console.WriteLine(totalCount);
                records.Add(record);
            });
            return new Paged<ZoneTracker>(records, pageIndex, pageSize, totalCount);
        }

        public Paged<ZoneRecord> GetByFilteredZoneId(int pageIndex, int pageSize, int zoneId, int traineeId)
        {
            string recordProc = "dbo.ZoneRecords_SelectByZoneAndTraineeId_Paginated";
            var records = new List<ZoneRecord>();
            int totalCount = 0;
            _provider.ExecuteCmd(recordProc, (col) =>
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
                col.AddWithValue("@ZoneId", zoneId);
                col.AddWithValue("@TraineeId", traineeId);
            }, (reader, dataset) =>
            {
                int ctr = 0;
                var record = mapCommonRecord(reader, ref ctr);
                totalCount = reader.GetSafeInt32(ctr++);
                records.Add(record);
            });
            return new Paged<ZoneRecord>(records, pageIndex, pageSize, totalCount);
        }

        public Paged<ZoneRecord> GetByTraineeId(int pageIndex, int pageSize, int traineeId)
        {
            string recordProc = "dbo.ZoneRecords_SelectByTraineeId_Paginated";
            var records = new List<ZoneRecord>();
            int totalCount = 0;
            _provider.ExecuteCmd(recordProc, (col) =>
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
                col.AddWithValue("@TraineeId", traineeId);
            }, (reader, dataset) =>
            {
                int ctr = 0;
                var record = mapCommonRecord(reader, ref ctr);
                totalCount = reader.GetSafeInt32(ctr++);
                records.Add(record);
            });
            return new Paged<ZoneRecord>(records, pageIndex, pageSize, totalCount);
        }

        private ZoneRecord mapCommonRecord(IDataReader reader, ref int ctr)
        {
            var record = new ZoneRecord();
            record.Id = reader.GetSafeInt32(ctr++);
            record.TimeAccessed = reader.GetSafeDateTime(ctr++);
            record.Device = reader.GetSafeString(ctr++);
            string rec = reader.GetSafeString(ctr++);
            if (!string.IsNullOrEmpty(rec))
            {
                record.Zone = Newtonsoft.Json.JsonConvert.DeserializeObject<ZoneMinified>(rec);
            }
            else
                record.Zone = new ZoneMinified();
            return record;
        }

        private ZoneTracker MapCommonParams(IDataReader reader, ref int ctr)
        {
            var record = new ZoneTracker();
            record.TraineeId = reader.GetSafeInt32(ctr++);
            record.TrainingUnitId = reader.GetSafeInt32(ctr++);

 
                string userStr = reader.GetSafeString(ctr++);
                record.User = Newtonsoft.Json.JsonConvert.DeserializeObject<BaseUser>(userStr);

            string recordStr = reader.GetSafeString(ctr++);

            if (!string.IsNullOrEmpty(recordStr))
            {
                record.Records = Newtonsoft.Json.JsonConvert.DeserializeObject<List<ZoneRecord>>(recordStr);
            }
            else  
                record.Records = new List<ZoneRecord>(); 

            return record;
        }

        public List<ZoneAccessLogChart> GetChartByTraineeId(int id)
        {
            string proc = "[dbo].[ZoneRecords_SelectByTraineeId_Count]";
            var records = new List<ZoneAccessLogChart>();
            _provider.ExecuteCmd(proc, (cols) =>
            {
                cols.AddWithValue("@TraineeId", id);
            }, (col, dataset) =>
            {
                var record = new ZoneAccessLogChart();
                record.Name = col.GetSafeString(0);
                record.TotalCount = col.GetSafeInt32(1);
                records.Add(record);
            });
            return records;
        }

        public Paged<ZoneRecord> GetByTraineeIdSearch(int pageIndex, int pageSize, int traineeId, string dateStart, string dateEnd, int zoneId)
        {

            string recordProc;
            if (zoneId == 0)
                recordProc = "dbo.ZoneRecords_SelectByTraineeId_Query";
            else
                recordProc = "dbo.ZoneRecords_SelectByZoneIdTraineeId_Query";

            var records = new List<ZoneRecord>();
            int totalCount = 0;
            _provider.ExecuteCmd(recordProc, (col) =>
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
                col.AddWithValue("@TraineeId", traineeId);
                col.AddWithValue("@DateStart", dateStart);
                col.AddWithValue("@DateEnd", dateEnd);
                if (zoneId != 0)
                        col.AddWithValue("@ZoneId", zoneId);
            }, (reader, dataset) =>
            {
                int ctr = 0;
                var record = mapCommonRecord(reader, ref ctr);
                totalCount = reader.GetSafeInt32(ctr++);
                records.Add(record);
            });
            return new Paged<ZoneRecord>(records, pageIndex, pageSize, totalCount);
        }


    }
}

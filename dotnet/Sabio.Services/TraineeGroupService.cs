using Sabio.Data.Providers;
using Sabio.Models.Requests;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Domain;
using Sabio.Services.Interfaces;
using System.Reflection;

namespace Sabio.Services
{
    public class TraineeGroupService : ITraineeGroupService
    {
        IDataProvider _data = null;

        public TraineeGroupService(IDataProvider data)
        {
            _data = data;
        }

        public void AddTraineeGroup(TraineeGroupAddRequest model)
        {
            string procName = "[dbo].[TraineeGroups_Insert]";

            _data.ExecuteNonQuery(procName
                , inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("TraineeId", model.TraineeId);
                    col.AddWithValue("@GroupId", model.GroupId);
                },
                returnParameters: null);
        }

        public void DeleteTraineeGroup(int traineeId, int groupId)
        {
            string procName = "[dbo].[TraineeGroups_Delete]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@TraineeId", traineeId);
                    col.AddWithValue("@GroupId", groupId);
                },
                returnParameters: null);
        }
    }
}

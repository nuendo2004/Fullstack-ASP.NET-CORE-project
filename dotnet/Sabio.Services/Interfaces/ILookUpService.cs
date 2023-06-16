using Sabio.Models.Domain;
using Sabio.Models.Domain.TrainingZones;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface ILookUpService
    {
        List<LookUp> GetLookUp(string tableNames);

        List<State> GetStates();

        Dictionary<string, List<LookUp>> GetMany(string[] tableNames);

        LookUp MapSingleLookUp(IDataReader reader, ref int startingIndex);
        List<SpreadLevel> GetSpreadLevels();
    }
}

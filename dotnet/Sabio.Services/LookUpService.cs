using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Domain.TrainingZones;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class LookUpService : ILookUpService
    {
        IDataProvider _data = null;
        public LookUpService(IDataProvider data)
        {
            _data = data;
        }
        public List<LookUp> GetLookUp(string tableName)
        {
            List<LookUp> list = null;

            string procName = $"[dbo].[{tableName}_SelectAll]";

            _data.ExecuteCmd(procName, inputParamMapper: null
            , singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;

                LookUp aLookUp = MapSingleLookUp(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<LookUp>();
                }
                list.Add(aLookUp);
            });

            return list;
        }

        public List<State> GetStates() 
        {
            string procName = "[dbo].[States_SelectAll]";

            List<State> list = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    State states = new State();

                    int startingIndex = 0;

                    states.Id = reader.GetSafeInt32(startingIndex++);
                    states.Code = reader.GetString(startingIndex++);
                    states.Name = reader.GetString(startingIndex++);

                    if (list == null)
                    {
                        list = new List<State>();
                    }

                    list.Add(states);
                }
                );
            return list;
        }

        public Dictionary<string, List<LookUp>> GetMany(string[] tableNames)
        {
            Dictionary<string, List<LookUp>> result = null;

            foreach (string table in tableNames)
            {
                List<LookUp> currentList = GetLookUp(table);
                string nameToUse = ToCamelCase(table);

                if (result == null)
                {
                    result = new Dictionary<string, List<LookUp>>();
                }
                result.Add(nameToUse, currentList);
            }

            return result;
        }

        public List<SpreadLevel> GetSpreadLevels()
        {
            List<SpreadLevel> list = null;
            string procName = "[dbo].[SpreadLevels_SelectAll]";
            SpreadLevel levels = null;

            _data.ExecuteCmd(procName, null, delegate (IDataReader reader, short set)
            {
                levels = new SpreadLevel();
                int startingIndex = 0;
                levels.Id = reader.GetSafeInt32(startingIndex++);
                levels.Name = reader.GetSafeString(startingIndex++);
                levels.Description = reader.GetSafeString(startingIndex++);
                if (list == null)
                {
                    list = new List<SpreadLevel>();
                }
                list.Add(levels);
            });
            return list;
        }

        private static string ToCamelCase(string str)
        {
            string name = null;
            if (str.Length > 0)
            {
                str = Regex.Replace(str, "([A-Z])([A-Z]+)($|[A-Z])", m => m.Groups[1].Value + m.Groups[2].Value.ToLower() + m.Groups[3].Value);
                name = char.ToLower(str[0]) + str.Substring(1);
            }
            return name;
        }
     
        public LookUp MapSingleLookUp(IDataReader reader, ref int startingIndex)
        {
            LookUp lookUp = new LookUp();

            lookUp.Id = reader.GetSafeInt32(startingIndex++);
            lookUp.Name = reader.GetSafeString(startingIndex++);

            return lookUp;
        }
    }
}
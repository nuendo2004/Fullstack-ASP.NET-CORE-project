using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Data;

namespace Sabio.Services
{
    public class ReferenceTypesService : IReferenceTypesService
    {
        IDataProvider _dataProvider = null;

        public ReferenceTypesService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public List<ReferenceType> SelectAll()
        {
            string procName = "[dbo].[ReferenceTypes_SelectAll]";
            List<ReferenceType> list = null;

            _dataProvider.ExecuteCmd(procName
            , null
            , delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                ReferenceType referenceType = new ReferenceType();
                referenceType.Id = reader.GetSafeInt32(startingIndex++);
                referenceType.Name = reader.GetSafeString(startingIndex++);

                if (list == null)
                {
                    list = new List<ReferenceType>();
                }
                list.Add(referenceType);
            });
            return list;
        }
    }
}



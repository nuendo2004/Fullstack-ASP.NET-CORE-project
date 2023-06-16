using Microsoft.AspNetCore.Mvc.RazorPages;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class SiteReferenceService : ISiteReferenceService
    {
        IDataProvider _dataProvider = null;

        public SiteReferenceService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public Paged<SiteReference> SelectAll(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[SiteReferences_SelectAll_Paginated]";
            List<SiteReference> list = null;
            Paged<SiteReference> pagedResult = null;
            int totalCount = 0;

            _dataProvider.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@PageIndex", pageIndex);
                col.AddWithValue("@PageSize", pageSize);
            }
            , delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                SiteReference model = MapSiteReference(reader, ref startingIndex);
                model.ReferenceType = new LookUp();
                model.ReferenceType.Id = reader.GetSafeInt32(startingIndex++);
                model.ReferenceType.Name = reader.GetSafeString(startingIndex++);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }
                if (list == null)
                {
                    list = new List<SiteReference>();
                }
                list.Add(model);
            });

            if (list != null)
            {
                pagedResult = new Paged<SiteReference>(list, pageIndex, pageSize, totalCount);
            }
            return pagedResult;
        }     
        
        public List<ReferenceTypeSummary> SelectSummary()
        {
            string procName = "[dbo].[SiteReferences_SelectSummary]";
            List<ReferenceTypeSummary> list = null;
           
            _dataProvider.ExecuteCmd(procName
            , null           
            , delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                ReferenceTypeSummary referenceSummary = new ReferenceTypeSummary();
                referenceSummary.Id = reader.GetSafeInt32(startingIndex++);
                referenceSummary.Name = reader.GetSafeString(startingIndex++);
                referenceSummary.total = reader.GetSafeInt32(startingIndex++);

             if (list == null)
                {
                    list = new List<ReferenceTypeSummary>();
                }
                list.Add(referenceSummary);
            });
            return list;
        }

        public void Insert(int siteReferenceId, int userId)
        {
            string procName = "[dbo].[SiteReferences_Insert]";
            
            _dataProvider.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@RefTypeId", siteReferenceId);
                col.AddWithValue("@UserId", userId);
            }
            , null);
        }

        private static SiteReference MapSiteReference(IDataReader reader, ref int startingIndex)
        {
            SiteReference siteReference = new SiteReference();
            siteReference.ReferenceTypeId = reader.GetSafeInt32(startingIndex++);
            siteReference.UserId = reader.GetSafeInt32(startingIndex++);
            return siteReference;
        }
    }
}

using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface ISiteReferenceService
    {
        Paged<SiteReference> SelectAll(int pageIndex, int pageSize);
        List<ReferenceTypeSummary> SelectSummary();
        void Insert(int siteReferenceId, int userId);
    }
}
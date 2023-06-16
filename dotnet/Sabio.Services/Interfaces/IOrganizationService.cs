using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Organizations;
using Sabio.Models.Requests.Organizations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IOrganizationService
    {
        int Add(OrganizationAddRequest model, int userId);
        int AddV2(OrganizationAddRequestV2 model, int userId);
        void Delete(int id, int userId);
        Paged<Organization> Search(int pageIndex, int pageSize, string query);
        List<Organization> GetAll();
        Organization Get(int id);
        Paged<Organization> GetByUserId(int pageIndex, int pageSize, int userId);
        void Update(OrganizationUpdateRequest model, int userId);
        List<LookUp> GetOrgLookUpById(int userId);
        List<OrgUserData> GetTotalUsers();
        List<OrgUserData> GetTotalTrainees();
    }
}

using Sabio.Models.Domain;

namespace Sabio.Services.Interfaces
{
    public interface IOrgAdminService
    {
        OrgAdminData GetAdminDataFromOrgId(int orgId, int numberSelection);
    }
}
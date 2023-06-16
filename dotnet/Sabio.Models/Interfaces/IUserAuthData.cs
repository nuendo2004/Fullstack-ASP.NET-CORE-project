using Sabio.Models.Domain.Trainees;
using System.Collections.Generic;

namespace Sabio.Models
{
    public interface IUserAuthData
    {
        int Id { get; }
        string Name { get; }
        IEnumerable<string> Roles { get; }
        IEnumerable<int> Organizations { get; set; }
        int CurrentOrgId { get; }
        List<int> Trainees { get; set; }
        int CurrentTraineeId { get; }
        object TenantId { get; }
    }
}
using Sabio.Models.Domain.InviteMembers;
using System.Collections.Generic;

namespace Sabio.Services.Interfaces
{
    public interface IInviteMemberService
    {
        InviteMember GetByToken(string token);
        List<InviteMemberStatus> GetPendingUsersOverTime();
    }
}
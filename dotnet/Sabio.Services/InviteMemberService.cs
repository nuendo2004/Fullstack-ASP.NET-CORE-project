using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain.InviteMembers;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class InviteMemberService : IInviteMemberService
    {

        IDataProvider _data = null;

        public InviteMemberService(IDataProvider data)
        {
            _data = data;
        }

        public InviteMember GetByToken(string token)
        {
            string procName = "[dbo].[InviteMembers_Select_ByToken]";

            InviteMember member = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Token", token);
            },
            delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                member = MapSingleMember(reader, ref startingIndex);
            });

            return member;
        }

        public List<InviteMemberStatus> GetPendingUsersOverTime()
        {
            string procName = "[dbo].[InviteMembers_Select_OverTime]";
            List<InviteMemberStatus> dataList = null;

            _data.ExecuteCmd
                (
                    storedProc: procName,
                    inputParamMapper: null,
                    singleRecordMapper: delegate (IDataReader reader, short set)
                    {
                        int columnIndex = 0;
                        InviteMemberStatus data = new InviteMemberStatus();
                        data.DateCreated = reader.GetSafeDateTime(columnIndex++);
                        data.Pending = reader.GetSafeInt32(columnIndex++);

                        if(dataList == null)
                        {
                            dataList = new List<InviteMemberStatus>();
                        }
                        dataList.Add(data);
                    }
                );
            return dataList;
        }

        private static InviteMember MapSingleMember(IDataReader reader, ref int startingIndex)
        {
            InviteMember member = new InviteMember();

            member.Id = reader.GetSafeInt32(startingIndex++);
            member.FirstName = reader.GetSafeString(startingIndex++);
            member.LastName = reader.GetSafeString(startingIndex++);
            member.Email = reader.GetSafeString(startingIndex++);
            member.UserRoleTypeId = reader.GetSafeInt32(startingIndex++);
            member.OrganizationId = reader.GetSafeInt32(startingIndex++);

            return member;
        }
    }
}

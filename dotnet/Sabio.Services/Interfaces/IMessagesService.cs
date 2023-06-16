using Sabio.Models.Domain.Messages;
using Sabio.Models.Requests.Messages;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace Sabio.Services.Interfaces
{
    public interface IMessagesService
    {
        int CreateMessage(MessageAddRequest model);
        void Delete(int id);
        List<Message> GetByRecipientId(int recipientEntityTypeId, int recipientId);
        List<Message> GetBySenderId(int senderEntityTypeId, int senderId);
        List<Message> GetConversation(string chatName);
        List<GroupMessage> GetByZoneGroupId(int zoneGroupId);
        Message GetById(int messageId);
        void Update(MessageUpdateRequest model);
    }
}
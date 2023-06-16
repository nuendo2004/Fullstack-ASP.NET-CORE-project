using Sabio.Data.Providers;
using Sabio.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Requests.Messages;
using Sabio.Models.Domain.Messages;
using Sabio.Services.Interfaces;
using Sabio.Data;
using Newtonsoft.Json;

namespace Sabio.Services
{
    public class MessagesService : IMessagesService
    {
        IDataProvider _data = null;

        public MessagesService(IDataProvider data)
        {
            _data = data;
        }

        public int CreateMessage(MessageAddRequest model)
        {
            string procName = "dbo.Messages_Insert";

            int id = 0;

            _data.ExecuteNonQuery(
                procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    AddCommonParams(model, coll);
                    coll.AddWithValue("@SenderEntityTypeId", model.SenderEntityTypeId);
                    coll.AddWithValue("@SenderId", model.SenderId);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    coll.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnColl)
                {
                    object idObj = returnColl["@Id"].Value;

                    int.TryParse(idObj.ToString(), out id);
                }
                );
            return id;
        }

        public List<Message> GetBySenderId(int senderEntityTypeId,int senderId )
        {
            string procName = "[dbo].[Messages_Select_BySenderId]";
            List<Message> messages = null;
            int i = 0;

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@SenderEntityTypeId", senderEntityTypeId);
                    coll.AddWithValue("@SenderId", senderId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    Message message = MapSingleMessage(reader, ref i);

                    if (messages == null)
                    {
                        messages = new List<Message>();
                    }
                    messages.Add(message);
                });
            return messages;
        }

        public List<Message> GetByRecipientId(int recipientEntityTypeId,int recipientId)
        {
            string procName = "dbo.Messages_Select_ByRecipientId";
            List<Message> messages = null;
            int i = 0;

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@RecipientEntityTypeId", recipientEntityTypeId);
                    coll.AddWithValue("@RecipientId", recipientId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    Message message = MapSingleMessage(reader, ref i);

                    if (messages == null)
                    {
                        messages = new List<Message>();
                    }
                    messages.Add(message);
                });
            return messages;
        }

        public List<GroupMessage> GetByZoneGroupId(int zoneGroupId)
        {
            string procName = "dbo.Messages_GetByZoneGroupId";
            List<GroupMessage> list = null;
            int i = 0;

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@ZoneGroupId", zoneGroupId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    GroupMessage message = MapGroupMessage(reader, ref i);
                    if (list == null)
                    {
                        list = new List<GroupMessage>();
                    }
                    list.Add(message);
                });
            return list;
        }

        public List<Message> GetConversation(string chatName)
        {
            string procName = "dbo.Messages_Select_ConversationV2";
            List<Message> messages = null;
            int i = 0;

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@ChatName", chatName);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    Message message = MapSingleMessage(reader, ref i);

                    if (messages == null)
                    {
                        messages = new List<Message>();
                    }
                    messages.Add(message);
                });
            return messages;
        }

        public Message GetById(int messageId)
        {
            string procName = "dbo.Messages_SelectById";
            Message message = null;
            int i = 0;

            _data.ExecuteCmd(
                procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@MessageId", messageId);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    message = MapSingleMessage(reader, ref i);
                });
            return message;
        }

        public void Update(MessageUpdateRequest model)
        {
            string procName = "dbo.Messages_Update";

            _data.ExecuteNonQuery(
                procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@Id", model.Id);
                    AddCommonParams(model, coll);
                },
                returnParameters: null
                );
        }

        public void Delete(int id)
        {
            string procName = "dbo.Messages_Delete_ById";

            _data.ExecuteNonQuery(
                procName,
                inputParamMapper: delegate (SqlParameterCollection coll)
                {
                    coll.AddWithValue("@Id", id);
                },
                returnParameters: null
                );
        }

        private static void AddCommonParams(MessageAddRequest model, SqlParameterCollection coll)
        {
            coll.AddWithValue("@Message", model.Message);
            coll.AddWithValue("@Subject", model.Subject);
            coll.AddWithValue("@RecipientEntityTypeId", model.RecipientEntityTypeId);
            coll.AddWithValue("@RecipientId", model.RecipientId);
            coll.AddWithValue("@ZoneId", model.ZoneId);
            coll.AddWithValue("@DateSent", model.DateSent);
            coll.AddWithValue("@DateRead", model.DateRead);
        }
        private static Message MapSingleMessage(IDataReader reader, ref int i)
        {
            Message msg = new Message();
            i = 0;

            msg.Id = reader.GetSafeInt32(i++);
            msg.MessageBody = reader.GetSafeString(i++);
            msg.Subject = reader.GetSafeString(i++);
            
            string recipientDataAsString = reader.GetSafeString(i++);
            if (!string.IsNullOrEmpty(recipientDataAsString))
            {
                msg.RecipientData = JsonConvert.DeserializeObject<EntityData>(recipientDataAsString);
            }

            string senderDataAsString = reader.GetSafeString(i++);
            if (!string.IsNullOrEmpty(senderDataAsString))
            {
                msg.SenderData = JsonConvert.DeserializeObject<EntityData>(senderDataAsString);
            }

            msg.ZoneId = reader.GetSafeInt32(i++);
            msg.IsDeleted = reader.GetSafeBool(i++);
            msg.DateSent = reader.GetSafeDateTime(i++);
            msg.DateRead = reader.GetSafeDateTime(i++);

            return msg;
        }
        private static GroupMessage MapGroupMessage(IDataReader reader, ref int i)
        {
            GroupMessage msg = new GroupMessage();
            i = 0;

            msg.Id = reader.GetSafeInt32(i++) ;
            msg.Message = reader.GetSafeString(i++);
            msg.Subject = reader.GetSafeString(i++);
            msg.ZoneGroupId = reader.GetSafeInt32(i++);
            msg.SenderEntityTypeId = reader.GetSafeInt32(i++);
            msg.SenderId = reader.GetSafeInt32(i++);
            msg.ZoneId = reader.GetSafeInt32(i++);
            msg.DateSent = reader.GetSafeDateTime(i++);

            return msg;
        }
    }
}
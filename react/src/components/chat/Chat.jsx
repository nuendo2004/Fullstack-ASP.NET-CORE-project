import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { HubConnectionBuilder } from "@microsoft/signalr";
import toastr from "toastr";

import ChatBox from "./chatbox/ChatBox";
import Message from "./chatbox/Message";

import * as messageService from "../../services/messageService";
import { API_HOST_PREFIX } from "../../services/serviceHelpers";

import debug from "sabio-debug";
const _logger = debug.extend("Chat");

const entityTypes = {
  users: 1,
  trainees: 3,
  zones: 6,
  zoneGroups: 9,
};

function Chat(props) {
  const {
    currentUser,
    traineeAccount,
    recipientUser,
    groupChatData,
    currentZone,
    zoneEntity,
    isRequestingChatHistory,
  } = props;

  const [connection, setConnection] = useState(null);
  const [chatData, setChatData] = useState(null);
  const [chatMessageData, setChatMessageData] = useState({
    messagesArray: [],
    messagesComponents: [],
  });

  const getChatDataParticipants = () => {
    let newSenderData = "";
    if (traineeAccount) {
      newSenderData = {
        id: traineeAccount.id,
        entityTypeId: entityTypes.trainees,
        name: traineeAccount.username,
        avatarUrl: traineeAccount.avatarUrl,
      };
    } else if (currentUser) {
      newSenderData = {
        id: currentUser.id,
        entityTypeId: entityTypes.users,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        avatarUrl: currentUser.avatarUrl,
      };
    }
    let newRecipientData = "";
    if (groupChatData) {
      newRecipientData = {
        id: groupChatData.id,
        entityTypeId: entityTypes.zoneGroups,
        name: groupChatData.name,
        avatarUrl: groupChatData.imageUrl,
      };
    } else if (recipientUser) {
      newRecipientData = {
        id: recipientUser.id,
        entityTypeId: entityTypes.users,
        name: `${recipientUser.firstName} ${recipientUser.lastName}`,
        avatarUrl: recipientUser.avatarUrl,
      };
    } else if (zoneEntity) {
      newRecipientData = {
        id: zoneEntity.id,
        entityTypeId: entityTypes.zones,
        name: zoneEntity.name,
        avatarUrl: zoneEntity.imageUrl,
      };
    }
    const newParticipants = {
      senderData: newSenderData,
      recipientData: newRecipientData,
    };
    setChatData((prevChatData) => {
      const newChatData = { ...prevChatData };
      newChatData.participants = newParticipants;
      return newChatData;
    });
    if (props.passChatParticipants) {
      props.passChatParticipants(newParticipants);
    }
  };

  const handleNewMessage = (message) => {
    if (message) {
      const mappedMessage = mapMessage(message);
      setChatMessageData((prevChat) => {
        const newChat = { ...prevChat };
        newChat.messagesArray = [...newChat.messagesArray, message];
        newChat.messagesComponents = [
          ...newChat.messagesComponents,
          mappedMessage,
        ];
        return newChat;
      });
    }
  };
  const getChatName = (participants) => {
    // chatName format: "S(E#-I#)_R(E#-I#)"
    // S = Sender, R = Recipient, E = EntityTypeId, I = EntityId
    // For user-user chat, Sender_Recipient organization is done by EntityId, ascending
    let chatName = "";
    if (groupChatData) {
      chatName = `${groupChatData.id}`;
    } else if (participants) {
      const { senderData, recipientData } = participants;
      chatName =
        senderData.id < recipientData.id
          ? `S(E${senderData.entityTypeId}-I${senderData.id})_R(E${recipientData.entityTypeId}-I${recipientData.id})`
          : `S(E${recipientData.entityTypeId}-I${recipientData.id})_R(E${senderData.entityTypeId}-I${senderData.id})`;
    }
    setChatData((prevData) => {
      const newData = { ...prevData };
      newData.chatName = chatName;
      return newData;
    });
    if (props.passChatName) {
      props.passChatName(chatName);
    }
    return chatName;
  };

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${API_HOST_PREFIX}/chat`)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          _logger("Connection successful", result);
          connection.invoke("AddToGroup", getChatName(chatData.participants));
          connection.on("ReceiveMessage", handleNewMessage);
        })
        .catch(onStartConnectionError);
    }
  }, [connection]);

  useEffect(() => {
    getChatDataParticipants();
  }, [traineeAccount]);

  useEffect(() => {
    if (isRequestingChatHistory && chatData?.chatName) {
      messageService
        .getConversation(chatData.chatName)
        .then(onGetConversationSuccess)
        .catch(onGetConversationError);
    }
  }, [chatData?.chatName]);

  const onGetConversationSuccess = (response) => {
    _logger("GetConversation Success", response.item);
    if (response.item) {
      const arrayOfMessages = response.item;
      setChatMessageData((messageThread) => {
        const newMessageThread = { ...messageThread };
        newMessageThread.messagesArray = arrayOfMessages;
        newMessageThread.messagesComponents = arrayOfMessages.map(mapMessage);
        return newMessageThread;
      });
    }
  };

  function mapMessage(message) {
    return (
      <Message
        key={"msg" + message.id}
        messageData={message}
        activeChatSender={chatData.participants.senderData}
      />
    );
  }
  const onStartConnectionError = (error) => {
    _logger("Connection failed:", error);
    toastr.error("Connection failed");
  };
  const onGetConversationError = (error) => {
    _logger("GetConversation failed:", error);
    toastr.error("Failed to get conversation");
  };
  return (
    <>
      {chatData?.participants && chatData?.chatName && (
        <ChatBox
          chatData={chatData}
          chatMessageData={chatMessageData}
          currentZone={currentZone}
        />
      )}
    </>
  );
}

Chat.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
  traineeAccount: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
  recipientUser: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatarUrl: PropTypes.number,
  }),
  zoneEntity: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
  groupChatData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
  currentZone: PropTypes.number.isRequired,
  passChatName: PropTypes.func,
  passChatParticipants: PropTypes.func,
  isRequestingChatHistory: PropTypes.bool.isRequired,
};

export default Chat;

import React, { useReducer, useState } from "react";
import { ChatContext } from "context/Context";
import { UsersList } from "data/dashboard/chat/UsersData";
import MessagesData from "data/dashboard/chat/MessagesData";
import ChatThreadsData from "data/dashboard/chat/ChatThreadsData";
import ChatGroupsData from "data/dashboard/chat/ChatGroupsData";
import { ChatReducer } from "reducers/ChatReducer";
import PropTypes from "prop-types";

const ChatProvider = ({ children }) => {
  const [activeThread, setActiveThread] = useState(ChatThreadsData[0]);

  const [ChatState, ChatDispatch] = useReducer(ChatReducer, {
    messages: MessagesData,
    threads: ChatThreadsData,
    users: UsersList,
    groups: ChatGroupsData,
    loggedInUserId: 21,
    activeThread,
    setActiveThread,
  });

  return (
    <ChatContext.Provider value={{ ChatState, ChatDispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

ChatProvider.propTypes = {
  children: PropTypes.string,
};

export default ChatProvider;

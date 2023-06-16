import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import SimpleBar from "simplebar-react";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Styles from "../chat.module.css";

function ChatBox({ chatData, chatMessageData, currentZone }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({
      behavior: "auto",
      block: "end",
      inline: "nearest",
    });
  };

  useEffect(scrollToBottom);
  return (
    <>
      <ChatHeader
        chatMessagesArray={chatMessageData.messagesArray}
        chatData={chatData}
      />
      <SimpleBar className={Styles.simple_bar_chat_box}>
        {chatMessageData.messagesComponents}
        <div ref={messagesEndRef} />
      </SimpleBar>
      <ChatInput chatData={chatData} currentZone={currentZone} />
    </>
  );
}

ChatBox.propTypes = {
  currentZone: PropTypes.number.isRequired,
  chatData: PropTypes.shape({}).isRequired,
  chatMessageData: PropTypes.shape({
    messagesArray: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    messagesComponents: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }),
};

export default ChatBox;

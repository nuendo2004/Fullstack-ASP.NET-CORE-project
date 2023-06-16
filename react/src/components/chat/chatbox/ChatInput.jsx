import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import Styles from "../chat.module.css";

import sendMessage from "./sendMessage";

function ChatInput({ chatData, currentZone }) {
  const [message, setMessage] = useState("");

  const onFormChange = (e) => {
    const value = e.currentTarget.value;
    setMessage(() => {
      const newMessage = value;
      return newMessage;
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage(message, chatData, currentZone);
    setMessage("");
  };

  return (
    <div className={Styles.chat_input_wrapper}>
      <div className="p-2 rounded-3 shadow-sm">
        <Form.Control
          as="textarea"
          placeholder="Send a message"
          id="Excerpt"
          value={message}
          onChange={onFormChange}
          className={Styles.chat_input_field}
        />
        <div className="position-absolute end-0 mt-n7 me-4">
          <Button
            variant="none"
            bsPrefix="btn"
            type="submit"
            className="fs-3 text-primary btn-focus-none pt-2"
            onClick={handleSendMessage}
          >
            <i className="fe fe-send"></i>
          </Button>
        </div>
      </div>
    </div>
  );
}

ChatInput.propTypes = {
  chatData: PropTypes.shape({
    participants: PropTypes.shape({
      senderData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        entityTypeId: PropTypes.number.isRequired,
      }),
      recipientData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        entityTypeId: PropTypes.number.isRequired,
      }),
    }),
    chatName: PropTypes.string.isRequired,
  }),
  currentZone: PropTypes.number.isRequired,
};

export default ChatInput;

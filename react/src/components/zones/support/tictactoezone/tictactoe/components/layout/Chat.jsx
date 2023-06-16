import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import debug from "sabio-debug";
import { Send } from "react-bootstrap-icons";
const _logger = debug.extend("tto");

export default function Chat({ currentUser, sendMessage, chatBox }) {
  const [message, setMessage] = useState([]);
  const [chat, setChat] = useState([]);
  const handleSendMessage = () => {
    sendMessage(message);
    setMessage("")
  };
  useEffect(() => {
    if (chatBox) {
      mapChat(chatBox);
    }
  }, [chatBox]);

  const handleChange = (e) => {
    const { value } = e.target;
    setMessage(value);
    if (e.key === "Enter") {
      sendMessage(value);
      setMessage("")
    };
  };

  const renderChat = ({ messages }) => {
    _logger("render", messages.user, messages.isLocal);
    return (
      <>
        {messages.isLocal ? (
          <li className="tto-in">
            <div className="tto-chat-img">
              <img
                alt="Avtar"
                src="https://bootdey.com/img/Content/avatar/avatar1.png"
              />
            </div>
            <div className="tto-chat-body">
              <div className="tto-chat-message">
                <h5>{currentUser.firstName}</h5>
                <p>{messages.msg}</p>
              </div>
            </div>
          </li>
        ) : (
          <li className="tto-out">
            <div className="tto-chat-img">
              <img
                alt="Avtar"
                src="https://bootdey.com/img/Content/avatar/avatar6.png"
              />
            </div>
            <div className="tto-chat-body">
              <div className="tto-chat-message">
                <h5>{messages.user}</h5>
                <p>{messages.msg}</p>
              </div>
            </div>
          </li>
        )}
      </>
    );
  };
  const mapChat = (chatBox) => {
    _logger(chatBox);
    setChat((ps) => {
      let ns = [...ps];
      ns.push(renderChat(chatBox));
      return ns;
    });
  };

  return (
    <div className="container tto-content">
      <div className="row">
        <div className="tto-chatwrap">
          <div className="card">
            <div className="card-header">Chat</div>
            <div className="card-body height3">
              <ul className="tto-chat-list">{chat ? chat : ""}</ul>
            </div>
            <div className="tto-chat-button">
              <Form.Group className="mb-3 tto-input-send">
                <Form.Control
                  type="email"
                  onChange={handleChange}
                  onKeyPress={handleChange}
                  value={message}
                  placeholder="Send a message"
                />
              <Button onClick={handleSendMessage}><Send size={40}/></Button>
              </Form.Group>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Chat.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }).isRequired,
  chatBox: PropTypes.shape({
    messages: PropTypes.shape({
      user: PropTypes.string.isRequired,
      msg: PropTypes.string.isRequired,
      isLocal: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
  sendMessage: PropTypes.func.isRequired,
};

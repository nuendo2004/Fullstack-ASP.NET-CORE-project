import React from "react";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";

import Styles from "../chat.module.css";
import { useNavigate } from "react-router-dom";

function Message({ messageData, lastRef, activeChatSender }) {
  const navigate = useNavigate();
  const dateTimeSent = new Date(messageData.dateSent);
  const dateSent = dateTimeSent.toDateString().slice(4);
  const timeSent = dateTimeSent.toTimeString().slice(0, 5);

  const generateMessageText = (messageData) => {
    let messageText = "";
    if (messageData.messageBody.startsWith("$$$")) {
      const [link, innerText] = messageData.messageBody.split(",");
      messageText = (
        <a
          href={"#"}
          onClick={() => navigate(link.substring(3))}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(innerText),
          }}
        ></a>
      );
    } else {
      messageText = <p className="mb-0">{messageData.messageBody}</p>;
    }
    return messageText;
  };
  const messageText = generateMessageText(messageData);
  return (
    <div className="container-fluid overflow-hidden">
      {activeChatSender.id === messageData.senderData.id ? (
        // Sender-side message mapping
        <div className="d-flex justify-content-end mb-4">
          <div className="d-flex">
            <div className="me-3 text-end">
              <small className={Styles.date_time}>
                {" "}
                {dateSent} {timeSent}{" "}
              </small>
              <div className="d-flex justify-content-end">
                <div className={Styles.send_textbox}>
                  <div className="text-start">{messageText}</div>
                </div>
              </div>
            </div>
            <div
              className={Styles.avatar}
              style={{
                backgroundImage: `url(${messageData.senderData.avatarUrl})`,
              }}
            ></div>
          </div>
        </div>
      ) : (
        // Recipient-side message mapping
        <div className="d-flex mb-4">
          <div
            className={Styles.avatar}
            style={{
              backgroundImage: `url(${messageData.senderData.avatarUrl})`,
            }}
          ></div>
          <div className="ms-3">
            {messageData.recipientData.entityTypeId === 9 ? (
              <div>{messageData.senderData.name}</div>
            ) : null}
            <div className="d-flex">
              <div className={Styles.receive_textbox}>
                <div className="">{messageText}</div>
              </div>
              <div className="ms-2 mt-2"></div>
            </div>
            <small className={Styles.date_time}>
              {dateSent} {timeSent}{" "}
            </small>
          </div>
        </div>
      )}
      <div ref={lastRef}></div>
    </div>
  );
}

Message.propTypes = {
  activeChatSender: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  messageData: PropTypes.shape({
    messageBody: PropTypes.string.isRequired,
    recipientData: PropTypes.shape({
      entityTypeId: PropTypes.number.isRequired,
    }),
    senderData: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }),
    dateSent: PropTypes.string.isRequired,
  }),
  lastRef: PropTypes.shape({}),
};
export default Message;

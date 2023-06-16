import React from "react";
import PropTypes from "prop-types";

import Styles from "../chat.module.css";

export default function ChatHeader({ chatData }) {
  return chatData ? (
    <div className={Styles.header_wrapper}>
      <div
        className={Styles.header_image}
        style={{
          backgroundImage: `url(${chatData.participants.recipientData?.avatarUrl})`,
        }}
      ></div>
      <div className={Styles.header_text}>
        {chatData.participants.recipientData?.name}
      </div>
    </div>
  ) : (
    <div className={Styles.header_wrapper}>Loading...</div>
  );
}

ChatHeader.propTypes = {
  chatData: PropTypes.shape({
    participants: PropTypes.shape({
      recipientData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string.isRequired,
      }),
    }),
  }),
};

import React from "react";
import { MailContext } from "context/Context";
import MailsData from "data/dashboard/mail/MailsData";
import PropTypes from "prop-types";

const MailProvider = ({ children }) => {
  const [mailContextValue] = [
    {
      mails: MailsData,
      filters: ["None", "All", "Read", "Unread", "Starred", "Unstarred"],
      activeFilter: "None",
    },
  ];
  return (
    <MailContext.Provider value={{ mailContextValue }}>
      {children}
    </MailContext.Provider>
  );
};

MailProvider.propTypes = {
  children: PropTypes.string,
};

export default MailProvider;

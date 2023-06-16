import React, { useState, useEffect } from "react";
import TicTacToe from "./TicTacToeZone";
import propTypes from "prop-types";
import { HandleSecurityEvent } from "./components/layout/HandleSecurityEvent";
import {
  securityEventOne,
  securityEventFour,
} from "./components/layout/SecurityEvents";
import { v4 as uuid } from "uuid";

function TicTacToeWrapper({ currentUser }) {
  const [playerInfo, setPlayerInfo] = useState({});

  useEffect(() => {
    setPlayerInfo((ps) => {
      const uniqueId = uuid();
      const trimmedId = uniqueId.slice(0, 8);
      let ns = { ...ps };
      ns = currentUser;
      ns.longId = uniqueId;
      ns.shortId = trimmedId;
      ns.wins = 0;
      ns.losses = 0;
      ns.securityEvents = 0;
      ns.score = 0;
      ns.zoneId = 123;
      return ns;
    });
  }, []);

  HandleSecurityEvent(
    securityEventOne,
    ["Control", "Shift", "E"],
    playerInfo.longId,
    currentUser
  );
  HandleSecurityEvent(
    securityEventFour,
    ["Control", "Shift", "E"],
    playerInfo.longId,
    currentUser
  );

  return (
    <>
      <div className="tto-wrapper">
        <TicTacToe currentUser={currentUser} />
      </div>
    </>
  );
}
TicTacToeWrapper.propTypes = {
  currentUser: propTypes.shape({
    id: propTypes.number.isRequired,
    email: propTypes.string.isRequired,
    firstName: propTypes.string,
    isLoggedIn: propTypes.bool.isRequired,
    roles: propTypes.arrayOf(propTypes.string),
  }).isRequired,
};
export default TicTacToeWrapper;

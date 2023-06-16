import React, { useEffect, useState } from "react";
import Local from "./components/gamemodes/TicTacToeLocal";
import Multi from "./components/gamemodes/TicTacToeMulti";
import Bot from "./components/gamemodes/botmode/TicTacToeBot";
import PropTypes from "prop-types";

function TicTacToe(props) {
  const [gameMode, setGameMode] = useState({});

  useEffect(() => {
    if (props.payload) {
      setGameMode(props.payload);
    }
  }, [props.payload]);

  const currentGameMode = () => {
    let comp;
    switch (true) {
      case gameMode.local:
        comp = <Local currentUser={props.currentUser} />;
        break;
      case gameMode.bot:
        comp = <Bot currentUser={props.currentUser} />;
        break;
      case gameMode.multi:
        comp = <Multi currentUser={props.currentUser} />;
        break;
      default:
        comp = <h1>loading</h1>;
        break;
    }
    return comp;
  };

  return (
    <div>
      <div className="tto-menu-container"></div>
      {currentGameMode()}
    </div>
  );
}

export default TicTacToe;

TicTacToe.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }).isRequired,
  payload: PropTypes.shape({
    local: PropTypes.bool.isRequired,
    multi: PropTypes.bool.isRequired,
    bot: PropTypes.bool.isRequired,
  }).isRequired,
};

import React, { useState } from "react";
import Local from "./components/gamemodes/TicTacToeLocal";
import Multi from "./components/gamemodes/TicTacToeMulti";
import Bot from "./components/gamemodes/botmode/TicTacToeBot";
import Menu from "./TicTacToeMenu";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

function TicTacToe({ currentUser }) {
  const [gameMode, setGameMode] = useState({
    local: false,
    multi: false,
    bot: false,
  });

  const handleOptionSelected = async (e) => {
    let { name } = e.target;
    setGameMode((ps) => {
      let ns = { ...ps };
      ns[name] = !gameMode[name];
      return ns;
    });
  };

  const GameMode = () => {
    return (
      <>
        {gameMode.local ? (
          <Local currentUser={currentUser} />
        ) : gameMode.bot ? (
          <Bot currentUser={currentUser} />
        ) : gameMode.multi ? (
          <Multi currentUser={currentUser} />
        ) : (
          <Menu
            handleOptionSelected={handleOptionSelected}
            options={gameMode}
          />
        )}
      </>
    );
  };

  const handleMenuClick = () => {
    setGameMode((ps) => {
      let ns = { ...ps };
      ns.bot = false;
      ns.multi = false;
      ns.local = false;
      return ns;
    });
    window.location.reload();
  };

  return (
    <div>
      <div className="tto-menu-container">
        <Button onClick={handleMenuClick} className="tto-menu-btn">
          Main Menu
        </Button>
      </div>
      <GameMode currentUser={currentUser} />
    </div>
  );
}
TicTacToe.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TicTacToe;

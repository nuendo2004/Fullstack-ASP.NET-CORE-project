import React from "react";
import ttoThumbnail from "../../assets/images/background/tto-menu.png";
import propTypes from "prop-types";
import Leaderboard from "./components/layout/Leaderboard";

function TicTacToeMenu({ handleOptionSelected, options }) {
  const boardLeaders = [
    {
      firstName: "Adam",
      lastName: "Leymeister",
      score: "99999",
      userName: "ttoMeister",
    },
    {
      firstName: "TimTim",
      lastName: "McTimmerson",
      score: "3432",
      userName: "TmcTimmerson",
    },
    {
      firstName: "Frank",
      lastName: "Frankenson",
      score: "2753",
      userName: "FrAnkSon",
    },
    {
      firstName: "Jay",
      lastName: "Son",
      score: "1943",
      userName: "jSon",
    },
  ];

  return (
    <>
      <h1 className="tto-menu-title">Tic Tac Toe</h1>
      <div className="tto-menu">
        <img src={ttoThumbnail} alt="thumbnail" />
        <div>
          <button
            className="btn tto-btn tto-btn-multi"
            name="multi"
            value={options?.multi}
            onClick={handleOptionSelected}
          >
            Play Online
          </button>
          <button
            className="btn tto-btn tto-btn-bot"
            name="bot"
            value={options?.bot}
            onClick={handleOptionSelected}
          >
            Play vs Robot
          </button>
          <button
            className="btn tto-btn tto-btn-local"
            name="local"
            value={options?.local}
            onClick={handleOptionSelected}
          >
            Play Local Game
          </button>
          <button
            className="btn tto-btn tto-btn-local"
            name="local"
            value={options?.local}
            onClick={handleOptionSelected}
          >
            Play with a Friend
          </button>
        </div>
      </div>
      <Leaderboard leaders={boardLeaders} />
    </>
  );
}

export default TicTacToeMenu;

TicTacToeMenu.propTypes = {
  handleOptionSelected: propTypes.func.isRequired,
  options: propTypes.shape({
    bot: propTypes.bool.isRequired,
    multi: propTypes.bool.isRequired,
    local: propTypes.bool.isRequired,
  }).isRequired,
};

import React, { useEffect } from "react";
import TicTacToePicture from "../../../../../assets/images/background/tto-menu.png";
import propTypes from "prop-types";
import Leaderboard from "./components/layout/Leaderboard";
import { useState } from "react";
import "./tictactoe.css";
import logger from "sabio-debug";

const _logger = logger.extend("TicTacToeMenu");

function TicTacToeZoneMenu(props) {
  useEffect(() => {
    _logger(
      "currentUser and zoneMainNavi",
      props.currentUser,
      props.navigateToZoneMain
    );
  });
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
      userName: "FrankieSun",
    },
    {
      firstName: "Jay",
      lastName: "Son",
      score: "1943",
      userName: "jSon",
    },
  ];

  const [gameMode, setGameMode] = useState({
    local: false,
    multi: false,
    bot: false,
  });

  const handleOptionSelected = async (e) => {
    let { name } = e.target;
    if (name) {
      setGameMode((ps) => {
        let ns = { ...ps };
        ns[name] = !gameMode[name];
        return ns;
      });
    }
  };

  useEffect(() => {
    if (gameMode.local || gameMode.multi || gameMode.bot) {
      if (props.navigateToZoneMain) {
        props.navigateToZoneMain(gameMode);
      }
    }
  }, [gameMode]);

  return (
    <>
      <div className="text-center">
        <h1 className="tto-menu-title ttictactoe-menu-font-1">
          T<span className="ttictactoe-menu-font-2">i</span>c T
          <span className="ttictactoe-menu-font-2">a</span>c T
          <span className="ttictactoe-menu-font-2">o</span>e
        </h1>
        <div>
          <img src={TicTacToePicture} alt="thumbnail" />
          <div className="m-3">
            <div className="inline-menutictac">
              <button
                className="btn tto-btn-multi"
                name="multi"
                value={gameMode?.multi}
                onClick={handleOptionSelected}
              >
                Play Online
              </button>
            </div>
            <div className="inline-menutictac">
              <button
                className="btn tto-btn-bot "
                name="bot"
                value={gameMode?.bot}
                onClick={handleOptionSelected}
              >
                Play vs Robot
              </button>
            </div>
            <div className="inline-menutictac">
              <button
                className="btn tto-btn-local "
                name="local"
                value={gameMode?.local}
                onClick={handleOptionSelected}
              >
                Play Local Game
              </button>
            </div>
          </div>
        </div>
        <Leaderboard leaders={boardLeaders} />
      </div>
    </>
  );
}

TicTacToeZoneMenu.propTypes = {
  currentUser: propTypes.shape({
    id: propTypes.number,
    email: propTypes.string,
    firstName: propTypes.string,
    isLoggedIn: propTypes.bool,
    roles: propTypes.arrayOf(propTypes.string),
    currentTraineeId: propTypes.number,
  }).isRequired,
  navigateToZoneMain: propTypes.func.isRequired,
};
export default TicTacToeZoneMenu;

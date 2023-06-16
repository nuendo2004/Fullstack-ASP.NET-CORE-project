import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import "../../../zones/tasks/checkers/checkers.css";
import CheckerBoard from "./CheckerBoard";
import debug from "sabio-debug";
import ZoneLogger from "components/zonetracker/ZoneLogger";
const _logger = debug.extend("Checkers");

function Checkers(currentUser) {
  _logger("curr user", currentUser);
  const player = currentUser.currentUser;

  const [game, setGame] = useState({
    hasStarted: false,
    startGame: false,
    endGame: false,
    isLegalMove: true,
    winner: "",
  });
  _logger("game", game, setGame);

  const [playerOne, setPlayerOne] = useState({
    firstName: "",
    avatar: "",
    isTurn: true,
    color: "red",
    pieces: 12,
  });

  const [playerTwo] = useState({
    firstName: "PlayerTwo",
    avatar: "https://bit.ly/3ZElmpn",
    isTurn: false,
    color: "black",
    pieces: 12,
  });

  useEffect(() => {
    setPlayerOne((prevState) => {
      const player1 = { ...prevState };
      player1.firstName = player.firstName;
      player1.avatar = player.avatarUrl;

      return player1;
    });
  }, []);

  return (
    <React.Fragment>
      <ZoneLogger entityId={currentUser.currentUser.currentTraineeId} />
      <div className={playerOne.isTurn ? "player-turn" : "players"}>
        <Image
          src={playerOne.avatar}
          alt=""
          className="rounded-circle avatar-xl mb-3 mb-lg-0 "
        />
        {playerOne.firstName}
      </div>
      <div className={playerTwo.isTurn ? "player-turn" : "players"}>
        <Image
          src={playerTwo.avatar}
          alt=""
          className="rounded-circle avatar-xl mb-3 mb-lg-0 "
        />
        {playerTwo.firstName}
      </div>
      <div className="container py-3 check-container">
        <div className="row">
          <CheckerBoard currentUser={playerOne} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default React.memo(Checkers);

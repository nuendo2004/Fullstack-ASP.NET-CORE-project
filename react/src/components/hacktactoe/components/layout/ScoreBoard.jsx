import React from "react";
import "../../tictactoe.css";
import propTypes from "prop-types";

export function ScoreBoard({ currentUser, isPlayer, scores, opponent }) {
  const { playerOneScore, playerTwoScore } = scores;
  return (
    <div className="tto-scoreboard">
      <span className={`tto-score tto-x-score ${!isPlayer && "tto-inactive"}`}>
        {currentUser?.firstName}: {playerOneScore}{" "}
      </span>
      <span className={`tto-score tto-o-score ${isPlayer && "tto-inactive"}`}>
        {opponent}: {playerTwoScore}
      </span>
    </div>
  );
}

ScoreBoard.propTypes = {
  isPlayer: propTypes.bool.isRequired,
  currentUser: propTypes.shape({
    firstName: propTypes.string.isRequired,
  }).isRequired,
  scores: propTypes.shape({
    playerOneScore: propTypes.number.isRequired,
    playerTwoScore: propTypes.number.isRequired,
  }).isRequired,
  opponent: propTypes.string.isRequired
};

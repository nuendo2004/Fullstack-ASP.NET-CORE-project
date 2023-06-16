import React, { useState } from "react";
import { Board } from "../layout/Board.jsx";
import { ScoreBoard } from "../layout/ScoreBoard.jsx";
import { ResetButton } from "../layout/ResetButton.jsx";
import PropTypes from "prop-types";
import debug from "sabio-debug";
import {
  wonHackTacToeGame,
  lostHackTacToeGame,
} from "../layout/recordHackTacToeTaskEvents";
const _logger = debug.extend("tto");

function TicTacToeLocal({ currentUser }) {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isPlayer, setPlayer] = useState(true);
  const [scores, setScores] = useState({
    playerOneScore: 0,
    playerTwoScore: 0,
  });
  const [gameOver, setGameOver] = useState(false);
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const isTurn = true;

  const handleBoxClicked = (idx) => {
    const updateBoard = board.map((value, index) => {
      if (idx === index) {
        return isPlayer === true ? "X" : "O";
      } else {
        return value;
      }
    });

    const winner = checkWinner(updateBoard);

    if (winner) {
      if (winner === "O") {
        let { playerTwoScore } = scores;
        playerTwoScore += 1;
        setScores((prevState) => {
          let ns = { ...prevState };
          ns.playerTwoScore = playerTwoScore;
          return ns;
        });
        wonHackTacToeGame(currentUser);
      } else {
        let { playerOneScore } = scores;
        playerOneScore += 1;
        setScores((prevState) => {
          let ns = { ...prevState };
          ns.playerOneScore = playerOneScore;
          return ns;
        });
        lostHackTacToeGame(currentUser);
      }
    }

    setBoard(updateBoard);
    setPlayer(!isPlayer);
  };

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(""));
  };

  const checkWinner = (board) => {
    for (let i = 0; i < winConditions.length; i++) {
      const [x, y, z] = winConditions[i];

      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        _logger("-----WINNER-----", board[x]);
        setGameOver(true);
        return board[x];
      }
    }
  };
  return (
    <>
      <ScoreBoard
        currentUser={currentUser}
        isPlayer={isPlayer}
        scores={scores}
        opponent={"Player Two"}
      />
      <Board
        isTurn={isTurn}
        board={board}
        onTileClicked={gameOver ? resetBoard : handleBoxClicked}
      />
      <ResetButton resetBoard={resetBoard} />
    </>
  );
}
TicTacToeLocal.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TicTacToeLocal;

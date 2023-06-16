import React, { useState, useEffect } from "react";

import { Board } from "../../layout/Board.jsx";
import { ScoreBoard } from "../../layout/ScoreBoard.jsx";
import Terminal from "../../terminal/TerminalContainer";
import { ResetButton } from "../../layout/ResetButton.jsx";
import { HandleSecurityEvent } from "../../layout/HandleSecurityEvent";
import {
  securityEventTwo,
  securityEventThree,
} from "../../layout/SecurityEvents";
import Chat from "../../../../../../../chat/Chat";
import runBot from "./chatBot";

import PropTypes from "prop-types";
import toastr from "toastr";

import zonesService from "services/zonesServices.js";

import Styles from "../../../../../../../chat/chat.module.css";

import debug from "sabio-debug";
const _logger = debug.extend("TicTacToeBot");

const ticTacToeZone = 7;

function TicTacToeBot({ currentUser }) {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isPlayer, setIsPlayer] = useState(true);
  const [botMove, setBotMove] = useState(0);
  const [isTerminal, setIsTerminal] = useState(false);
  const [scores, setScores] = useState({
    playerOneScore: 0,
    playerTwoScore: 0,
  });
  const [gameOver, setGameOver] = useState(false);
  const [zoneData, setZoneData] = useState(null);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [chatData, setChatData] = useState(null);
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

  const getChatName = (chatName) => {
    setChatData((prevData) => {
      const newData = { ...prevData };
      newData.chatName = chatName;
      return newData;
    });
  };
  const getChatParticipants = (chatParticipants) => {
    setChatData((prevData) => {
      const newData = { ...prevData };
      newData.chatParticipants = chatParticipants;
      return newData;
    });
  };

  useEffect(() => {
    zonesService
      .getZoneById(ticTacToeZone)
      .then(onGetZoneSuccess)
      .catch(onGetZoneError);
  }, []);

  useEffect(() => {
    if (chatData?.chatParticipants && chatData?.chatName && ticTacToeZone) {
      runBot(chatData, ticTacToeZone, gamesPlayed);
    }
  }, [gamesPlayed, chatData]);

  useEffect(() => {
    if (gameOver) {
      setGamesPlayed((prevGamesPlayed) => {
        let newGamesPlayed = prevGamesPlayed;
        newGamesPlayed += 1;
        return newGamesPlayed;
      });
      resetBoard();
    }
    if (!isPlayer) {
      if (botMove !== -1) {
        setTimeout(() => {
          handleBoxClicked(botMove);
        }, 1000);
      } else {
        handleBotTurn();
      }
    }
  }, [isPlayer, gameOver, botMove]);

  const onGetZoneSuccess = (response) => {
    _logger("GetZoneSuccess", response);
    setZoneData(response.item);
  };
  const onGetZoneError = (error) => {
    _logger("Zone data could not be found", error);
    toastr.error("Something went wrong.");
  };

  const handleBoxClicked = (idx) => {
    const updateBoard = board.map((value, index) => {
      if (idx === index) {
        return isPlayer === true ? "X" : "O";
      } else {
        return value;
      }
    });

    const winner = checkWinner(updateBoard);
    if (winner && !gameOver) {
      if (winner === "O") {
        let { playerTwoScore } = scores;
        playerTwoScore += 1;
        setScores((prevState) => {
          let ns = { ...prevState };
          ns.playerTwoScore = playerTwoScore;
          return ns;
        });
      } else {
        let { playerOneScore } = scores;
        playerOneScore += 1;
        setScores((prevState) => {
          let ns = { ...prevState };
          ns.playerOneScore = playerOneScore;
          return ns;
        });
      }
    }
    if (!gameOver) {
      setBoard(updateBoard);
      setIsPlayer(!isPlayer);
      const boxBest = findBestSquare(updateBoard);
      setBotMove(boxBest);
    }
    const tie = isBoardFilled(updateBoard);
    if (tie) {
      setGameOver(true);
      resetBoard();
    }
  };

  const resetBoard = () => {
    setTimeout(() => {
      setBoard(Array(9).fill(""));
      setGameOver(false);
    }, 3000);
  };

  const renderTerminal = () => {
    setIsTerminal(!isTerminal);
  };
  const removePlayerValues = () => {
    let player = isPlayer === true ? "O" : "X";
    const newBoard = board.map((value) => {
      if (player === value) {
        return "";
      } else {
        return value;
      }
    });
    setBoard(newBoard);
  };
  HandleSecurityEvent(
    securityEventTwo,
    ["Control", "Shift", "Z"],
    "securityEventTwo",
    currentUser,
    removePlayerValues
  );
  HandleSecurityEvent(
    securityEventThree,
    ["Control", "Shift", "I"],
    "securityEventThree",
    currentUser,
    renderTerminal
  );

  const winnerCheck = (board) => {
    for (let i = 0; i < winConditions.length; i++) {
      const [x, y, z] = winConditions[i];

      if (board[x] !== "" && board[x] === board[y] && board[y] === board[z]) {
        return board[x];
      }
    }
  };
  const isBoardFilled = (boxes) => {
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i] === "") {
        return false;
      }
    }
    return true;
  };

  const findBestSquare = (boxes) => {
    const opponent = "X";
    const player = "O";

    const minimax = (boxes, isMax) => {
      const winner = winnerCheck(boxes);

      if (winner === player) return { box: -1, score: 1 };

      if (winner === opponent) return { box: -1, score: -1 };

      if (isBoardFilled(boxes)) return { box: -1, score: 0 };
      const best = { box: -1, score: isMax ? -1000 : 1000 };

      for (let i = 0; i < boxes.length; i++) {
        if (boxes[i] !== "") {
          continue;
        }

        boxes[i] = isMax ? player : opponent;
        const score = minimax(boxes, !isMax).score;
        boxes[i] = "";

        if (isMax) {
          if (score > best.score) {
            best.score = score;
            best.box = i;
          }
        } else {
          if (score < best.score) {
            best.score = score;
            best.box = i;
          }
        }
      }
      return best;
    };
    return minimax(boxes, true).box;
  };

  const handleBotTurn = () => {
    let possibleMoves = board.reduce((moves, box, i) => {
      if (box === "") {
        moves.push(i);
      }
      return moves;
    }, []);

    let move = possibleMoves[~~(Math.random() * possibleMoves.length)];
    return handleBoxClicked(move);
  };

  const checkWinner = (board) => {
    for (let i = 0; i < winConditions.length; i++) {
      const [x, y, z] = winConditions[i];
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x];
      }
    }
  };
  return (
    <>
      <div className="tto-board-chat">
        <div className="tto-leaderBoard-container">
          <ScoreBoard
            isPlayer={isPlayer}
            scores={scores}
            currentUser={currentUser}
            opponent={"Bot"}
          />
          <Board
            isTurn={isPlayer}
            board={board}
            onTileClicked={handleBoxClicked}
          />
          <ResetButton resetBoard={resetBoard} />
          <div className="terminal-container">
            {isTerminal && (
              <Terminal handleSecurityEventTwo={removePlayerValues} />
            )}
          </div>
        </div>
        {zoneData && gamesPlayed ? (
          <div className={Styles.chat_container}>
            <Chat
              currentUser={currentUser}
              currentZone={ticTacToeZone}
              zoneEntity={zoneData}
              passChatName={getChatName}
              passChatParticipants={getChatParticipants}
              isRequestingChatHistory={false}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}
TicTacToeBot.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }).isRequired,
};
export default TicTacToeBot;

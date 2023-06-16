import React, { useState, useEffect } from "react";
import { Board } from "../layout/Board.jsx";
import Chat from "../layout/Chat.jsx";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { ScoreBoard } from "../layout/ScoreBoard.jsx";
import toastr from "toastr";
import Terminal from "../terminal/TerminalContainer";
import PropTypes from "prop-types";
import { HandleSecurityEvent } from "../../components/layout/HandleSecurityEvent";
import {
  securityEventTwo,
  securityEventThree,
  securityEventFour,
} from "../../components/layout/SecurityEvents";
import debug from "sabio-debug";
import { API_HOST_PREFIX } from "../../../../../../../services/serviceHelpers";
import { v4 as uuid } from "uuid";

const _logger = debug.extend("tto");

function TicTacToeMulti({ currentUser }) {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isPlayer, setIsPlayer] = useState(false);
  const [chatBox, setChatBox] = useState();
  const [isTurn, setIsTurn] = useState(false);
  const [isTerminal, setIsTerminal] = useState(false);
  const [connection, setConnection] = useState();
  const [opponent, setOpponent] = useState("Searching");
  const [gameOver, setGameOver] = useState(false);
  const [scores, setScores] = useState({
    playerOneScore: 0,
    playerTwoScore: 0,
  });

  useEffect(() => {
    if (!connection) {
      joinRoom(currentUser.firstName);
    }
    return () => {
      closeConnection();
    };
  }, []);

  const joinRoom = async (user) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl(`${API_HOST_PREFIX}/tictactoe`)
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("HandleDisconnect", (msg) => {
        _logger(msg, "has left the lobby");
      });

      connection.on("HandleTurn", (msg) => {
        setIsTurn(msg);
        setIsPlayer(msg);
      });

      connection.on("HasWon", (message) => {
        try {
          setScores(message);
        } catch (e) {
          toastr.error("Connection Error");
          _logger("HasWon Error", e);
        }
      });

      connection.on("SetScore", (message) => {
        _logger("hasWon", message);
        try {
          setScores(message);
        } catch (e) {
          toastr.error("Connection Error");
          _logger("SetScore Error", e);
        }
      });

      connection.on("ReceiveMessage", (user, message) => {
        _logger(message);
        try {
          setOpponent(user);
          setIsTurn(true);
          setBoard(message);
          checkOver(message);
          _logger(message);
        } catch (e) {
          toastr.error("Connection Error");
          _logger("ReceiveMessage Error", e);
        }
      });
      connection.on("ReceiveChat", (user, message) => {
        setChatBox((ps) => {
          let ns = { ...ps };
          ns.messages = { msg: message, user: user, isLocal: false };
          return ns;
        });
      });
      connection.on("ReceiveMalware", () => {
        securityEventFour(uuid(), currentUser);
      });

      connection.onclose(() => {
        setConnection();
      });

      await connection.start();
      await connection.invoke("RequestRoom", { user });
      setConnection(connection);
    } catch (e) {
      toastr.error("Connection Error");
      _logger("___JOIN ROOM ERROR____", e);
    }
  };
  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      _logger(e);
    }
  };
  const sendMalware = async () => {
    try {
      await connection.invoke("SendMalware");
    } catch (e) {
      _logger(e);
      toastr.error("Connection Error");
    }
  };
  const sendMessage = async (message) => {
    setBoard(message);
    try {
      await connection.invoke("SendMessage", message);
      checkOver(message);
    } catch (e) {
      _logger("sendMessage ERROR", e, message);
      toastr.error("Connection Error");
    }
    setIsTurn(false);
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
    sendMessage(newBoard);
  };

  HandleSecurityEvent(
    sendMalware,
    ["Control", "Shift", "Z"],
    "securityEventTwo",
    currentUser
  );

  HandleSecurityEvent(
    securityEventTwo,
    ["Control", "Shift", "Y"],
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

  const sendChat = async (message) => {
    setChatBox((ps) => {
      let ns = { ...ps };
      ns.messages = {
        msg: message,
        user: currentUser.firstName,
        isLocal: true,
      };
      return ns;
    });
    try {
      await connection.invoke("SendChat", message);
    } catch (e) {
      _logger("sendMessage ERROR", e);
      toastr.error("Connection Error");
    }
  };

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

  const handleBoxClicked = (idx) => {
    const updateBoard = board.map((value, index) => {
      if (idx === index) {
        return isPlayer === true ? "X" : "O";
      } else {
        return value;
      }
    });
    sendMessage(updateBoard);
  };

  const resetBoard = () => {
    setTimeout(() => {
      setBoard(Array(9).fill(""));
      setGameOver(false);
    }, 2000);
  };

  const checkWinner = (board) => {
    for (let i = 0; i < winConditions.length; i++) {
      const [x, y, z] = winConditions[i];

      if (board[x] !== "" && board[x] === board[y] && board[y] === board[z]) {
        return board[x];
      }
    }
  };

  const checkOver = (updatedBoard) => {
    const winner = checkWinner(updatedBoard);
    if (winner) {
      if (winner === "O") {
        setScores((prevState) => {
          let ns = { ...prevState };
          ns.playerTwoScore = ++prevState.playerTwoScore;
          return ns;
        });
      } else {
        setScores((prevState) => {
          let ns = { ...prevState };
          ns.playerOneScore = ++prevState.playerOneScore;
          return ns;
        });
      }
      setGameOver(true);
      resetBoard();
    }
  };

  return (
    <>
      <div className="tto-board-chat">
        <div className="tto-leaderBoard-container">
          <ScoreBoard
            currentUser={currentUser}
            isPlayer={isPlayer}
            scores={scores}
            opponent={opponent}
          />
          <Board
            board={board}
            isTurn={isTurn}
            sendMessage={sendMessage}
            onTileClicked={gameOver ? resetBoard : handleBoxClicked}
          />
          <div className="terminal-container">
            {isTerminal && (
              <Terminal handleSecurityEventTwo={removePlayerValues} />
            )}
          </div>
        </div>

        <Chat
          sendMessage={sendChat}
          currentUser={currentUser}
          chatBox={chatBox}
        />
      </div>
    </>
  );
}
TicTacToeMulti.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TicTacToeMulti;

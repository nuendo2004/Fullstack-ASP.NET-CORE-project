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
  securityEventThree,
  securityEventFour,
  securityEventFive,
  securityEventSix,
  securityEventSeven,
} from "../../components/layout/SecurityEvents";
import debug from "sabio-debug";
import { API_HOST_PREFIX } from "../../../../services/serviceHelpers";
import { v4 as uuid } from "uuid";
import {
  wonHackTacToeGame,
  lostHackTacToeGame,
  wasHacked,
  hackedOpponent,
  wasCountered,
  counteredOpponent,
} from "../layout/recordHackTacToeTaskEvents";
import Swal from "sweetalert2";

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
  const [defense, setDefense] = useState(false);
  const [lastPlayer, setLastPlayer] = useState({
    id: 0,
  });

  useEffect(() => {
    if (!connection) {
      joinRoom(currentUser.firstName);
    }
    return () => {
      closeConnection();
    };
  }, []);

  useEffect(() => {
    if (gameOver === true) {
      if (currentUser.id === lastPlayer.id) {
        lostHackTacToeGame(currentUser);
      } else {
        wonHackTacToeGame(currentUser);
      }
    }
  }, [gameOver]);

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

      connection.on("ReceiveMessage", (user, message, fromUserId) => {
        _logger(message);
        try {
          setOpponent(user);
          setIsTurn(true);
          setBoard(message);
          checkOver(message);
          setLastPlayer((ps) => {
            let ns = { ...ps };
            ns.id = fromUserId;
            return ns;
          });
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
        wasHacked(currentUser);
      });
      connection.on("ReceiveDefenseNotice", () => {
        setDefense(true);
      });
      connection.on("ReceiveMoveRemoval", () => {
        securityEventSeven(uuid(), currentUser);
      });
      connection.on("ReceiveCounterWinCallback", () => {
        counteredOpponent(currentUser);
        Swal.fire({
          title: "COUNTERED OPPONENT!",
          text: `Your system has countered an opponent that attempted a Hack`,
          icon: "success",
          confirmButtonText: "Accept",
        });
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
    if (!defense) {
      try {
        Swal.fire({
          title: "HACKED OPPONENT!",
          text: `Your system has successfully Hacked an opponent's files`,
          icon: "success",
          confirmButtonText: "Accept",
        });
        await connection.invoke("SendMalware");
        hackedOpponent(currentUser);
      } catch (e) {
        _logger(e);
        toastr.error("Connection Error");
      }
    } else {
      securityEventFive(uuid(), currentUser);
      try {
        await connection.invoke("SendCounterWinCallback");
        wasCountered(currentUser);
      } catch (e) {
        _logger(e);
        toastr.error("Connection Error");
      }
    }
  };

  const sendMoveRemoval = async () => {
    if (!defense) {
      try {
        removePlayerValues();
        Swal.fire({
          title: "REMOVED OPPONENT'S MOVES!",
          text: `Your system has successfully removed an opponent's moves`,
          icon: "success",
          confirmButtonText: "Accept",
        });
        await connection.invoke("SendMoveRemoval");
      } catch (e) {
        _logger(e);
        toastr.error("Connection Error");
      }
    } else {
      securityEventFive(uuid(), currentUser);
      try {
        await connection.invoke("SendCounterWinCallback");
        wasCountered(currentUser);
      } catch (e) {
        _logger(e);
        toastr.error("Connection Error");
      }
    }
  };

  const sendDefenseNotice = async () => {
    try {
      await connection.invoke("SendDefenseNotice");
    } catch (e) {
      _logger(e);
      toastr.error("Connection Error");
    }
  };
  const sendMessage = async (message) => {
    setBoard(message);
    try {
      await connection.invoke("SendMessage", message, currentUser.id);
      setLastPlayer((ps) => {
        let ns = { ...ps };
        ns.id = currentUser.id;
        return ns;
      });
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
    sendMoveRemoval,
    ["Control", "Shift", "Y"],
    "securityEventSeven",
    currentUser
  );
  HandleSecurityEvent(
    securityEventThree,
    ["Control", "Shift", "I"],
    "securityEventThree",
    currentUser,
    renderTerminal
  );

  HandleSecurityEvent(
    securityEventSix,
    ["Control", "Shift", "D"],
    "securityEventSix",
    currentUser,
    sendDefenseNotice
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
    const checkFullBoard = updatedBoard.filter((value) => {
      return value !== "" ? true : false;
    });
    if (checkFullBoard.length === 9) {
      resetBoard();
    }
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
              <Terminal
                handleSecurityEventTwo={removePlayerValues}
                currentUser={currentUser}
              />
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

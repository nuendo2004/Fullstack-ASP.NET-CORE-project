import React, { useState, useEffect, useCallback } from "react";
import "../../../zones/tasks/checkers/checkers.css";
import PropTypes from "prop-types";
import Tile from "../checkers/Tile";
import debug from "sabio-debug";
const _logger = debug.extend("CheckerBoard");

function CheckerBoard(props) {
  const player = props.currentUser;
  _logger("player prop", props, player);

  const [checkerBoard, setCheckerBoard] = useState({
    horizAxis: ["a", "b", "c", "d", "e", "f", "g", "h"],
    vertAxis: [1, 2, 3, 4, 5, 6, 7, 8],
    board: [],
    pieces: [],
    moveCount: 0,
    isRedBottom: true,
    redBaseRow: 7,
  });

  const [selectedPiece, setSelectedPiece] = useState(null);

  useEffect(() => {
    _logger("selPiece", selectedPiece);
  }, [selectedPiece]);

  //---PNG RED PAWN---
  // "https://bit.ly/3mv50AA"

  //---PNG BLACK PAWN---
  //"https://bit.ly/3l45tJC"

  useEffect(() => {
    _logger("useEffect set intitial", checkerBoard?.board?.length);
    if (checkerBoard.moveCount === 0) {
      setInitialBoardPlacement();
    }
  }, []);

  const setInitialBoardPlacement = () => {
    setCheckerBoard((prevState) => {
      const newBoard = { ...prevState };

      newBoard.pieces.push({
        type: "https://bit.ly/3mv50AA",
        x: 0,
        y: 2,
        isKing: false,
      });
      newBoard.pieces.push({
        type: "https://bit.ly/3mv50AA",
        x: 0,
        y: 0,
        isKing: false,
      });
      newBoard.pieces.push({
        type: "https://bit.ly/3mv50AA",
        x: 1,
        y: 1,
        isKing: false,
      });
      newBoard.pieces.push({
        type: "https://bit.ly/3mv50AA",
        x: 2,
        y: 2,
        isKing: false,
      });
      newBoard.pieces.push({
        type: "https://bit.ly/3mv50AA",
        x: 2,
        y: 0,
        isKing: false,
      });
      newBoard.pieces.push({
        type: "https://bit.ly/3mv50AA",
        x: 3,
        y: 1,
        isKing: false,
      });
      newBoard.pieces.push({
        type: "https://bit.ly/3mv50AA",
        x: 4,
        y: 2,
        isKing: false,
      });
      newBoard.pieces.push({
        type: "https://bit.ly/3mv50AA",
        x: 4,
        y: 0,
        isKing: false,
      });
      newBoard.pieces.push({
        type: "https://bit.ly/3mv50AA",
        x: 5,
        y: 1,
        isKing: false,
      });
      newBoard.pieces.push({
        type: "https://bit.ly/3mv50AA",
        x: 6,
        y: 2,
        isKing: false,
      });
      newBoard.pieces.push({
        type: "https://bit.ly/3mv50AA",
        x: 6,
        y: 0,
        isKing: false,
      });
      newBoard.pieces.push({
        type: "https://bit.ly/3mv50AA",
        x: 1,
        y: 1,
        isKing: false,
      });

      newBoard.pieces.push({
        type: "https://bit.ly/3l45tJC",
        x: 6,
        y: 6,
        isKing: false,
      });
      newBoard.pieces.push({
        type: "https://bit.ly/3l45tJC",
        x: 4,
        y: 6,
        isKing: false,
      });
      newBoard.pieces.push({
        type: "https://bit.ly/3l45tJC",
        x: 2,
        y: 6,
        isKing: false,
      });
      newBoard.pieces.push({
        type: "https://bit.ly/3l45tJC",
        x: 0,
        y: 6,
        isKing: false,
      });
      newBoard.pieces.push({
        type: "https://bit.ly/3l45tJC",
        x: 1,
        y: 5,
        isKing: false,
      });
      newBoard.pieces.push({
        type: "https://bit.ly/3l45tJC",
        x: 3,
        y: 5,
        isKing: false,
      });
      newBoard.pieces.push({
        type: "https://bit.ly/3l45tJC",
        x: 5,
        y: 5,
        isKing: false,
      });
      newBoard.pieces.push({
        type: "https://bit.ly/3l45tJC",
        x: 7,
        y: 5,
        isKing: false,
      });
      newBoard.pieces.push({
        type: "https://bit.ly/3l45tJC",
        x: 1,
        y: 7,
        isKing: false,
      });
      newBoard.pieces.push({
        type: "https://bit.ly/3l45tJC",
        x: 3,
        y: 7,
        isKing: false,
      });
      newBoard.pieces.push({
        type: "https://bit.ly/3l45tJC",
        x: 5,
        y: 7,
        isKing: false,
      });
      newBoard.pieces.push({
        type: "https://bit.ly/3l45tJC",
        x: 7,
        y: 7,
        isKing: false,
      });

      return newBoard;
    });
  };

  const checkMoveValid = (piece, newPosition) => {
    _logger("place holder", piece, newPosition);
    return true;
  };

  const onTileClicked = useCallback(
    (position, piece) => {
      _logger(
        "move piece",
        selectedPiece,
        "=>",
        position,
        piece
      );

      if (!selectedPiece && !piece) {
        _logger("havent selected a piece");
        return;
      } else if (selectedPiece && !piece) {
        _logger("attempting move");
        if (checkMoveValid()) {
          // update position
        } else {
          _logger("cannot move here - not allowed");
          return;
        }
      } else if (!selectedPiece && piece) {
        _logger("picking a piece to move");

        setSelectedPiece({ position });
      } else if (selectedPiece && piece) {
        _logger("cannot move here");
      }
    },
    [selectedPiece]
  );

  useEffect(() => {
    if (!checkerBoard?.pieces?.length > 0) return;

    setCheckerBoard((prevState) => {
      const newBoard = { ...prevState };
      for (let i = newBoard.vertAxis.length - 1; i >= 0; i--) {
        _logger("I: " + i);
        let currentPiece = null;
        for (let j = 0; j < newBoard.horizAxis.length; j++) {
          const colorDifferentiator = i + j + 2;

          const found = newBoard.pieces.find((piece) => {
            return piece.y === i && piece.x === j;
          });
          if (found) {
            _logger("found", j, i);
            currentPiece = (
              <img src={found.type} alt="piece" className="pawn" />
            );
          } else {
            _logger("not found", j, i);
          }

          newBoard.board.push(
            <Tile
              position={{ j, i }}
              number={colorDifferentiator}
              pawn={currentPiece}
              piece={found}
              key={`${newBoard.horizAxis[j]} + ${newBoard.vertAxis[i]}`}
              onClickedTile={onTileClicked}
            />
          );
        }
      }

      return newBoard;
    });
  }, [checkerBoard.pieces]);

  return <React.Fragment>{checkerBoard.board}</React.Fragment>;
}

CheckerBoard.propTypes = {
  currentUser: PropTypes.shape({}).isRequired,
};

export default React.memo(CheckerBoard);

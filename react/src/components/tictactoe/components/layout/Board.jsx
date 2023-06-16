import React from "react";
import "../../tictactoe.css";
import { Box } from "./Box.jsx";
import propTypes from "prop-types";

export const Board = ({ board, onTileClicked, isTurn}) => {
  return (
    <div className="tto-board">
      {board.map((value, idx) => {
        return (
          <Box
            key={idx}
            isTurn={isTurn}
            value={value}
            onTileClicked={onTileClicked}
            index={idx}
          />
        );
      })}
    </div>
  );
};
Board.propTypes = {
  onTileClicked: propTypes.func.isRequired,
  isTurn: propTypes.bool,
  board: propTypes.arrayOf(propTypes.string).isRequired,
};

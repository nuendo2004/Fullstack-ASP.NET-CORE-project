import React from "react";
import "../../tictactoe.css";
import propTypes from "prop-types";

export const Box = ({ index, value, onTileClicked, isTurn }) => {
  const style = value === "X" ? "tto-box tto-x" : "tto-box tto-o";

  const onSelection = () => {
    if (isTurn) {
      if (value === "") {
        onTileClicked(index);
      }
    }
  };
  return (
    <button className={style} onClick={onSelection}>
      {value}
    </button>
  );
};

Box.propTypes = {
  onTileClicked: propTypes.func.isRequired,
  value: propTypes.string,
  isTurn: propTypes.bool,
  index: propTypes.number.isRequired,
};

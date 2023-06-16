import React from "react";
import "../../tictactoe.css";
import propTypes from "prop-types";
export function ResetButton({ resetBoard }) {
  return (
    <button className="tto-reset-btn" onClick={resetBoard}>
      reset
    </button>
  );
}
ResetButton.propTypes = {
  resetBoard: propTypes.func.isRequired,
};

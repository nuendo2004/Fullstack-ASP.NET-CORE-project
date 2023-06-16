import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../../zones/tasks/checkers/checkers.css";

function Tile(props) {
  const number = props.number;
  const piece = props.pawn;
  const position = props.position;

  const [colorTile, setColorTile] = useState(false);

  const tileForMove = (e) => {
    e.preventDefault();
    setColorTile(true);

    props.onClickedTile(position, piece);
  };

  if (number % 2 === 0) {
    return (
      <div
        className={
          colorTile
            ? "col col-md-3 checker-highlight"
            : "col col-md-3 checker-black"
        }
        onClick={tileForMove}
      >
        {piece}
      </div>
    );
  } else if (number % 2 !== 0) {
    return <div className="col col-md-3 checker-red"></div>;
  }
}

Tile.propTypes = {
  number: PropTypes.number.isRequired,
  pawn: PropTypes.shape({}),
  position: PropTypes.shape({}).isRequired,
  onClickedTile: PropTypes.func.isRequired,
};

export default React.memo(Tile);

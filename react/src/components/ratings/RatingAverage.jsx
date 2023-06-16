import React from "react";
import PropTypes from "prop-types";
import Rating from "./Rating";

const RatingAverage = (props) => {
  return (
    <div className="rating-entity">
      <div className="rating-entity-title">
        {<Rating rating={props.valueOfRatingAVG} />} {props.valueOfRatingAVG}{" "}
        {"("}
        {props.totalRatingsAVG}
        {")"}
      </div>
    </div>
  );
};

RatingAverage.propTypes = {
  entityIdProps: PropTypes.number,
  entityTypeIdProps: PropTypes.number,
  valueOfRatingAVG: PropTypes.number.isRequired,
  totalRatingsAVG: PropTypes.number.isRequired,
  RatingAverage: PropTypes.shape({
    ratingAverage: PropTypes.number.isRequired,
    entityId: PropTypes.number.isRequired,
    entityTypeId: PropTypes.number.isRequired,
  }),
};

export default RatingAverage;

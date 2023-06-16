import React, { Fragment, useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiStar } from "@mdi/js";
import "./rating.css";
import ratingService from "services/ratingService";
import toastr from "toastr";
import debug from "sabio-debug";
import RatingAverage from "./RatingAverage";
import { useFormik } from "formik";
import { ratingSchema } from "./ratingSchema";
import PropTypes from "prop-types";

const _logger = debug.extend("Ratings");

const Rate = (props) => {
  const user = props.currentUser;
  const [ratingAvg, setRatingAvg] = useState(0);
  const [totalAvg, setTotalAvg] = useState(0);
  const [hover, setHover] = useState(null);

  const payload = {
    commentId: props.commentId || null,
    entityTypeId: props.entityTypeId,
    entityId: props.entityId,
  };

  const formik = useFormik({
    initialValues: {
      rating: {
        commentId: props.commentId || null,
        entityTypeId: props.entityTypeId,
        entityId: props.entityId,
      },
    },
    onSubmit: (values) => {
      payload.ratingValue = values.rating;
      _logger("checking values", payload);
      ratingService
        .addRating(payload)
        .then(onAddRatingSuccess)
        .catch(onAddRatingError);
    },
    validationSchema: ratingSchema,
  });

  useEffect(() => {
    ratingService
      .getRatingAverage(props.entityTypeId, props.entityId)
      .then(onGetRatingAverageSuccess)
      .catch(onGetRatingAverageError);
  }, []);

  const onAddRatingSuccess = (response) => {
    _logger("Add Rating Success", response);
    toastr.success("Rating submitted successfully", response);
    getAverage(response);
  };

  const onAddRatingError = (response) => {
    _logger("Add Rating error", response);
    toastr.error(response.response.data.errors[0]);
  };

  const onGetRatingAverageSuccess = (response) => {
    _logger("Get RatingAverage Success", response);
    setRatingAvg(response.items[0].ratingAverage);
    setTotalAvg(response.items[0].totalRatings);
  };

  const onGetRatingAverageError = (response) => {
    _logger("Get RatingAverage error", response);
    toastr.error("Get RatingAverage error", response);
  };

  const getAverage = () => {
    ratingService
      .getRatingAverage(props.entityTypeId, props.entityId)
      .then(onGetRatingAverageSuccess)
      .catch(onGetRatingAverageError);
  };

  const ratingArr = (star, i) => {
    const ratingValue = i + 1;
    return (
      <label key={i}>
        <input
          className="radio-input"
          type="radio"
          display="none"
          name="rating"
          value={ratingValue}
          onChange={formik.handleChange}
        />
        <Icon
          className="star"
          path={mdiStar}
          size={0.85}
          color={
            ratingValue <= (hover || formik.values.rating)
              ? "#ffc107"
              : "#e4e5e9"
          }
          onMouseEnter={() => setHover(ratingValue)}
          onMouseLeave={() => setHover(null)}
        />
      </label>
    );
  };

  return (
    <Fragment>
      <div className="body-rating">
        <div className="rating-container">
          <div className="rating-entity">
            <form onSubmit={formik.handleSubmit}>
              {user?.isLoggedIn && [...Array(5)].map(ratingArr)}
              <div>
                {user?.isLoggedIn && (
                  <button type="submit" className="rating-btn btn-primary">
                    Submit
                  </button>
                )}
                <div className="rating-average">
                  <RatingAverage
                    entityId={props.entityId}
                    entityTypeId={props.entityTypeId}
                    valueOfRatingAVG={ratingAvg}
                    totalRatingsAVG={totalAvg}
                  ></RatingAverage>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Rate.propTypes = {
  entityId: PropTypes.number.isRequired,
  entityTypeId: PropTypes.number.isRequired,
  commentId: PropTypes.number,
  isLoggedIn: PropTypes.bool.isRequired,
};
Rate.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }),
};

export default Rate;

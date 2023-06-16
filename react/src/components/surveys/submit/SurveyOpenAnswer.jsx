import React from "react";
import PropTypes from "prop-types";

function SurveyOpenAnswer({ field }) {
  return (
    <textarea
      className="form-control"
      id={field.name}
      name={field.name}
      value={field.answer}
      onChange={field.onChange}
      rows="5"
    ></textarea>
  );
}

SurveyOpenAnswer.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    answer: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
};

export default SurveyOpenAnswer;

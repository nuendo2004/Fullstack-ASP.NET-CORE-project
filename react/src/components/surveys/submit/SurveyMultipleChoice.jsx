import React, { useState } from "react";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import PropTypes from "prop-types";
import { useEffect } from "react";
function SurveyMultipleChoice({ options, field, setFieldValue }) {
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    const mappedButtons = options.map((option) => (
      <ToggleButton
        className="d-flex align-items-center rounded my-2"
        key={option.id}
        id={option.id}
        name={option.name}
        value={option.text}
        variant="outline-secondary"
      >
        <span className="text-left">{option.text}</span>
      </ToggleButton>
    ));
    setButtons(mappedButtons);
  }, [options]);

  const handleChange = (value, id) => {
    setFieldValue("answer", value);
    setFieldValue("answerOptionId", id);
  };
  return (
    <ToggleButtonGroup
      type="radio"
      name={field.name}
      value={field.value}
      onChange={(value, event) =>
        handleChange(value, parseInt(event.target.id))
      }
      className="d-flex flex-column w-100"
    >
      {buttons}
    </ToggleButtonGroup>
  );
}

SurveyMultipleChoice.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default SurveyMultipleChoice;

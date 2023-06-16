import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

function InstanceAnswerOptions(props) {

  const option = props.option;

  return (
    <React.Fragment>
      <h4 className="text-primary d-inline-block">Answer Option {props.index + 1}</h4>
      <Row className="mb-3">
        <Col>
          <h4 className="text-break text-primary d-inline-block">
            Text:
            <div className="d-inline-block text-black p-1">{option.text}</div>
          </h4>
        </Col>
        <Col>
          <h4 className="text-break text-primary">
            Value:
            <div className="d-inline-block text-black p-1">{option.value || "N/A"}</div>
          </h4>
        </Col>
        <Col>
          <h4 className="text-break text-primary">
            Additional Info:
            <div className="d-inline-block text-black p-1">
              {option.additionalInfo || "N/A"}
            </div>
          </h4>
        </Col>
      </Row>
    </React.Fragment>
  );
}

InstanceAnswerOptions.propTypes = {
  option: PropTypes.shape({
    id: PropTypes.number,
    questionId: PropTypes.number,
    text: PropTypes.string,
    value: PropTypes.string,
    additionalInfo: PropTypes.string,
  }),
  index: PropTypes.number,
};

export default React.memo(InstanceAnswerOptions);

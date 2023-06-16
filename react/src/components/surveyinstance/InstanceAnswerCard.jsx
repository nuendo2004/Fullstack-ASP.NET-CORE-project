import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import PropTypes from "prop-types";

function InstanceAnswerCard(props) {

  const answer = props?.answer;

  const renderAnswerOptionChosen = () => {
    return (
      <React.Fragment>
        <h3 className="px-7 text-primary">
          Text:
          <div className="d-inline-block answer-distinguisher text-break p-1">
            {answer?.answerOption?.[0].text}
          </div>
        </h3>
        <h3 className="px-7 text-primary">
          Value:
          <div className="d-inline-block answer-distinguisher text-break p-1">
            {answer?.answerOption?.[0].value || "N/A"}
          </div>
        </h3>
        <h3 className="px-7 text-primary">
          Additional Info:
          <div className="d-inline-block answer-distinguisher text-break p-1">
            {answer?.answerOption?.[0].additionalInfo || "N/A"}
          </div>
        </h3>
      </React.Fragment>
    );
  };

  const renderAnswerProvided = () => {
    return (
      <h3 className="px-7 text-primary">
        <div className="mr-2 text-break answer-distinguisher">{answer?.answer}</div>
      </h3>
    );
  };

  const renderAnswerNumber = () => {
    let answerContent = "";
    if (answer?.answerNumber === 1) {
        answerContent = "Yes";
    } else if (answer?.answerNumber === 2) {
        answerContent = "No";
    } else if (answer?.answerNumber === 3) {
        answerContent = "I don't know";
    }

    return (
      <h3 className="px-20 pt-5 d-inline-block answer-distinguisher">{answerContent}</h3>
    );
  };

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col>
            {answer?.answerOption && renderAnswerOptionChosen()}
            {answer?.answer && renderAnswerProvided()}
            {answer?.answerNumber !== 0 && renderAnswerNumber()}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

InstanceAnswerCard.propTypes = {
  answer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    questionId: PropTypes.number.isRequired,
    answerNumber: PropTypes.number,
    answer: PropTypes.string,
    answerOption: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        questionId: PropTypes.number,
        text: PropTypes.string,
        value: PropTypes.string,
        additionalInfo: PropTypes.string,
      })
    ),
  }),
};

export default React.memo(InstanceAnswerCard);

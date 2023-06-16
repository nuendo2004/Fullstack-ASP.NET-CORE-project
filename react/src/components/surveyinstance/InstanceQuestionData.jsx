import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Container } from "react-bootstrap";
import InstanceAnswerOptions from "./InstanceAnswerOptions";
import InstanceAnswerCard from "./InstanceAnswerCard";

function InstanceQuestionData(props) {

  const question = props?.question;
  const surveyCreated = props.created;

  const renderAnswerOptions = () => {
    const answerOptions =
      question?.questionAnswerOptions.map(mapQuestionOptions);
    return answerOptions;
  };

  const mapQuestionOptions = (options, index) => {
    return <InstanceAnswerOptions option={options} index={index} key={index} />;
  };

  const renderDateModified = () => {
    return (
      <React.Fragment>
        <Col>
          DateModified: {question.dateModified.toString().substring(0, 10)}
        </Col>
        <Col>Modified By: {question.modifiedBy}</Col>
      </React.Fragment>
    );
  };

  const renderDateCreated = () => {
    return (
      <React.Fragment>
        <Col>
          Date Created: {question.dateCreated.toString().substring(0, 10)}
        </Col>
      </React.Fragment>
    );
  };

  const renderAnswer = () => {
    return <InstanceAnswerCard answer={question.answer?.[0]} />;
  };

  return (
    <React.Fragment>
      <Container className="question-divider mt-2">
        <h3 className="text-primary d-inline-block mt-4">
          Q{props.index + 1}:
        </h3>
        <h3 className="mb-1 mt-2 d-inline-block p-1 text-break">
          {question.question}
        </h3>
        <h4 className="text-primary align-items-right mb-5">
          Help Text Provided:
          <div className="d-inline-block text-black p-1 text-break">
            {question.helpText}
          </div>
        </h4>
        {question.questionAnswerOptions && renderAnswerOptions()}
        {question.answer?.[0] && renderAnswer()}
        <Row className="mb-3 mt-6">
          {question.dateCreated < surveyCreated && renderDateCreated()}
          {question.dateModified < question.dateCreated && renderDateModified()}
          <Col>Type: {question.questionType.name}</Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

InstanceQuestionData.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    helpText: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    isMultipleAllowed: PropTypes.bool.isRequired,
    dateCreated: PropTypes.string.isRequired,
    dateModified: PropTypes.string.isRequired,
    modifiedBy: PropTypes.number,
    questionAnswerOptions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        questionId: PropTypes.number,
        text: PropTypes.string,
        value: PropTypes.string,
        additionalInfo: PropTypes.string,
      })
    ),
  }),
  index: PropTypes.number,
  created: PropTypes.string,
};

export default React.memo(InstanceQuestionData);

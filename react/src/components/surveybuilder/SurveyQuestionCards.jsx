import React, { useEffect } from "react";
import { Card, Form, Col, Row, Badge, Button } from "react-bootstrap";
import "./surveybuilder.css";
import PropTypes from "prop-types";
import debug from "sabio-debug";
import "./surveybuilder.css";

const _logger = debug.extend("SurveyQuestionCards");

function SurveyQuestionCards(props) {
  useEffect(() => {
    renderMultiplechoiceAnswerOptions();
    renderDropSelectAnswerOptions();
    _logger(props?.surveyQuestions.questionAnswerOptions);
  }, [props?.surveyQuestions.questionAnswerOptions]);

  const renderMultiplechoiceAnswerOptions = (options) => {
    return options?.map((option) => {
      return (
        <div key={option?.id}>
          <Form.Check
            className="text-black"
            type="checkbox"
            label={option?.text}
            name={option?.text}
            id={option?.id}
            value={option?.id}
          />
        </div>
      );
    });
  };

  const renderDropSelectAnswerOptions = (options) => {
    return (
      <Form.Select aria-label="Default select example" type="number">
        <option value="">Select an option</option>
        {options?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.text}
          </option>
        ))}
      </Form.Select>
    );
  };

  const renderInput = (surveyQuestion) => {
    switch (surveyQuestion.name) {
      case "Yes/No/I dont know":
        return (
          <Form>
            <Row>
              <Col lg={6} md={12} sm={12}>
                <Form.Group className="mb-3" controlId="Yes/No/I dont know">
                  <Form.Label className="mb-2 d-block">
                    Choose from the following:
                  </Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Select
                      aria-label="Default select example"
                      className="w-80 p-3 text-center"
                      type="number"
                      name={surveyQuestion.name}
                      id={surveyQuestion.id}
                    >
                      <option value="">Select Yes/No/I dont know</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="I dont know">I dont know</option>
                    </Form.Select>
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        );
      case "Short Text":
        return (
          <Form>
            <Row>
              <Col lg={6} md={12} sm={12}>
                <Form.Group className="mb-3" controlId="formShortText">
                  <Form.Label>Type Your Answer</Form.Label>
                  <Form.Control
                    type="text"
                    name={surveyQuestion.name}
                    id={surveyQuestion.id}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        );
      case "Long Text":
        return (
          <Form>
            <Row>
              <Col lg={6} md={12} sm={12}>
                <Form.Group className="mb-3" controlId="formLongText">
                  <Form.Label>Type Your Answer</Form.Label>
                  <Form.Control
                    type="text"
                    name={surveyQuestion.name}
                    id={surveyQuestion.id}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        );
      case "Upload":
        return (
          <Form>
            <Row>
              <Col lg={6} md={12} sm={12}>
                <Form.Group className="mb-3" controlId="formUpload">
                  <Form.Label>Upload Your File</Form.Label>
                  <Form.Control
                    type="file"
                    name={surveyQuestion.name}
                    id={surveyQuestion.id}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        );
      case "Yes Value":
        return (
          <Form>
            <Row>
              <Col lg={6} md={12} sm={12}>
                <Form.Group className="mb-3" controlId="formYesValue">
                  <Form.Label>Choose True or False</Form.Label>
                  <Form.Check
                    type="switch"
                    className="d-inline-flex ms-3"
                    name={surveyQuestion.name}
                    id={surveyQuestion.id}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        );
      case "No Value":
        return (
          <Form>
            <Row>
              <Col lg={6} md={12} sm={12}>
                <Form.Group className="mb-3" controlId="formNoValue">
                  <Form.Label>Choose True or False</Form.Label>
                  <Form.Check
                    type="switch"
                    className="d-inline-flex ms-3"
                    name={surveyQuestion.name}
                    id={surveyQuestion.id}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        );
      case "Other Value":
        return (
          <Form>
            <Row>
              <Col lg={6} md={12} sm={12}>
                <Form.Group className="mb-3" controlId="formOtherValue">
                  <Form.Label>Type Your Answer</Form.Label>
                  <Form.Control
                    type="text"
                    name={surveyQuestion.name}
                    id={surveyQuestion.id}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        );
      case "Choose an Option":
        return (
          <Form.Group className="mb-3" controlId="formChooseOption">
            <Form.Label>{surveyQuestion.question}</Form.Label>
            {renderMultiplechoiceAnswerOptions(
              props?.surveyQuestions?.questionAnswerOptions
            )}
          </Form.Group>
        );
      case "Choose an Option with Text":
        return (
          <Form>
            <Row>
              <Col lg={6} md={12} sm={12}>
                <Form.Group
                  className="mb-3"
                  controlId="formChooseOptionWithText"
                >
                  <Form.Label>Choose from the following:</Form.Label>
                  {renderDropSelectAnswerOptions(
                    props?.surveyQuestions?.questionAnswerOptions
                  )}
                </Form.Group>
              </Col>
            </Row>
          </Form>
        );
      case "Numeric Value":
        return (
          <Form>
            <Row>
              <Col lg={6} md={12} sm={12}>
                <Form.Group
                  className="mb-3"
                  controlId="formChooseOptionWithText"
                >
                  <Form.Label> Add Numeric Value</Form.Label>
                  <Form.Control
                    type="number"
                    name={surveyQuestion.name}
                    id={surveyQuestion.id}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        );
      default:
        return null;
    }
  };

  const onLocalQuestionDeleted = (evt) => {
    evt.preventDefault();
    props.onQuestionDeleteClicked(props?.surveyQuestions.id, evt);
  };

  return (
    <React.Fragment>
      <Card className="mb-10 survey-question-card">
        <Card.Body className="bg-white">
          <div className="d-flex justify-content-between align-items-center">
            <div className="survey-question-icon">
              <span className="survey-question-number">
                {props.surveyQuestions.sortOrder}
              </span>
            </div>
          </div>
          <div className="mt-3">
            <div className="d-flex align-items-baseline">
              <h2 className="fw-bold mb-1">
                {props.surveyQuestions?.question}
              </h2>
              <Badge bg="warning" className="ms-2">
                {props.surveyQuestions?.isRequired ? "Required" : "Optional"}
              </Badge>
            </div>
            <p className="text-muted mb-0">{props.surveyQuestions?.helpText}</p>
          </div>
          <div className="mt-4">
            {renderInput(props.surveyQuestions.questionType)}
          </div>
          <div className="d-flex flex-column">
            <div className="mt-auto d-flex flex-row-reverse">
              <Button
                variant="outline-danger"
                className="ms-2"
                onClick={onLocalQuestionDeleted}
              >
                Delete
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}
SurveyQuestionCards.propTypes = {
  surveyQuestions: PropTypes.arrayOf(
    PropTypes.shape({
      dateCreated: PropTypes.string.isRequired,
      dateModified: PropTypes.string.isRequired,
      createdBy: PropTypes.number.isRequired,
      helpText: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      isMultipleAllowed: PropTypes.bool.isRequired,
      isRequired: PropTypes.bool.isRequired,
      modifiedBy: PropTypes.number.isRequired,
      question: PropTypes.string.isRequired,
      questionAnswerOption: PropTypes.string.isRequired,
      questionType: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
      sortOrder: PropTypes.number.isRequired,
      status: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),

      surveyId: PropTypes.number.isRequired,
    })
  ).isRequired,
  onQuestionDeleteClicked: PropTypes.func,
};
export default SurveyQuestionCards;

import React, { useState, useEffect } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import Loki from "react-loki";
import toastr from "toastr";
import SurveyAnswer from "./SurveyAnswer";
import debug from "sabio-debug";
import surveyService from "services/surveyService";
import surveyAnswerService from "services/surveyAnswerService";
import PropTypes from "prop-types";

function SurveySubmit(props) {
  const _logger = debug.extend("SurveySubmit");
  _logger("currentUser ", props);

  const [pageData, setPageData] = useState({
    survey: {},
    questions: [],
    steps: [],
  });

  const [formData, setFormData] = useState([]);
  _logger(formData, setFormData);

  useEffect(() => {
    surveyService
      // Hardcoded for now. This will need to be changed
      // When creating the actual taking survey location.
      .getSurveyDetailsById(71)
      .then(onGetSurveySuccess)
      .catch(onGetSurveyError);
  }, []);

  const onGetSurveySuccess = (response) => {
    _logger(response, pageData);
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.survey = response.item;
      pd.questions = pd.survey.questions.map(mapQuestions);
      return pd;
    });
  };

  const onGetSurveyError = () => {
    toastr.error("Failed to retrieve Survey.");
  };

  const mapQuestions = (question) => {
    _logger("questions", question, question.questionType.id);
    const step = {
      label: `${question.question}`,
      component: (
        <SurveyAnswer
          data={question}
          key={question.id}
          mergeValues={mergeValues}
        />
      ),
    };
    return step;
  };

  const mergeValues = (values) => {
    _logger("mergeValues", values);
    setFormData((prevState) => {
      const index = prevState.findIndex(
        (item) => item.questionId === values.questionId
      );

      if (index === -1) {
        return [...prevState, values];
      } else {
        const fd = [...prevState];
        fd.splice(index, 1, values);
        return fd;
      }
    });
  };

  const onFinish = (values) => {
    setFormData((prevState) => {
      const fd = [...prevState, values];
      surveyAnswerService
        .addSurveyAnswers(fd)
        .then(onAddSuccess)
        .catch(onAddError);
      return fd;
    });
    _logger("Finished!", JSON.stringify(formData));
  };

  const onAddSuccess = (response) => {
    toastr.success("Successful Answers Submitted.", response);
  };

  const onAddError = (err) => {
    toastr.error("Failed to submit answers.", err);
  };

  const customRenderer = ({ currentStep, stepIndex }) => {
    _logger(currentStep, stepIndex);

    return (
      <h2 className="py-5 border-bottom d-flex justify-content-center">
        {pageData.questions.length > 0 && pageData.questions[stepIndex].label}
      </h2>
    );
  };

  return (
    <Container className="pt-5 pb-5">
      <Row>
        <Col>
          <Card>
            {pageData.questions.length > 0 && (
              <div className="myWizard">
                <Loki
                  steps={pageData.questions}
                  onNext={mergeValues}
                  onFinish={onFinish}
                  renderSteps={customRenderer}
                  noActions
                />
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

SurveySubmit.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default SurveySubmit;

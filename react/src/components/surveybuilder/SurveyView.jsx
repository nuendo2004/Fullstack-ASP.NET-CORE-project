import React, { useState, useEffect, useCallback } from "react";
import toastr from "toastr";
import { Button, Collapse } from "react-bootstrap";
import SurveyQuestionCards from "./SurveyQuestionCards";
import "./surveybuilder.css";
import PropTypes from "prop-types";
import surveyQuestionService from "services/surveyQuestionService";
import surveyService from "../../services/surveyService";
import debug from "sabio-debug";
const _logger = debug.extend("SurveyView");
function SurveyView(props) {
  const questionOptionsId = props?.answerOptionId;
  const survey = props?.surveyData;

  const [surveyDetails, setSurveyDetails] = useState({
    arrayOfSurveyQuestions: [],
    surveyQuestionOptionId: 0,
  });

  useEffect(() => {
    if (survey.id > 0) {
      setSurveyDetails((prevState) => {
        const sd = { ...prevState };
        sd.arrayOfSurveyQuestions = survey.questions?.map(mapSurveyDetails);
        return sd;
      });
    }
    if (questionOptionsId && questionOptionsId > 0) {
      setSurveyDetails((prevState) => {
        const sd = { ...prevState };
        sd.surveyQuestionOptionId = questionOptionsId;
        return sd;
      });
    }
  }, [survey, questionOptionsId]);

  const onGetSurveyByIdSuccess = (response) => {
    _logger("onGetSurveyByIdSuccess", response);

    setSurveyDetails((prevState) => {
      const sd = { ...prevState };
      sd.arrayOfSurveyQuestions = response.questions?.map(mapSurveyDetails);
      return sd;
    });
  };

  const onGetSurveyByIdError = (error) => {
    _logger(error, "onGetSurveyQuestionsError");
  };

  const [open, setOpen] = useState(false);

  const handleContainerState = () => {
    setOpen((prevState) => !prevState);
  };

  const mapSurveyDetails = (aSurvey) => {
    return (
      <SurveyQuestionCards
        surveyQuestions={aSurvey}
        key={"ListA-" + aSurvey.id}
        onQuestionDeleteClicked={onClick}
      />
    );
  };

  const onClick = useCallback((id) => {
    deletingQuestion(id);
  }, []);

  const deletingQuestion = (id) => {
    const handler = getDeleteSuccessHandler(id);

    surveyQuestionService
      .deleteSurveyQuestionById(id)
      .then(handler)
      .catch(onSurveyQuestionDeleteError);

    // Fetch updated survey details after the question has been deleted
    surveyService
      .getSurveyDetailsById(survey.id)
      .then(onGetSurveyByIdSuccess)
      .catch(onGetSurveyByIdError);
  };

  const getDeleteSuccessHandler = (id) => {
    return () => {
      setSurveyDetails((prevState) => {
        const sd = { ...prevState };
        sd.arrayOfSurveyQuestions = sd.arrayOfSurveyQuestions.filter(
          (question) => question.props.surveyQuestions.id !== id
        );
        return sd;
      });
    };
  };

  const onSurveyQuestionDeleteError = (err) => {
    toastr.error("Failed to Delete SurveyQuestion.", err);
  };

  return (
    <React.Fragment>
      <div className="mt-3 mb-3">
        <Button
          type="button"
          className="btn btn-primary mt-5"
          aria-controls="example-collapse-text"
          onClick={handleContainerState}
          aria-expanded={open}
        >
          Open/Close Survey Details
        </Button>
      </div>
      <Collapse in={open}>
        <div
          className="container survey-details-container mt-3 mb-3 col-4"
          id="example-collapse-text"
        >
          <div className="bg-light border border-top-0 border-start-0 border-end-0 border-2">
            <div className="d-flex justify-content-center align-items-center px-3 py-2">
              <h1 className="text-black fs-2 fw-bold m-0">{survey?.name}</h1>
            </div>
            <div className="d-flex justify-content-center align-items-center border border-top-0 border-start-0 border-end-0 border-2 border-black">
              <h3 className="text-black fs-3 m-0">{survey?.description}</h3>
            </div>
            <div className="mt-5 ms-20">
              {surveyDetails?.arrayOfSurveyQuestions}
            </div>
          </div>
        </div>
      </Collapse>
    </React.Fragment>
  );
}
SurveyView.propTypes = {
  surveyData: PropTypes.shape({
    dateCreated: PropTypes.string.isRequired,
    dateModified: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    modifiedBy: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  answerOptionId: PropTypes.number.isRequired,
};
export default SurveyView;

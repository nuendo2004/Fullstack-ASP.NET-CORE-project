import React, { useState, useEffect } from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import surveyQuestionSchema from "../../schemas/surveyQuestionSchema";
import surveyQuestionService from "../../services/surveyQuestionService";
import SurveyQuestionAnswerForm from "./SurveyQuestionAnswerForm";
import SurveyView from "./SurveyView";
import surveyService from "../../services/surveyService";
import lookUpService from "services/lookUpService";
import toastr from "toastr";
import { Row, Col, Form, Button } from "react-bootstrap";
import Modal from "react-modal";
import PropTypes from "prop-types";
import "rc-pagination/assets/index.css";
import "./surveybuilder.css";
import debug from "sabio-debug";

const _logger = debug.extend("SurveyBuilder");

function SurveyBuilder(props) {
  const navigate = useNavigate();
  const user = props.currentUser;
  const survey = useParams();
  const surveyId = survey.id;

  const defaultValues = {
    question: "",
    helpText: "",
    isRequired: false,
    isMultipleAllowed: false,
    questionTypeId: 0,
    surveyId: 0,
    statusId: 0,
    sortOrder: 0,
    createdBy: user.id,
    modifiedBy: user.id,
  };

  const [questionData, setQuestionData] = useState(defaultValues);

  const [surveyStatusAndId, setStatusAndId] = useState({
    surveyId: 0,
    statusId: 0,
  });
  const [pageData, setPageData] = useState({
    arrayOfSurveys: [],
    surveyComponents: [],
    pageIndex: 0,
    pageSize: 100,
    surveyQuestionId: 0,
    surveyDetails: [],
    surveyStatus: [],
    surveyQuestionComponent: [],
  });

  const [showQuestionForm, setShow] = useState(false);
  const [isModalShown, setShowModal] = useState(false);
  const [showNextQuestion, setNextQuestion] = useState(false);

  useEffect(() => {
    if (questionData.surveyId > 0) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }

    lookUpService
      .LookUp(["SurveyStatus", "QuestionTypes"])
      .then(getLookUpSuccess)
      .catch(getLookUpError);

    surveyService
      .getSurveys(pageData.pageIndex, pageData.pageSize)
      .then(onGetAllSurveysSuccess)
      .catch(onGetAllSurveysError);

    if (surveyId && surveyId > 0) {
      setShowModal(false);
      surveyService
        .getSurveyDetailsById(surveyId)
        .then(onGetSurveyByIdSuccess)
        .catch(onGetSurveyByIdError);
    } else if (questionData.surveyId && questionData.surveyId > 0) {
      surveyService
        .getSurveyDetailsById(questionData.surveyId)
        .then(onGetSurveyByIdSuccess)
        .catch(onGetSurveyByIdError);
    }
    if (pageData.surveyQuestionId > 0) {
      surveyQuestionService
        .getQuestionById(pageData.surveyQuestionId)
        .then(onGetSurveyQuestionSuccess)
        .catch(onGetSurveyQuestionError);
    }
  }, [pageData.surveyQuestionId]);

  const getLookUpSuccess = (data) => {
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.questionTypes = data.item.questionTypes.map(mapSurveyData);
      pd.surveyStatus = data.item.surveyStatus.map(mapSurveyData);
      return pd;
    });
  };

  const mapSurveyData = (aSurvey) => {
    return (
      <option key={aSurvey.id} value={aSurvey.id}>
        {aSurvey.name}
      </option>
    );
  };

  const getLookUpError = (err) => {
    toastr.error("Failed to retrieve Survey Status and Types.", err);
  };

  const onGetSurveyQuestionSuccess = (response) => {
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.surveyQuestionComponent = response.item;
      return pd;
    });
  };

  const onGetSurveyQuestionError = (error) => {
    _logger(error, "onGetSurveyQuestionsError");
  };

  const onGetAllSurveysSuccess = (response) => {
    const arrayOfSurveyData = response.item.pagedItems;
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfSurveys = arrayOfSurveyData;
      pd.surveyComponents = pd.arrayOfSurveys.map(mapSurveys);
      return pd;
    });
  };
  const onGetAllSurveysError = () => {
    toastr.error("Error! Did not get all Surveys");
  };
  const mapSurveys = (aSurvey) => {
    return (
      <option key={aSurvey.id} value={aSurvey.id}>
        {aSurvey.name}
      </option>
    );
  };

  const onGetSurveyByIdSuccess = (response) => {
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.surveyDetails = response.item;
      return pd;
    });
    setQuestionData((prevState) => {
      const qd = { ...prevState };
      qd.surveyId = response.item.id;
      qd.statusId = response.item.surveyStatus.id;
      return qd;
    });
  };

  const onGetSurveyByIdError = (error) => {
    _logger(error, "onGetSurveyQuestionsError");
  };

  const onHandleSubmit = (values) => {
    surveyQuestionService
      .addQuestion(values)
      .then(onSurveyQuestionSuccess)
      .catch(onSurveyQuestionError);

    setNextQuestion((prevState) => !prevState);
  };

  const onSurveyQuestionSuccess = (response) => {
    toastr.success("Success! New Survey Question Created");
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.surveyQuestionId = response.item;
      return pd;
    });
  };
  const onSurveyQuestionError = () => {
    toastr.error("Error! Question Not Created");
  };

  //Following onChange function stores Survey and Status IDs from Modal drop-down selection
  const onSurveySelectChange = (event) => {
    const target = event.target;
    const newValue = target.value;
    const nameOfField = target.name;

    setQuestionData((prevState) => {
      const qd = { ...prevState };
      qd[nameOfField] = newValue;
      return qd;
    });

    setStatusAndId((prevState) => {
      const st = { ...prevState };
      st[nameOfField] = newValue;
      return st;
    });
  };

  const onClickShowQuestionForm = (e) => {
    e.preventDefault();
    setShow((prevState) => !prevState);
  };

  const onClickResetForm = () => {
    setNextQuestion((prevState) => !prevState);
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.surveyQuestionComponent = [];
      return pd;
    });
    resetForm();
  };
  function closeModal() {
    setShowModal(false);
    surveyService
      .getSurveyDetailsById(questionData.surveyId)
      .then(onGetSurveyByIdSuccess)
      .catch(onGetSurveyByIdError);
  }
  const onCreateNewSurvey = (e) => {
    e.preventDefault();
    navigate(`/surveys/builder/surveyformbuilder`);
  };

  const resetForm = () => {
    if (surveyId && surveyId > 0) {
      setQuestionData(() => {
        const qd = { ...defaultValues };
        qd.question = "";
        qd.helpText = "";
        qd.isRequired = false;
        qd.isMultipleAllowed = false;
        qd.questionTypeId = 0;
        qd.surveyId = surveyId;
        qd.statusId = questionData.statusId;
        qd.sortOrder = 0;
        qd.createdBy = user.id;
        qd.modifiedBy = user.id;
        return qd;
      });
    } else if (surveyStatusAndId.surveyId && surveyStatusAndId.surveyId > 0) {
      setQuestionData(() => {
        const qd = { ...defaultValues };
        qd.question = "";
        qd.helpText = "";
        qd.isRequired = false;
        qd.isMultipleAllowed = false;
        qd.questionTypeId = 0;
        qd.surveyId = surveyStatusAndId.surveyId;
        qd.statusId = surveyStatusAndId.statusId;
        qd.sortOrder = 0;
        qd.createdBy = user.id;
        qd.modifiedBy = user.id;
        return qd;
      });
    }
  };

  return (
    <React.Fragment>
      <div className="py-lg-6 survey-bg-image">
        <div className="container ms-20">
          <h1 className="text-white mb-1 fs-1 text">
            Build Your Own Survey...
          </h1>
          <p className="mb-0 text-white lead fs-3 text">
            Design surveys, collect responses, and analyze the data like a pro.
          </p>
        </div>
      </div>
      <Formik
        enableReinitialize={true}
        validationSchema={surveyQuestionSchema}
        initialValues={questionData}
        onSubmit={onHandleSubmit}
      >
        {({ values }) => (
          <Row className="g-0 min-vh-100 surveybuilder-bg-image">
            <div className="container border border-dark">
              <Row>
                <SurveyView surveyData={pageData.surveyDetails} />
                <div className="container col-6">
                  <FormikForm>
                    {showQuestionForm === false ? (
                      <React.Fragment>
                        <div className="text-center mt-10">
                          <h1 className="fw-bold text-black">
                            No Questions Have Been Created Yet
                          </h1>
                          <button
                            type="button"
                            className="btn btn-primary mt-5"
                            onClick={onClickShowQuestionForm}
                          >
                            Add Question
                          </button>
                        </div>
                      </React.Fragment>
                    ) : null}
                    {showQuestionForm && (
                      <div className="card mx-auto survey-question-form-card h-100 mt-3 position-relative">
                        <div className="card-header fw-bold text-center fs-2">
                          Build Your Survey Question
                        </div>
                        <div className="card-body bg-light">
                          <Form.Group as={Row} className="mb-3">
                            <Form.Label
                              column
                              sm="2"
                              className="fs-4 text text-black"
                            >
                              Survey Question
                            </Form.Label>
                            <Col sm="6">
                              <Field
                                name="question"
                                value={values.question}
                                type="text"
                                className="form-control"
                                placeholder="Default input"
                              ></Field>{" "}
                              <ErrorMessage
                                name="question"
                                className=".has-error"
                              />
                            </Col>
                            <Col sm="4" className="d-flex align-items-center">
                              <Field name="isRequired">
                                {({ field }) => (
                                  <Form.Check
                                    type="checkbox"
                                    id="isRequired"
                                    label="Does This Question Require An Answer?"
                                    className="fs-4 text-black"
                                    {...field}
                                    checked={field.value}
                                  />
                                )}
                              </Field>
                            </Col>
                          </Form.Group>
                          <Form.Group as={Row} className="mb-3">
                            <Form.Label
                              column
                              sm="2"
                              className="fs-4 text text-black"
                            >
                              Description Of The Question
                            </Form.Label>
                            <Col sm="6">
                              <Field
                                type="text"
                                name="helpText"
                                className="form-control"
                                value={values.helpText}
                                placeholder="Default input"
                              ></Field>
                              <ErrorMessage
                                name="helpText"
                                className=".has-error"
                              />
                            </Col>
                          </Form.Group>
                          <Form.Group as={Row} className="mb-3">
                            <Form.Label
                              column
                              sm="2"
                              className="fs-4 text text-black"
                              htmlFor="questionTypeId"
                            >
                              Select Type Of Question
                            </Form.Label>
                            <Col sm="4">
                              <Field
                                name="questionTypeId"
                                value={values.questionTypeId}
                                as={Form.Select}
                                className="text-dark mb-5 form-select"
                                id="questionTypeId"
                              >
                                <option value="">
                                  Select Type Of Question
                                </option>
                                {pageData.questionTypes}
                              </Field>
                              <ErrorMessage
                                name="questionTypeId"
                                className=".has-error"
                              />
                            </Col>
                            <Form.Label
                              column
                              sm="2"
                              className="fs-4 text text-black"
                              htmlFor="sortOrder"
                            >
                              Specify The Question Number
                            </Form.Label>
                            <Col sm="4">
                              <Field
                                name="sortOrder"
                                value={values.sortOrder}
                                className="form-select"
                                type="number"
                                placeholder="Order position for this question?"
                                id="sortOrder"
                              />
                              <ErrorMessage
                                name="sortOrder"
                                className=".has-error"
                              />
                            </Col>
                          </Form.Group>
                        </div>
                        <div>
                          <Button
                            type="submit"
                            className="mb-5 mt-5 ms-5 btn-lg btn-primary"
                          >
                            Create Question
                          </Button>
                        </div>
                        <div className="position-absolute top-0 end-0 p-2">
                          {showNextQuestion && (
                            <button
                              type="button"
                              className="btn btn-warning"
                              onClick={onClickResetForm}
                            >
                              Next Question
                            </button>
                          )}
                        </div>
                        <div className="card-footer text-muted">Immersed</div>
                      </div>
                    )}
                  </FormikForm>
                  {pageData.surveyQuestionComponent.id > 0 && (
                    <SurveyQuestionAnswerForm
                      user={user}
                      questionData={pageData.surveyQuestionComponent}
                    />
                  )}
                </div>
              </Row>
            </div>
          </Row>
        )}
      </Formik>
      <Modal
        isOpen={isModalShown}
        toggle={closeModal}
        className="survey-builder-modal"
      >
        <div className="survey-builder-modal-content-container">
          <div className="modal-header survey-builder-modal-header">
            <h1 className="modal-title fw-bold">Immersed Survey Builder!</h1>
            <p className="fs-3 border border-primary ps-3">
              Welcome to our Survey Form Builder! With our powerful tool, you
              can create surveys with ease and precision. Our form builder
              offers ten different question types, including open text responses
              and multiple choice questions, so you can create surveys that
              perfectly match your needs. Whether you are collecting customer
              feedback, conducting market research, or gathering employee
              opinions, our survey builder has got you covered. Get started now
              by selecting an option below to create a survey from scratch or to
              import an existing template. Thank you for choosing our Survey
              Form Builder, and we look forward to helping you create surveys
              that make a difference!
            </p>
            <h1 className="fs-3 me-5 fw-bold">
              Before continuing to Survey Builder, please decide whether to edit
              an existing Survey Template or create a survey from scratch
            </h1>
          </div>
          <div className="modal-body survey-builder-modal-body">
            <div className="mb-3">
              <Form.Label className="fs-3 me-5 fw-bold">
                Choose Existing Survey & Survey Status
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                className="text-dark"
                name="surveyId"
                type="number"
                onChange={onSurveySelectChange}
              >
                <option value="">Choose Existing Survey</option>
                {pageData.surveyComponents}
              </Form.Select>

              <Form.Select
                aria-label="Default select example"
                className="text-dark"
                name="statusId"
                type="number"
                onChange={onSurveySelectChange}
              >
                <option value="">Select Survey Status</option>
                {pageData.surveyStatus}
              </Form.Select>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={closeModal}
              >
                Continue
              </button>

              <h1 className="fs-3 me-5 fw-bold mt-5">
                Navigate to our survey creator to start creating your new
                template:
              </h1>
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={onCreateNewSurvey}
              >
                Create a New Survey
              </button>
            </div>
          </div>
          <div className="modal-footer survey-builder-modal-footer">
            <button
              type="button"
              className="d-none btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
}
SurveyBuilder.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    roles: PropTypes.instanceOf(Array).isRequired,
  }).isRequired,
};
export default SurveyBuilder;

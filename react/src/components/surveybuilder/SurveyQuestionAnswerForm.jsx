import React, { useState, useEffect } from "react";
import { Formik, Form as FormikForm, Field, FieldArray } from "formik";
import { Col, Form, Button } from "react-bootstrap";
import surveyQuestionAnswerOptionService from "../../services/surveyQuestionAnswerOptionService";
import surveyQuestionService from "../../services/surveyQuestionService";
import SurveyView from "./SurveyView";
import "./surveybuilder.css";
import PropTypes from "prop-types";
import debug from "sabio-debug";
import toastr from "toastr";
const _logger = debug.extend("SurveyQuestionAnswerOption");
function SurveyQuestionAnswerForm(props) {
  const user = props.user;

  const surveyQuestion = props?.questionData;

  const [answerOptions] = useState({
    yesNoIdk: [],
    shortText: [],
    longText: [],
    upload: [],
    numericValue: [],
    chooseOption: [],
    yesNo: [],
    chooseOptionWithText: [],
    otherValue: [],
  });

  const [pageData, setPageData] = useState({
    surveyQuestionComponent: "",
    surveyQuestionOptionId: 0,
  });

  const [show, setShow] = useState(true);

  //Following Three States Handle Multiple choice answer Input
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState([]);

  const [newMultipleChoiceOption, setNewChoiceOption] = useState("");

  const addOption = () => {
    setMultipleChoiceOptions([
      ...multipleChoiceOptions,
      newMultipleChoiceOption,
    ]);
    setNewChoiceOption("");
    handleAddRecord(newMultipleChoiceOption);
  };

  const [answerOptionObjects, setAnswerOptionObjects] = useState([]);

  function handleAddRecord(newRecord) {
    if (newRecord === newMultipleChoiceOption) {
      setAnswerOptionObjects([
        ...answerOptionObjects,
        {
          questionId: surveyQuestion.id,
          text: newRecord,
          value: null,
          additionalInfo: null,
          createdBy: user.id,
          modifiedBy: user.id,
        },
      ]);
    }
    if (newRecord === newOption) {
      setAnswerOptionObjects([
        ...answerOptionObjects,
        {
          questionId: surveyQuestion.id,
          text: newRecord,
          value: null,
          additionalInfo: null,
          createdBy: user.id,
          modifiedBy: user.id,
        },
      ]);
    }
  }

  const onHandleSubmit = () => {
    surveyQuestionAnswerOptionService
      .addQuestionAnswerOption(answerOptionObjects)
      .then(onSurveyQuestionAnswerOptionSuccess)
      .catch(onSurveyQuestionAnswerOptionError);

    setMultipleChoiceOptions([]);
    setOptions([]);
  };
  const onSurveyQuestionAnswerOptionSuccess = (response) => {
    toastr.success("Success! Answer Options Created");
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.surveyQuestionOptionId = response.item;
      return pd;
    });
  };
  const onSurveyQuestionAnswerOptionError = (error) => {
    toastr.error("Error! Did not create answer options..");
    _logger(error);
  };

  //Following two States Handle chooseOptionWithText Answer Input
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState("");
  //Following two Handlers only used for chooseOptionWithText Answer Input
  const handleNewOptionChange = (event) => {
    setNewOption(event.target.value);
  };
  const handleOptionAdd = () => {
    if (newOption) {
      setOptions([...options, newOption]);
      setNewOption("");
    }
    handleAddRecord(newOption);
  };

  useEffect(() => {
    if (surveyQuestion.id > 0) {
      setPageData((prevState) => {
        const pd = { ...prevState };
        pd.surveyQuestionComponent = surveyQuestion;
        return pd;
      });
    }
    if (surveyQuestion.id && surveyQuestion.id > 0) {
      surveyQuestionService
        .getQuestionById(surveyQuestion.id)
        .then(onGetSurveyQuestionSuccess)
        .catch(onGetSurveyQuestionError);
    }
    if (
      pageData.surveyQuestionOptionId &&
      pageData.surveyQuestionOptionId > 0
    ) {
      passAnswerOptionId();
    }
  }, [surveyQuestion, pageData.surveyQuestionOptionId]);

  const onGetSurveyQuestionSuccess = (response) => {
    toastr.success("Success! Recieved your new question!");
    _logger(response);
  };

  const onGetSurveyQuestionError = (error) => {
    toastr.error("Error! Did not recieve your new question..");
    _logger(error, "onGetSurveyQuestionsError");
  };
  const passAnswerOptionId = () => {
    return <SurveyView answerOptionId={pageData.surveyQuestionOptionId} />;
  };
  return (
    <div className="row">
      <Formik initialValues={answerOptions}>
        {({ values }) => (
          <FormikForm>
            {(props.questionData.questionTypeId?.name === "Choose an Option" ||
              props.questionData.questionTypeId?.name ===
                "Choose an Option with Text") && (
              <div className="card mx-auto new-survey-question-card mt-4">
                <div className="card-header fw-bold text-center fs-2">
                  Create Answer Options For Your Question
                </div>
                <div className="card-body fw-bold fs-3 bg-light">
                  <div className="row text-black">
                    Question #{pageData.surveyQuestionComponent.sortOrder}{" "}
                    <div className="row fs-3 text-black">
                      {pageData.surveyQuestionComponent.question}
                      <div className="row mt-5">
                        <Form.Group>
                          {props.questionData.questionTypeId?.name ===
                            "Choose an Option" && (
                            <FieldArray name="chooseOption">
                              {(arrayHelpers) => (
                                <div>
                                  {values.chooseOption &&
                                  values.chooseOption.length > 0
                                    ? values.chooseOption.map(
                                        (question, index) => (
                                          <div
                                            className="text-center"
                                            key={index}
                                          >
                                            <FieldArray
                                              name={`multipleChoiceOptions${index}`}
                                            >
                                              {(arrayHelpers) => (
                                                <div className="options-container">
                                                  {multipleChoiceOptions &&
                                                  multipleChoiceOptions.length >
                                                    0
                                                    ? multipleChoiceOptions.map(
                                                        (option, index) => (
                                                          <div
                                                            style={{
                                                              marginBottom:
                                                                "10px",
                                                            }}
                                                            key={index}
                                                          >
                                                            <Field
                                                              name={`multipleChoiceOptions${index}`}
                                                              type="checkbox"
                                                              className="w-25 mr-3 p-3 text-center"
                                                            />
                                                            <Form.Label
                                                              htmlFor={`multipleChoiceOptions${index}`}
                                                              className="fs-4 text-black"
                                                            >
                                                              {option}
                                                            </Form.Label>
                                                            <Button
                                                              type="button"
                                                              className="me-8 mt-3"
                                                              variant="btn btn-danger btn-sm ms-5"
                                                              onClick={() => {
                                                                arrayHelpers.remove(
                                                                  index
                                                                );
                                                                setMultipleChoiceOptions(
                                                                  multipleChoiceOptions.filter(
                                                                    (_, i) =>
                                                                      i !==
                                                                      index
                                                                  )
                                                                );
                                                              }}
                                                            >
                                                              X
                                                            </Button>
                                                          </div>
                                                        )
                                                      )
                                                    : null}
                                                  <Field
                                                    type="text"
                                                    className="form-control w-25 mr-3 p-3 text-center d-inline-flex text-black"
                                                    id="setNewChoiceOption"
                                                    value={
                                                      newMultipleChoiceOption
                                                    }
                                                    onChange={(e) =>
                                                      setNewChoiceOption(
                                                        e.target.value
                                                      )
                                                    }
                                                  />
                                                  <Button
                                                    type="button"
                                                    className="mb-3 ms-3 mt-3"
                                                    variant="btn btn-primary btn-sm"
                                                    onClick={addOption}
                                                  >
                                                    Add Option
                                                  </Button>
                                                </div>
                                              )}
                                            </FieldArray>
                                          </div>
                                        )
                                      )
                                    : null}
                                  {show === true && (
                                    <Button
                                      type="button"
                                      className="mb-5"
                                      variant="btn btn-primary btn-sm"
                                      onClick={() => {
                                        arrayHelpers.push("");
                                        setShow((prevState) => !prevState);
                                      }}
                                    >
                                      Add Multiple Choice Input
                                    </Button>
                                  )}

                                  <Button
                                    type="button"
                                    className="mb-5 ms-3"
                                    variant="btn btn-success btn-sm"
                                    onClick={onHandleSubmit}
                                  >
                                    Confirm
                                  </Button>
                                </div>
                              )}
                            </FieldArray>
                          )}

                          {props.questionData.questionTypeId?.name ===
                            "Choose an Option with Text" && (
                            <FieldArray name="chooseOptionWithText">
                              {({ push }) => (
                                <div>
                                  {values.chooseOptionWithText.map(
                                    (item, index) => (
                                      <div key={index}>
                                        <Form.Label
                                          htmlFor={`chooseOptionWithText.${index}.text`}
                                          className="fs-4 text-black"
                                          column
                                          sm={2}
                                        >
                                          Select an option
                                        </Form.Label>
                                        <Form.Select
                                          id="chooseOptionWithText"
                                          aria-label="Default select example"
                                          className="w-25 mr-3 p-3 text-center d-inline-flex"
                                          name={`chooseOptionWithText.${index}`}
                                          type="number"
                                        >
                                          <option value="">
                                            Select an option
                                          </option>
                                          {options.map((option) => (
                                            <option key={option} value={option}>
                                              {option}
                                            </option>
                                          ))}
                                        </Form.Select>
                                        <Form.Label
                                          htmlFor="newOption"
                                          className="text-black fs-4 ms-3"
                                        >
                                          Add a new option:
                                        </Form.Label>
                                        <Col sm="6">
                                          <div className="d-flex align-items-center">
                                            <Form.Label
                                              htmlFor="newOption"
                                              className="text-black fs-4 ms-3 me-3"
                                            >
                                              Add a new option:
                                            </Form.Label>
                                            <Field
                                              type="text"
                                              className="ms-10 text-black form-control width-15px"
                                              id="newOption"
                                              value={newOption}
                                              onChange={handleNewOptionChange}
                                            />
                                            <Button
                                              type="button"
                                              variant="btn btn-primary btn-sm ms-3 mt-3"
                                              onClick={handleOptionAdd}
                                            >
                                              Add New Option
                                            </Button>
                                          </div>
                                        </Col>
                                      </div>
                                    )
                                  )}
                                  {show === true && (
                                    <div className="mt-3">
                                      <Form.Label
                                        htmlFor="addOption"
                                        className="text-black fs-4 me-3"
                                      >
                                        Add a Choose Option With Text Input:
                                      </Form.Label>
                                      <Button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={() => {
                                          push("");
                                          setShow((prevState) => !prevState);
                                        }}
                                      >
                                        Add Option
                                      </Button>
                                    </div>
                                  )}
                                  <Button
                                    type="submit"
                                    className="ms-3 mt-3"
                                    variant="btn btn-success btn-sm"
                                    onClick={onHandleSubmit}
                                  >
                                    Confirm
                                  </Button>
                                </div>
                              )}
                            </FieldArray>
                          )}
                          {[
                            "Long Text",
                            "Short Text",
                            "Upload",
                            "Yes/No/I dont know",
                            "Numeric Value",
                            "Choose an Option",
                            "Choose an Option with Text",
                            "No Value",
                            "Yes Value",
                            "Other Value",
                          ].includes(
                            props.questionData.questionTypeId?.name
                          ) && (
                            <div className="text-center me-8 ms-8">
                              <Form.Label className="fs-4 text text-black">
                                If applicable, place additional information
                                here...
                              </Form.Label>
                              <Field as={Col}>
                                <Form.Control
                                  type="input"
                                  className="text-black"
                                  placeholder="Additional Information"
                                  name="additionalInfo"
                                  disabled="true"
                                />
                              </Field>
                            </div>
                          )}
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-muted">Immersed</div>
              </div>
            )}
          </FormikForm>
        )}
      </Formik>
    </div>
  );
}
SurveyQuestionAnswerForm.propTypes = {
  questionData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    surveyId: PropTypes.number.isRequired,
    questionTypeId: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    helpText: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    roles: PropTypes.instanceOf(Array).isRequired,
  }).isRequired,
};
export default SurveyQuestionAnswerForm;

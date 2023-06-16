import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { withFormik, Form, Field } from "formik";
import MultipleChoice from "./SurveyMultipleChoice";
import OpenAnswer from "./SurveyOpenAnswer";
import PropTypes from "prop-types";
import surveyAnswerSchema from "schemas/surveyAnswerSchema";

function SurveyAnswer(props) {
  const { isSubmitting, handleSubmit, backLabel, nextLabel, onBack, cantBack } =
    props;

  const [pageData, setPageData] = useState({
    answerOptions: [],
  });
  useEffect(() => {
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.answerOptions = selectOptions(props.data);
      return pd;
    });
  }, []);

  const selectOptions = (data) => {
    switch (data.questionType.id) {
      case 2: {
        return <Field name="answer" value="" component={OpenAnswer} />;
      }
      case 3: {
        return <Field name="answer" value="" component={OpenAnswer} />;
      }
      case 9:
        return (
          <Field
            name="answer"
            component={({ field }) => (
              <MultipleChoice
                options={data.questionAnswerOptions}
                field={field}
                setFieldValue={props.setFieldValue}
              />
            )}
          ></Field>
        );
      default:
        <div>
          Error! Please contact SysAdmin for missing Answer Option Type.
        </div>;
    }
  };

  const handleBack = (values) => {
    onBack(values);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <div className="d-flex align-items-center p-5">
              {pageData.answerOptions ? pageData.answerOptions : null}
            </div>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col className="">
          <div className="button-group d-flex justify-content-between p-5">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleBack}
              disabled={isSubmitting || cantBack}
            >
              {backLabel}
            </button>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {nextLabel}
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

SurveyAnswer.propTypes = {
  data: PropTypes.shape({
    questionType: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
    questionAnswerOptions: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        value: PropTypes.string,
        additionalInfo: PropTypes.string,
      }).isRequired
    ),
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  backLabel: PropTypes.string.isRequired,
  nextLabel: PropTypes.string.isRequired,
  /* eslint-disable react/boolean-prop-naming */
  /* 
  This is due to cantBack being a react-loki prop.
  Do not change the name to match is or has boolean. 
  */
  cantBack: PropTypes.bool.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default withFormik({
  mapPropsToValues: (props) => ({
    surveyId: props.data.surveyId,
    questionId: props.data.id,
    answerOptionId: null,
    answer: null,
    answerNumber: null,
  }),
  validationSchema: surveyAnswerSchema,
  handleSubmit: (values, { props }) => {
    props.onNext(values);
  },
})(SurveyAnswer);

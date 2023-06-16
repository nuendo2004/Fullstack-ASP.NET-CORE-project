import React, { useState } from "react";
import PropTypes from "prop-types";
import debug from "sabio-debug";
import { useEffect } from "react";
import { Col, Row, Card } from "react-bootstrap";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import { TSFlatPickr } from "../trainingschedule/flat-pickr/TSFlatPickr";
import toastr from "toastr";
import lookUpService from "services/lookUpService";
import jobSettingsSchema from "./jobSettingsSchema";

const _logger = debug.extend("JobSettingsForm");
let chronJobTypeTable = ["chronJobTypes"];
let intervalTypeTable = ["intervalTypes"];
let daysOfWeekTable = ["daysOfWeek"];

function JobSettingsForm(props) {
  const {
    values,
    isSubmitting,
    handleChange,
    handleSubmit,
    backLabel,
    nextLabel,
    onBack,
    onNext,
    setValues,
  } = props;

  const [state, setState] = useState({
    cronJobType: [],
    intervalTypes: [],
    daysOfTheWeekType: [],
  });

  useEffect(() => {
    lookUpService
      .LookUp(chronJobTypeTable)
      .then(onCronJobsTypeSuccess)
      .catch(onCronJobsTypeError);
    lookUpService
      .LookUp(intervalTypeTable)
      .then(onIntervalTypeSuccess)
      .catch(onIntervalTypeError);
    lookUpService
      .LookUp(daysOfWeekTable)
      .then(onDaysOfTheWeekIdSuccess)
      .catch(onDaysOfTheWeekIdError);
  }, []);

  const onCronJobsTypeSuccess = (response) => {
    let jobTypes = response.item.chronJobTypes;
    setState((prevState) => {
      let mappedJobTypes = { ...prevState };
      mappedJobTypes.jobTypes = jobTypes.map(mapTypes);
      return mappedJobTypes;
    });
  };

  const onCronJobsTypeError = (error) => {
    toastr.error("Something went wrong...");
    _logger(error);
  };

  const onIntervalTypeSuccess = (response) => {
    let intervalTypes = response.item.intervalTypes;
    setState((prevState) => {
      let mappedIntervalTypes = { ...prevState };
      mappedIntervalTypes.intervalTypes = intervalTypes.map(mapTypes);
      return mappedIntervalTypes;
    });
  };

  const onIntervalTypeError = (error) => {
    toastr.error("Something went wrong...");
    _logger(error);
  };

  const onDaysOfTheWeekIdSuccess = (response) => {
    let daysOfTheWeekTypes = response.item.daysOfWeek;
    setState((prevState) => {
      let mappedDaysOfWeekTypes = { ...prevState };
      mappedDaysOfWeekTypes.dayTypes = daysOfTheWeekTypes.map(mapTypes);
      return mappedDaysOfWeekTypes;
    });
  };

  const onDaysOfTheWeekIdError = (error) => {
    toastr.error("Something went wrong...");
    _logger(error);
  };

  const mapTypes = (type) => {
    return (
      <option key={type.id} value={type.id}>
        {type.name}
      </option>
    );
  };

  const handleBack = () => {
    onBack(values);
  };

  const onNextClick = () => {
    onNext(values);
  };

  const handleTimeChange = (time) => {
    setValues({ ...values, utcHourToRun: time[0] });
  };

  return (
    <React.Fragment>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={12} md={12} className="py-8 py-xl-0">
          <Card>
            <Card.Body className="p-4 job-settings-form">
              <Form onSubmit={handleSubmit}>
                <div className="container-fluid p-2">
                  <div className="row">
                    <div className="mb-4 col-lg-12 col-md-12 jobsettings-loki-form">
                      <div className="card p-3">
                        <div className="form-group">
                          <h1 className="mb-1 fw-bold jobsettings-form-header">
                            Job Settings
                          </h1>
                          <div className="form-group">
                            <label htmlFor="chronJobTypeId">
                              Select Job Type
                              <span className="text-danger"> *</span>
                            </label>
                            <Field
                              as="select"
                              name="chronJobTypeId"
                              onChange={handleChange}
                              aria-describedby="enterModel"
                              className="form-group form-select text-dark"
                            >
                              <option
                                value="0"
                                label="Job Types"
                                className="text-muted"
                              ></option>
                              {state.jobTypes}
                            </Field>
                            <ErrorMessage
                              name="chronJobTypeId"
                              component="div"
                              className="has-error text-danger"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="intervalTypeId">
                              Select Interval Type
                              <span className="text-danger"> *</span>
                            </label>
                            <Field
                              as="select"
                              name="intervalTypeId"
                              onChange={handleChange}
                              aria-describedby="enterModel"
                              className="form-group form-select text-dark"
                            >
                              <option
                                value="0"
                                label="Interval Types"
                                className="text-muted"
                              ></option>
                              {state.intervalTypes}
                            </Field>
                            <ErrorMessage
                              name="intervalTypeId"
                              component="div"
                              className="has-error text-danger"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="daysOfTheWeekId">
                              Select Days of the Week
                              <span className="text-danger"> *</span>
                            </label>
                            <Field
                              as="select"
                              name="daysOfTheWeekId"
                              onChange={handleChange}
                              aria-describedby="enterModel"
                              className="form-group form-select text-dark"
                            >
                              <option
                                value="0"
                                label="Days of the Week"
                                className="text-muted"
                              ></option>
                              {state.dayTypes}
                            </Field>
                            <ErrorMessage
                              name="daysOfTheWeekId"
                              component="div"
                              className="has-error text-danger"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="selectStartTime">
                              Job Start Time
                            </label>
                            <TSFlatPickr
                              data-enable-time
                              name="utcHourToRun"
                              placeholder="Start Time"
                              value={values.utcHourToRun}
                              options={{
                                enableTime: true,
                                noCalendar: true,
                              }}
                              onChange={(newTime) => handleTimeChange(newTime)}
                            />
                            <ErrorMessage
                              name="utcHourToRun"
                              component="div"
                              className="has-error text-danger"
                            ></ErrorMessage>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="job-Loki-Actions ms-3">
                      <div>
                        <button
                          type="button"
                          className="btn btn-success disabled"
                          onClick={handleBack}
                          disabled={isSubmitting}
                        >
                          {backLabel}
                        </button>
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={onNextClick}
                          disabled={isSubmitting}
                        >
                          {nextLabel}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}
export default withFormik({
  enableReinitialize: true,

  mapPropsToValues: (props) => ({
    chronJobTypeId: props.formData.chronJobTypeId,
    intervalTypeId: props.formData.intervalTypeId,
    daysOfTheWeekId: props.formData.daysOfTheWeekId,
    utcHourToRun: props.formData.utcHourToRun,
  }),
  validationSchema: jobSettingsSchema,
  handleSubmit: function (values, { props }) {
    _logger("handleSubmit values---->", values, props);
    props.onNext(values);
  },
})(JobSettingsForm);

JobSettingsForm.propTypes = {
  values: PropTypes.shape({
    chronJobType: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }).isRequired
    ),
    intervalTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }).isRequired
    ),
    daysOfTheWeek: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }).isRequired
    ),
    chronJobTypeId: PropTypes.string.isRequired,
    intervalTypeId: PropTypes.string.isRequired,
    daysOfTheWeekId: PropTypes.string.isRequired,
    utcHourToRun: PropTypes.instanceOf(Date).isRequired,
  }),
  formData: PropTypes.shape({
    chronJobType: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }).isRequired
    ),
    intervalTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }).isRequired
    ),
    daysOfTheWeek: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }).isRequired
    ),
    chronJobTypeId: PropTypes.string.isRequired,
    intervalTypeId: PropTypes.string.isRequired,
    daysOfTheWeekId: PropTypes.string.isRequired,
    utcHourToRun: PropTypes.instanceOf(Date).isRequired,
  }),
  handleSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  backLabel: PropTypes.string.isRequired,
  nextLabel: PropTypes.string.isRequired,
  setValues: PropTypes.func.isRequired,
};

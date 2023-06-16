import React, { useState } from "react";
import PropTypes from "prop-types";
import debug from "sabio-debug";
import { useEffect } from "react";
import { Col, Row, Card } from "react-bootstrap";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import toastr from "toastr";
import lookUpService from "services/lookUpService";
import jobRecipientSchema from "./jobRecipientScema";
import organizationsService from "services/organizationService";
import trainingUnitService from "services/trainingUnitService";
import traineesService from "services/traineesService";

const _logger = debug.extend("JobRecipientForm");
let entityTypesTable = ["entityTypes"];

function JobRecipientForm(props) {
  const {
    values,
    isSubmitting,
    handleChange,
    handleSubmit,
    backLabel,
    nextLabel,
    onBack,
    onNext,
  } = props;

  const [state, setState] = useState({
    entityTypes: [],
    organizations: [],
    trainingUnits: [],
    trainees: {
      trainees: [],
      traineeOptions: [],
    },
  });

  useEffect(() => {
    lookUpService
      .LookUp(entityTypesTable)
      .then(onEntityTypeSuccess)
      .catch(onEntityTypeError);
    organizationsService
      .getAll()
      .then(onGetOrganizationsSuccess)
      .catch(onGetOrganizationsError);
  }, []);

  useEffect(() => {
    if (values.recipientId) {
      let myTrainee = state.trainees.trainees.find(
        (trainee) => trainee.id === parseInt(values.recipientId)
      );
      let recipientEmail = myTrainee?.user?.email;
      values.recipient = recipientEmail;
    }
  }, [values.recipientId]);

  useEffect(() => {
    if (values.organizationId) {
      trainingUnitService
        .getAllTrainingUnit()
        .then(onGetTrainingUnitsSuccess)
        .catch(onGetTrainingUnitsError);
    }
  }, [values.organizationId]);

  useEffect(() => {
    if (values.trainingUnitId) {
      traineesService
        .getTraineesByTrainingUnitIdV2(parseInt(values.trainingUnitId))
        .then(onGetTraineesSuccess)
        .catch(onGetTraineesError);
    }
  }, [values.trainingUnitId]);

  const onEntityTypeSuccess = (response) => {
    let entityTypes = response.item.entityTypes.filter((type) =>
      type.name.includes("Trainees")
    );
    setState((prevState) => {
      let mappedEntityTypes = { ...prevState };
      mappedEntityTypes.entityTypes = entityTypes.map(mapTypes);
      return mappedEntityTypes;
    });
  };

  const onEntityTypeError = (error) => {
    toastr.error("Something went wrong...");
    _logger(error);
  };

  const onGetOrganizationsSuccess = (response) => {
    let organizations = response.item;
    setState((prevState) => {
      let newState = { ...prevState };
      newState.organizations = organizations.map(mapTypes);
      return newState;
    });
  };

  const onGetOrganizationsError = (error) => {
    toastr.error("Something went wrong...");
    _logger(error);
  };

  const onGetTrainingUnitsSuccess = (response) => {
    let trainingUnits = response.items.filter(
      (unit) => unit.organization?.id === parseInt(values.organizationId)
    );
    setState((prevState) => {
      let newState = { ...prevState };
      newState.trainingUnits = trainingUnits.map(mapTypes);
      return newState;
    });
  };

  const onGetTrainingUnitsError = (error) => {
    toastr.error("Something went wrong...");
    _logger(error);
  };

  const onGetTraineesSuccess = (response) => {
    let traineesArr = response.item;
    setState((prevState) => {
      let newState = { ...prevState };
      newState.trainees.trainees = traineesArr;
      newState.trainees.traineeOptions = traineesArr.map(mapTrainees);
      return newState;
    });
  };

  const onGetTraineesError = (error) => {
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

  const mapTrainees = (trainee) => {
    return (
      <option key={trainee.id} value={trainee.id}>
        {trainee.user.firstName} {trainee.user.lastName}
      </option>
    );
  };

  const handleBack = () => {
    onBack(values);
  };

  const onNextClick = () => {
    onNext(values);
  };

  return (
    <React.Fragment>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={12} md={12} className="py-8 py-xl-0">
          <Card>
            <Card.Body className="p-4 job-recipient-form">
              <Form onSubmit={handleSubmit}>
                <div className="container-fluid p-2">
                  <div className="row">
                    <div className="mb-4 col-lg-12 col-md-12 jobrecipient-loki-form">
                      <div className="card p-3">
                        <div className="form-group">
                          <h1 className="mb-1 fw-bold jobrecipient-form-header">
                            Job Recipient
                          </h1>
                          <div className="form-group">
                            <label htmlFor="entityTypeId">
                              Select Entity Type
                              <span className="text-danger"> *</span>
                            </label>
                            <Field
                              as="select"
                              name="entityTypeId"
                              onChange={handleChange}
                              aria-describedby="enterModel"
                              className="form-group form-select text-dark"
                            >
                              <option
                                value="0"
                                label="Entity Types"
                                className="text-muted"
                              ></option>
                              {state.entityTypes}
                            </Field>
                            <ErrorMessage
                              name="entityTypeId"
                              component="div"
                              className="has-error text-danger"
                            />
                          </div>
                          {values.entityTypeId === "3" && (
                            <div className="form-group">
                              <label htmlFor="organizationId">
                                Select Organization
                                <span className="text-danger"> *</span>
                              </label>
                              <Field
                                as="select"
                                name="organizationId"
                                onChange={handleChange}
                                aria-describedby="enterModel"
                                className="form-group form-select text-dark"
                              >
                                <option
                                  value=""
                                  label="Organizations"
                                  className="text-muted"
                                ></option>
                                {state.organizations}
                              </Field>
                              <ErrorMessage
                                name="organizationId"
                                component="div"
                                className="has-error text-danger"
                              />
                            </div>
                          )}
                          {values.organizationId && (
                            <div className="form-group">
                              <label htmlFor="trainingUnitId">
                                Select Training Unit
                                <span className="text-danger"> *</span>
                              </label>
                              <Field
                                as="select"
                                name="trainingUnitId"
                                onChange={handleChange}
                                aria-describedby="enterModel"
                                className="form-group form-select text-dark"
                              >
                                <option
                                  value=""
                                  label="Training Units"
                                  className="text-muted"
                                ></option>
                                {state.trainingUnits}
                              </Field>
                              <ErrorMessage
                                name="trainingUnitId"
                                component="div"
                                className="has-error text-danger"
                              />
                            </div>
                          )}
                          {values.trainingUnitId && (
                            <div className="form-group">
                              <label htmlFor="recipientId">
                                Select Trainee
                                <span className="text-danger"> *</span>
                              </label>
                              <Field
                                as="select"
                                name="recipientId"
                                onChange={handleChange}
                                aria-describedby="enterModel"
                                className="form-group form-select text-dark"
                              >
                                <option
                                  value=""
                                  label="Recipient"
                                  className="text-muted"
                                ></option>
                                {state.trainees.traineeOptions}
                              </Field>
                              <ErrorMessage
                                name="recipientId"
                                component="div"
                                className="has-error text-danger"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="job-Loki-Actions ms-3">
                      <div>
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={handleBack}
                          disabled={isSubmitting}
                        >
                          {backLabel}
                        </button>
                        <button
                          type="button"
                          className="btn btn-success finish-btn"
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
    entityTypeId: props.formData.entityTypeId,
    organizationId: props.formData.organizationId,
    trainingUnitId: props.formData.trainingUnitId,
    recipientId: props.formData.recipientId,
  }),
  validationSchema: jobRecipientSchema,
  handleSubmit: function (values, { props }) {
    _logger("handleSubmit values---->", values, props);
    props.onNext(values);
  },
})(JobRecipientForm);

JobRecipientForm.propTypes = {
  values: PropTypes.shape({
    entityTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ).isRequired,
    entityTypeId: PropTypes.string.isRequired,
    organizationId: PropTypes.string.isRequired,
    trainingUnitId: PropTypes.string.isRequired,
    recipientId: PropTypes.string.isRequired,
    recipient: PropTypes.string.isRequired,
  }),
  formData: PropTypes.shape({
    entityTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ).isRequired,
    entityTypeId: PropTypes.string.isRequired,
    organizationId: PropTypes.string.isRequired,
    trainingUnitId: PropTypes.string.isRequired,
    recipientId: PropTypes.string.isRequired,
    recipient: PropTypes.string.isRequired,
  }),
  handleSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  backLabel: PropTypes.string.isRequired,
  nextLabel: PropTypes.string.isRequired,
};

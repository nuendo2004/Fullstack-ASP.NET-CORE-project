import React, { useState, useEffect } from "react";
import { Col, Row, Card } from "react-bootstrap";
import { withFormik, Form, Field, ErrorMessage } from "formik";

import actorSchema from "schemas/ActorsSchema";
import lookUpService from "services/lookUpService";
import PropTypes from "prop-types";
import debug from "sabio-debug";

const _logger = debug.extend("LokiActorForm");
let actorTypeTable = ["actorTypes"];
let statusTypeTable = ["statusTypes"];

function ActorForm(props) {

  const {
    isSubmitting,
    handleChange,
    handleSubmit,
    backLabel,
    nextLabel,
    onBack,    
    onHomeClicked,
  } = props;

  _logger("actorForm prop values--->", props);

  const [state, setState] = useState({
    actorType: [],
    statusType: [],
  });

  const placeHolders = {
    name: "Actor Name",
    description: "Description of Actor roles",
  };

  useEffect(() => {
    lookUpService.LookUp(statusTypeTable).then(onStatusTypeSuccess).catch();
    lookUpService.LookUp(actorTypeTable).then(onActorTypeSuccess).catch();
  }, []);

  const onActorTypeSuccess = (response) => {
    let actorTypes = response.item.actorTypes;
    setState((prevState) => {
      let mappedActorTypes = { ...prevState };
      mappedActorTypes.actorType = actorTypes.map(mapTypes);
      return mappedActorTypes;
    });
  };

  const onStatusTypeSuccess = (response) => {
    let statusTypes = response.item.statusTypes;
    setState((prevState) => {
      let mappedStatusTypes = { ...prevState };
      mappedStatusTypes.statusType = statusTypes.map(mapTypes);
      return mappedStatusTypes;
    });
  };

  const mapTypes = (type) => {
    return (
      <option key={type.id} value={type.id}>
        {type.name}
      </option>
    );
  };

  const handleBack = (values) => {
    onBack(values);
  };
  
  return (
    <React.Fragment>
      <Row className="align-items-center justify-content-center g-0">
        <Col lg={12} md={12} className="py-8 py-xl-0 actor-col-form">
          <Card className="actor-card">
            <Card.Body className="p-4 actor-form">
              <Form onSubmit={handleSubmit} className="actor-form-text">
                <div className="container-fluid p-2">
                  <div className="row">
                    <div className="mb-4 col-lg-12 col-md-12 actor-loki-form">
                      <div className="card p-3 actor-form-loki">
                        <div className="form-group">
                          <h1 className="mb-1 fw-bold actor-form-header">
                            Create Actor
                          </h1>
                          <div className="mb-3">
                            <label className="form-label " htmlFor="actorName">
                              Name
                            </label>
                            <Field
                              type="input"
                              name="actorName"
                              className="form-control"
                              placeholder={placeHolders.name}
                              onChange={handleChange}
                              value={props.values.actorName}
                            />
                            <ErrorMessage
                              name="actorName"
                              component="div"
                              className="has-error"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="actorDescription">Description</label>
                          <Field
                            component="textarea"
                            rows="2"
                            name="actorDescription"
                            className="form-control"
                            placeholder={placeHolders.description}
                            onChange={handleChange}
                            value={props.values.actorDescription}
                          />
                          <ErrorMessage
                            name="actorDescription"
                            component="div"
                            className="has-error"
                          />
                        </div>
                        <br />
                        <div className="form-group mb-4">
                          <div>
                            <label htmlFor="actorTypeId">
                              Select ActorType{" "}
                              <span className="text-danger">*</span>
                            </label>
                          </div>
                          <Field
                            as="select"
                            name="actorTypeId"                            
                            aria-describedby="enterModel"
                            className="form-group form-select text-dark"                           
                          >
                            <option
                              value="0"
                              label="Actor Types"
                              className="text-muted"
                            ></option>
                            {state.actorType}
                          </Field>
                          <ErrorMessage
                            name="actorTypeId"
                            component="div"
                            className="has-error text-danger"
                          />
                        </div>
                        <div className="form-group">
                          <div>
                            <label htmlFor="statusTypeId">
                              Select StatusType{" "}
                              <span className="text-danger">*</span>
                            </label>
                          </div>
                          <Field
                            as="select"
                            name="statusTypeId"                                                      
                            aria-describedby="enterModel"
                            className="form-group form-select text-dark"                           
                          >
                            <option
                              value="0"
                              label="Actor Status"
                              className="text-muted"
                            ></option>
                            {state.statusType}
                          </Field>
                          <ErrorMessage
                            name="statusTypeId"
                            component="div"
                            className="has-error text-danger"
                          />
                        </div>
                        <br />
                      </div>
                    </div>
                    <div className="Loki-Actions ms-3">
                      <div className="first-btns">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleBack}                          
                          disabled="disabled"
                        >
                          {backLabel}
                        </button>
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                        >
                          {nextLabel}
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="back-btn btn btn-success loki-home-btn"
                          onClick={onHomeClicked}
                        >
                          Start Over
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
              <br />
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
    actorName: props.formData.actorName || '',
    actorDescription: props.formData.actorDescription || '',
    actorTypeId: props.formData.actorTypeId || [],
    statusTypeId: props.formData.statusTypeId || [],
    createdBy: props.user.id,
    modifiedBy: props.user.id,    
  }),
  validationSchema: actorSchema,
  handleSubmit: function (values, {props}) {         
    props.onNext(values);    
  },
})(ActorForm);

ActorForm.propTypes = { 
  values: PropTypes.shape({
    actorName: PropTypes.string.isRequired,
    actorDescription: PropTypes.string.isRequired,
    actorTypeId: PropTypes.arrayOf(Array),
    statusTypeId: PropTypes.arrayOf(Array),
    createdBy: PropTypes.number.isRequired,
    modifiedBy: PropTypes.number.isRequired,    
  }).isRequired,
  formData: PropTypes.shape({
    actorName: PropTypes.string.isRequired,
    actorDescription: PropTypes.string.isRequired,
    actorTypeId: PropTypes.string.isRequired,
    statusTypeId: PropTypes.string.isRequired,
    createdBy: PropTypes.number.isRequired,
    modifiedBy: PropTypes.number.isRequired,      
  }).isRequired,
  handleSubmit: PropTypes.func,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  handleChange: PropTypes.func,
  isSubmitting: PropTypes.bool,
  backLabel: PropTypes.string,
  nextLabel: PropTypes.string,
  onHomeClicked: PropTypes.func,
  mergeValues: PropTypes.func,
};

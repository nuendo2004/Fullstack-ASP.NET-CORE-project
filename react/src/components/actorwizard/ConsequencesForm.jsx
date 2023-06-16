import React, { useEffect, useState, Fragment } from "react";
import { Col, Row, Card } from "react-bootstrap";
import { Form, Field, ErrorMessage, withFormik } from "formik";
import PropTypes from "prop-types";
import zonesService from "services/zonesServices";
import lookUpService from "services/lookUpService";
import consequencesSchema from "schemas/consequencesSchema";
import debug from "sabio-debug";

const _logger = debug.extend("LokiConsequenceForm");
let tableName = ["consequenceTypes"];

function ConsequencesForm(props) {
  _logger(props);

  const {
    values,
    isSubmitting,
    handleChange,
    handleSubmit,
    backLabel,
    nextLabel,
    onBack,
    onNext,
    onHomeClicked,
  } = props;

  const [zones, setZones] = useState(
    {
      actorZones: [],
      actorCons: [],
    },[]);

  const handleBack = () => {
    onBack(values);
  };
  const onNextClick = () => {
    onNext(values);
  };

  useEffect(() => {
    zonesService.getAll().then(onZonesSuccess).catch(onZonesError);
    lookUpService.LookUp(tableName).then(onLookUpSuccess).catch();
  }, []);

  const onZonesSuccess = (res) => {    
    let zones = res.items;
    setZones((prevState) => {
      let mappedZones = { ...prevState };
      mappedZones.actorZones = zones.map(mapTypes);
      return mappedZones;
    });
  };
  const onLookUpSuccess = (res) => {   
    const lookUp = res.item.consequenceTypes;
    setZones((prevState) => {
      let cons = { ...prevState };
      cons.actorCons = lookUp.map(mapTypes);
      return cons;
    });
  };

  const mapTypes = (type) => {
    return (
      <option key={type.id} value={type.id}>
        {type.name}
      </option>
    );
  };

  const onZonesError = (res) => {
    _logger("error res--->", res);
  };

  return (
    <Fragment>
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
                            Actor Consequences
                          </h1>
                          <div className="mb-3">
                            <label
                              className="form-label "
                              htmlFor="conName"
                            >
                              Name
                            </label>
                            <Field
                              type="input"
                              name="conName"
                              className="form-control"                                                            
                              onChange={handleChange}
                            />
                            <ErrorMessage
                              name="conName"
                              component="div"
                              className="has-error"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="conDescription">
                            Description
                          </label>
                          <Field
                            component="textarea"
                            rows="2"
                            name="conDescription"
                            
                            className="form-control"
                          />
                          <ErrorMessage
                            name="conDescription"
                            component="div"
                            className="has-error"
                          />
                        </div>
                        <br />
                        <div className="form-group mb-4">
                          <div>
                            <label htmlFor="consequenceTypeId">
                              Select Consequence Type{" "}
                              <span className="text-danger">*</span>
                            </label>
                          </div>
                          <Field
                            as="select"
                            name="consequenceTypeId"                            
                            aria-describedby="enterModel"
                            className="form-group form-select text-dark"
                          >
                            <option
                              value="0"
                              label="Consequence Type"
                              className="text-muted"
                            ></option>
                            {zones.actorCons}
                          </Field>
                          <ErrorMessage
                            name="consequenceTypeId"
                            component="div"
                            className="has-error text-danger"
                          />
                        </div>
                        <div className="form-group">
                          <div>
                            <label htmlFor="zoneId">
                              Select Zone <span className="text-danger">*</span>
                            </label>
                          </div>
                          <Field
                            as="select"
                            name="zoneId"                            
                            aria-describedby="enterModel"
                            className="form-group form-select text-dark"
                          >
                            <option
                              value="0"
                              label="Zone"
                              className="text-muted"
                            ></option>
                            {zones.actorZones}
                          </Field>
                          <ErrorMessage
                            name="zoneId"
                            component="div"
                            className="has-error text-danger"
                          />
                        </div>
                        <br />
                      </div>
                    </div>
                    <div className="Loki-Actions ms-3">
                      <div>
                        <button
                          type="button"
                          onClick={handleBack}
                          disabled={isSubmitting}
                          className="btn btn-primary"
                        >
                          {backLabel}
                        </button>
                        <button
                          type="button"
                          onClick={onNextClick}
                          disabled={isSubmitting}
                          className="btn btn-success"
                        >
                          {nextLabel}
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="back-btn btn btn-success"
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
    </Fragment>
  );
}

export default withFormik({
  enableReinitialize: true,

  mapPropsToValues: (props) => ({
    conName: props.formData.conName,
    conDescription: props.formData.conDescription,
    consequenceTypeId: props.formData.consequenceTypeId, 
    zoneId: props.formData.zoneId,  
    createdBy: props.user.id,
    modifiedBy: props.user.id,
  }),
  validationSchema: consequencesSchema,
  handleSubmit: function (values, { props }) {
    props.onNext(values);
  },
})(ConsequencesForm);

ConsequencesForm.propTypes = {
  values: PropTypes.shape({   
      conName: PropTypes.string.isRequired,
      conDescription: PropTypes.string.isRequired,
      consequenceTypeId: PropTypes.arrayOf(Array),
      zoneId: PropTypes.arrayOf(Array),         
  }).isRequired,
  formData: PropTypes.shape({
    conDescription: PropTypes.string.isRequired,
    conName: PropTypes.string.isRequired,
    consequenceTypeId: PropTypes.string.isRequired,
    zoneId: PropTypes.string.isRequired,
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

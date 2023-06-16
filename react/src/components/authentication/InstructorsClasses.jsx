import React, { useEffect } from "react";
import addEditService from "../../services/trainingUnitService";
import zonesService from "../../services/zonesServices";
import debug from "sabio-debug";
import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import toastr from "toastr";
import instructorsSchema from "../../schemas/instructorsSchema";
import "./traineeslink.css";
import zoneTokenService from "services/zoneTokenService";
import lookUpService from "services/lookUpService";
import { getAllTraineeAccounts } from "services/traineeAccountsService";
import * as helper from "services/serviceHelpers";

const _logger = debug.extend("Instructors");

const InstructorsClasses = () => {
  const [unit, setUnit] = useState([]);
  const [tokenLink, setTokenLink] = useState([]);
  const [zoneTokenType, setzoneTokenType] = useState([]);
  const [entityTypes, setentityTypes] = useState([]);
  const [traineeAccounts, settraineeAccounts] = useState([]);
  const [show, setShow] = useState(false);
  const [nameDisplay, setnameDisplay] = useState();
  const [zones, setZones] = useState([]);
  let formData = {
    zoneId: 0,
    trainingUnitId: 0,
    name: "",
    traineeId: 0,
    quantity: "",
    entityId: 0,
    zoneTokenTypeId: 0,
  };

  let zoneTokenTypeTable = ["ZoneTokenTypes"];
  let entityTypeTable = ["EntityTypes"];

  const getUnitsSuccess = (response) => {
    setUnit(response.items);
  };
  const getCatch = () => {
    toastr.error("Error retrieving data");
  };

  const getZonesSuccess = (response) => {
    let auxZonesArray = response.items;
    auxZonesArray = auxZonesArray.filter(removeFirstTwo);
    setZones(auxZonesArray);
  };

  const getZoneTokenTypesSuccess = (response) => {
    let auxZonesArray = response.item.zoneTokenTypes;
    setzoneTokenType(auxZonesArray);
    _logger("All available zone token types", zoneTokenType);
  };

  const getEntityTypesSuccess = (response) => {
    _logger(response);
    let auxEntitiesArray = response.item.entityTypes;
    setentityTypes(auxEntitiesArray);
    _logger("All available entity types", entityTypes);
  };
  const removeFirstTwo = (zonesArray) => {
    if (zonesArray.id === 1 || zonesArray.id === 2) {
      return false;
    } else {
      return true;
    }
  };

  const getAllTraineeAccountsSuccess = (response) => {
    _logger("ALL TRAINEE ACCOUNTS", response);
    let auxTraineeAccountsArray = response.items;
    auxTraineeAccountsArray = auxTraineeAccountsArray.filter(removeDisabled);
    auxTraineeAccountsArray = auxTraineeAccountsArray.map(changeUserToName);
    _logger("ALL AVAILABLE TRAINEE ACCOUNTS", auxTraineeAccountsArray);
    settraineeAccounts(auxTraineeAccountsArray);
  };

  const changeUserToName = (traineeArray) => {
    let newArray = [];
    newArray.name = traineeArray.username;
    newArray.id = traineeArray.id;
    return newArray;
  };

  const removeDisabled = (traineeAccountsArray) => {
    if (traineeAccountsArray.traineeStatus.name === "Active") {
      return true;
    } else {
      return false;
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(tokenLink);
  };

  const onSubmit = (internalFormikValues) => {
    _logger("FORM VALUES", internalFormikValues);
    setnameDisplay(internalFormikValues.name);
    zoneTokenService
      .addToken(internalFormikValues)
      .then(onAddTokenSuccess)
      .catch(onAddTokenCatch);
  };

  const onAddTokenSuccess = (response) => {
    _logger(response);
    setShow(true);
    setTokenLink(
      helper.API_HOST_PREFIX + "/trainees/link?token=" + response.item
    );
    _logger("Token Link", tokenLink);
  };

  const onAddTokenCatch = (response) => {
    _logger("Error generating token", response);
    toastr.error("Error generating token");
  };

  useEffect(() => {
    zonesService.getAll().then(getZonesSuccess).catch(getCatch);
    addEditService.getAllTrainingUnit().then(getUnitsSuccess).catch(getCatch);
    lookUpService
      .LookUp(zoneTokenTypeTable)
      .then(getZoneTokenTypesSuccess)
      .catch(getCatch);
    lookUpService
      .LookUp(entityTypeTable)
      .then(getEntityTypesSuccess)
      .catch(getCatch);
    getAllTraineeAccounts().then(getAllTraineeAccountsSuccess).catch(getCatch);
  }, []);

  function mapOptions(unit) {
    return (
      <option key={`unit_${unit.id}`} value={unit.id}>
        {unit.name}
      </option>
    );
  }

  function mapOptionsZone(unit) {
    return (
      <option key={`unit_${unit.id + 2}`} value={unit.id + 2}>
        {unit.name}
      </option>
    );
  }

  const linkForClass = () => {
    return (
      <React.Fragment>
        <div className="right">
          <div className="mb-4 traineeposition1 pull-right text-align-right">
            <div className="mb-4 card right">
              <h4 className="text-align-left">
                Your instruction, {nameDisplay}, is inviting you to join this
                task
              </h4>
              <h4>{tokenLink}</h4>
            </div>

            <button
              type="button"
              className="btn btn-primary me-2 margindistance w-50 right"
              onClick={copyLink}
            >
              Copy link
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <div className="form-group float-container">
        <div className="form-group float div2 w-50">
          <h5>Create access link for trainees:</h5>

          <Formik
            enableReinitialize={true}
            initialValues={formData}
            onSubmit={onSubmit}
            validationSchema={instructorsSchema}
          >
            {() => (
              <Form>
                <div className="form-group">
                  <div>
                    <label className="form-label pt-3" htmlFor="zoneId">
                      Zone <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <Field
                      as="select"
                      name="zoneId"
                      className="form-group form-select text-dark w-50"
                    >
                      <option value="" className="text-muted">
                        Select a Zone
                      </option>
                      {zones.map(mapOptionsZone)}
                    </Field>
                    <ErrorMessage
                      name="zoneId"
                      component="div"
                      className="error-required"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div>
                    <label className="form-label pt-3" htmlFor="trainingUnitId">
                      Trainee Unit <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <Field
                      as="select"
                      name="trainingUnitId"
                      className="form-group form-select text-dark w-50"
                    >
                      <option value="" className="text-muted">
                        Select Trainee Unit
                      </option>
                      {unit.map(mapOptions)}
                    </Field>
                    <ErrorMessage
                      name="trainingUnitId"
                      component="div"
                      className="error-required"
                    />
                  </div>

                  <div className="form-group">
                    <div>
                      <label className="form-label pt-3" htmlFor="name">
                        Name <span className="text-danger">*</span>
                      </label>
                    </div>
                    <Field
                      type="text"
                      name="name"
                      className="form-group text-dark w-50"
                    ></Field>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error-required"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div>
                    <label
                      className="form-label pt-3"
                      htmlFor="zoneTokenTypeId"
                    >
                      Zone Type <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <Field
                      as="select"
                      name="zoneTokenTypeId"
                      className="form-group form-select text-dark w-50"
                    >
                      <option value="" className="text-muted">
                        Select a Zone Type
                      </option>
                      {zoneTokenType.map(mapOptions)}
                    </Field>
                    <ErrorMessage
                      name="zoneTokenTypeId"
                      component="div"
                      className="error-required"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div>
                    <label className="form-label pt-3" htmlFor="entityId">
                      Entity Type <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <Field
                      as="select"
                      name="entityId"
                      className="form-group form-select text-dark w-50"
                    >
                      <option value="" className="text-muted">
                        Select an Entity Type
                      </option>
                      {entityTypes.map(mapOptions)}
                    </Field>
                    <ErrorMessage
                      name="entityId"
                      component="div"
                      className="error-required"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div>
                    <label className="form-label pt-3" htmlFor="quantity">
                      Quantity <span className="text-danger">*</span>
                    </label>
                  </div>
                  <Field
                    type="text"
                    name="quantity"
                    className="form-group text-dark w-50"
                  ></Field>
                  <ErrorMessage
                    name="quantity"
                    component="div"
                    className="error-required"
                  />
                </div>
                <div className="form-group">
                  <div>
                    <label className="form-label pt-3" htmlFor="traineeId">
                      Trainee Account <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <Field
                      as="select"
                      name="traineeId"
                      className="form-group form-select text-dark w-50"
                    >
                      <option value="" className="text-muted">
                        Select a Trainee Account
                      </option>
                      {traineeAccounts.map(mapOptions)}
                    </Field>
                    <ErrorMessage
                      name="traineeId"
                      component="div"
                      className="error-required"
                    />
                  </div>
                </div>
                <Button type="submit" className="me-1 mt-3">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="right div2 w-50">
          {show ? linkForClass() : <h3> </h3>}
        </div>
      </div>
    </React.Fragment>
  );
};

export default InstructorsClasses;

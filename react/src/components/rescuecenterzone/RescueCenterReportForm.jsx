import React, { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { Button, Card, Row, Col } from "react-bootstrap";
import rescueService from "services/rescueService";
import lookUpService from "services/lookUpService";
import { getTraineeAccountsByTraineeIdandZoneId } from "services/traineeAccountsService";
import zonesService from "services/zonesServices";
import rescueCenterReportSchema from "../../schemas/rescueCenterReportSchema";
import zoneStatuses from "./zoneStatus.js";
import { PropTypes } from "prop-types";
import * as toastr from "toastr";
import debug from "sabio-debug";

const _logger = debug.extend("RescueCenterReportForm");

function RescueCenterReportForm(props) {
  const user = props.currentUser;

  const [formData] = useState({
    subject: "",
    description: "",
    eventReportingTypeId: 0,
    traineeId: 0,
    traineeAccountId: 0,
    zoneId: 0,
  });
  const [eventReportingTypes, setEventReportingTypes] = useState({
    arrOfEventTypes: [],
    eventTypesComponents: [],
  });
  const [traineeAccounts, setTraineeAccounts] = useState({
    arrOfTraineeAccounts: [],
    traineeAccountComponents: [],
  });
  const [zones, setZones] = useState({
    arrOfZones: [],
    zoneComponents: [],
  });

  useEffect(() => {
    lookUpService
      .LookUp(["EventReportingTypes"])
      .then(onEventReportingTypesLookUpSuccess)
      .catch(onEventReportingTypesLookUpError);
    zonesService
      .getZoneByStatus(zoneStatuses.operational)
      .then(onGetZonesSuccess)
      .catch(onGetZonesError);
    zonesService
      .getZoneByStatus(zoneStatuses.corrupted)
      .then(onGetZonesSuccess)
      .catch(onGetZonesError);
  }, []);

  const onSelectChange = (e) => {
    const target = e.target;
    const value = target.value;
    _logger("value", value);
    if (target.name === "zoneId") {
      getTraineeAccountsByTraineeIdandZoneId(user.currentTraineeId, value)
        .then(onGetTraineeAccountsSuccess)
        .catch(onGetTraineeAccountsError);
    }
  };

  const onEventReportingTypesLookUpSuccess = (response) => {
    _logger("onEventReportingTypesLookUpSuccess", response);
    const allEventReportingTypes = response.item.eventReportingTypes;
    setEventReportingTypes((prevState) => {
      const d = { ...prevState };
      d.arrOfEventTypes = allEventReportingTypes;
      d.eventTypesComponents = allEventReportingTypes.map(
        mapEventReportingTypes
      );
      return d;
    });
  };
  const onEventReportingTypesLookUpError = (err) => {
    _logger("onEventReportingTypesLookUpError", err);
  };
  const mapEventReportingTypes = (type) => {
    return (
      <option key={`type_${type.id}`} value={type.id} className="text-dark">
        {type.name}
      </option>
    );
  };

  const onGetZonesSuccess = (response) => {
    _logger("onGetZonesSuccess", response);
    const allZones = response.items;
    if (!zones.arrOfZones.some((e) => e.id === allZones[0].id)) {
      setZones((prevState) => {
        const d = { ...prevState };
        d.arrOfZones.push(...allZones);
        d.zoneComponents = d.arrOfZones.map(mapZones);
        return d;
      });
    }
  };
  const onGetZonesError = (err) => {
    _logger("onGetZonesError", err);
  };
  const mapZones = (zone) => {
    return (
      <option key={`zone_${zone.id}`} value={zone.id} className="text-dark">
        {zone.name}
      </option>
    );
  };
  const onGetTraineeAccountsSuccess = (response) => {
    _logger("onGetTraineeAccountsSuccess", response);
    const allTraineeAccounts = response.items;
    setTraineeAccounts((prevState) => {
      const d = { ...prevState };
      d.arrOfTraineeAccounts = allTraineeAccounts;
      d.traineeAccountComponents = allTraineeAccounts.map(mapTraineeAccounts);
      return d;
    });
  };
  const onGetTraineeAccountsError = (err) => {
    _logger("onGetTraineeAccountsError", err);
    setTraineeAccounts((prevState) => {
      const d = { ...prevState };
      d.arrOfTraineeAccounts = [];
      d.traineeAccountComponents = [];
      return d;
    });
  };
  const mapTraineeAccounts = (tAccount) => {
    return (
      <option
        key={`tAccount_${tAccount.id}`}
        value={tAccount.id}
        className="text-dark"
      >
        {tAccount.username}
      </option>
    );
  };

  const onSubmit = (values, { resetForm }) => {
    _logger("formdata", values);
    const payload = { ...values };
    payload.eventReportingTypeId = parseInt(values.eventReportingTypeId);
    payload.traineeId = user.currentTraineeId;
    if (values.traineeAccountId) {
      payload.traineeAccountId = parseInt(values.traineeAccountId);
    } else {
      payload.traineeAccountId = null;
    }
    if (values.zoneId) {
      payload.zoneId = parseInt(values.zoneId);
    } else {
      payload.zoneId = null;
    }
    _logger("Payload", payload);
    rescueService
      .addRescueReport(payload)
      .then(onAddRescueReportSuccess)
      .catch(onAddRescueReportError);
    resetForm({ values: "" });
  };
  const onAddRescueReportSuccess = (response) => {
    _logger("onAddRescueReportSuccess Respone", response);
    toastr.success("Rescue Center Report Added");
  };
  const onAddRescueReportError = (err) => {
    _logger("onAddRescueReportError Error", err);
    toastr.error("Unable To Add Report");
  };

  return (
    <React.Fragment>
      <Row className="align-items-center justify-content-center g-0 mt-5">
        <Col lg={7} md={7}>
          <div className="mb-3">
            <p className="lead mb-4">
              {
                "Did you come accross a security event in your training? You can describe it below and select where it happened to report it"
              }
            </p>
          </div>
          <Card>
            <Card.Body className="p-6">
              <h2 className="mb-0 fw-semi-bold">Submit a Report</h2>
              <div className="container">
                <Formik
                  enableReinitialize={true}
                  initialValues={formData}
                  validationSchema={rescueCenterReportSchema}
                  onSubmit={onSubmit}
                >
                  {({ handleChange }) => (
                    <Form>
                      <div className="form-group">
                        <div>
                          <label className="form-label pt-3" htmlFor="subject">
                            Subject <span className="text-danger">*</span>
                          </label>
                        </div>
                        <div className="form-group">
                          <Field
                            name="subject"
                            type="text"
                            className="text-dark form-control"
                            placeholder="Add Subject"
                          ></Field>
                          <ErrorMessage
                            name="subject"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div>
                          <label
                            className="form-label pt-3"
                            htmlFor="description"
                          >
                            Description <span className="text-danger">*</span>
                          </label>
                        </div>
                        <div className="form-group">
                          <Field
                            name="description"
                            component="textarea"
                            className="text-dark form-control"
                            placeholder="Add Description"
                          ></Field>
                          <ErrorMessage
                            name="description"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div>
                          <label
                            className="form-label pt-3"
                            htmlFor="eventReportingTypeId"
                          >
                            Event Type <span className="text-danger">*</span>
                          </label>
                        </div>
                        <div className="form-group">
                          <Field
                            as="select"
                            name="eventReportingTypeId"
                            className="form-group form-select text-dark"
                          >
                            <option value="" className="text-muted">
                              Select a Event Type
                            </option>
                            {eventReportingTypes.eventTypesComponents}
                          </Field>
                          <ErrorMessage
                            name="eventReportingTypeId"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div>
                          <label className="form-label pt-3" htmlFor="zoneId">
                            Zone <span className="text-muted">(Optional)</span>
                          </label>
                        </div>
                        <div className="form-group">
                          <Field
                            as="select"
                            name="zoneId"
                            className="form-group form-select text-dark"
                            onChange={(e) => onSelectChange(e, handleChange(e))}
                          >
                            <option value="" className="text-muted">
                              Select a Zone
                            </option>
                            {zones.zoneComponents}
                          </Field>
                        </div>
                      </div>
                      <div className="form-group">
                        <div>
                          <label
                            className="form-label pt-3"
                            htmlFor="traineeAccountId"
                          >
                            Username{" "}
                            <span className="text-muted">(Optional)</span>
                          </label>
                        </div>
                        <div className="form-group">
                          <Field
                            as="select"
                            name="traineeAccountId"
                            className="form-group form-select text-dark"
                          >
                            <option value="" className="text-muted">
                              Select your Username
                            </option>
                            {traineeAccounts.traineeAccountComponents}
                          </Field>
                        </div>
                      </div>

                      <Button type="submit" className="me-1 mt-3">
                        Submit
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

RescueCenterReportForm.propTypes = {
  currentUser: PropTypes.shape({
    avatarUrl: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool,
    roles: PropTypes.arrayOf(PropTypes.string),
    currentOrgId: PropTypes.number,
    currentTraineeId: PropTypes.number.isRequired,
  }),
};

export default RescueCenterReportForm;

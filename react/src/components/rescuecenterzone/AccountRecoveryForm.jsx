import React, { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { Button, Card, Row, Col, FormCheck } from "react-bootstrap";
import zonesService from "services/zonesServices";
import {
  getTraineeAccountsByTraineeIdandZoneId,
  updateTraineeAccountPassword,
} from "services/traineeAccountsService";
import zoneStatuses from "./zoneStatus.js";
import traineeAccountRecoverySchema from "../../schemas/traineeAccountRecoverySchema";
import swal from "sweetalert2";
import debug from "sabio-debug";
import { PropTypes } from "prop-types";

const _logger = debug.extend("AccountRecoveryForm");

function AccountRecoveryForm(props) {
  const user = props.currentUser;
  const [formData] = useState({
    zoneId: 0,
    traineeAccountId: 0,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [zones, setZones] = useState({
    arrOfZones: [],
    zoneComponents: [],
  });
  const [traineeAccounts, setTraineeAccounts] = useState({
    arrOfTraineeAccounts: [],
    traineeAccountComponents: [],
  });
  const [showPassword, setShowPassword] = useState({
    currentShowPassword: false,
    currentCheckbox: false,
    newShowPassword: false,
    newCheckbox: false,
  });

  useEffect(() => {
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
    if (target.name === "zoneId") {
      getTraineeAccountsByTraineeIdandZoneId(user.currentTraineeId, value)
        .then(onGetTraineeAccountsSuccess)
        .catch(onGetTraineeAccountsError);
    }
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
    const payload = { ...values };
    _logger("payload", payload);
    payload.traineeAccountId = parseInt(values.traineeAccountId);
    payload.zoneId = parseInt(values.zoneId);
    swal
      .fire({
        icon: "warning",
        title: "Are you sure you want to reset credentials?",
        confirmButtonText: "Yes",
        showCancelButton: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          updateTraineeAccountPassword(payload)
            .then(onUpdateTraineeAccountPasswordSuccess)
            .then(resetForm)
            .catch(onUpdateTraineeAccountPasswordError);
        } else if (result.isDismissed) {
          swal.fire({
            icon: "success",
            title: "Successfully Cancelled",
            confirmButtonText: "Close",
            timer: 2000,
          });
        }
      });
  };
  const onUpdateTraineeAccountPasswordSuccess = (response) => {
    _logger("onUpdateTraineeAccountPasswordSuccess", response);
    swal.fire({
      icon: "success",
      title: "Credentials have been reset",
      confirmButtonText: "Close",
      timer: 3000,
    });
  };
  const onUpdateTraineeAccountPasswordError = (err) => {
    _logger("onUpdateTraineeAccountPasswordError", err);
    swal.fire({
      icon: "error",
      title: "Unable to update credentials",
      text: "Please confirm information is correct",
      confirmButtonText: "Close",
    });
  };
  const onShowPassword = (e) => {
    _logger(e.target.id);
    setShowPassword((prevState) => {
      const d = { ...prevState };
      if (e.target.id === "currentPasswordCheck") {
        d.currentShowPassword = !showPassword.currentShowPassword;
      } else if (e.target.id === "newPasswordCheck") {
        d.newShowPassword = !showPassword.newShowPassword;
      }
      return d;
    });
  };
  const setCheckbox = (e) => {
    setShowPassword((prevState) => {
      const d = { ...prevState };
      if (e.target.name === "currentPassword") {
        d.currentCheckbox = true;
      } else if (e.target.name === "newPassword") {
        d.newCheckbox = true;
      }
      return d;
    });
  };
  return (
    <React.Fragment>
      <Row className="align-items-center justify-content-center g-0 mt-5">
        <Col lg={7} md={7}>
          <div className="mb-3">
            <p className="lead mb-4">
              {
                "Are you locked out of your account? You can attempt to recover it below, but first you will need to know your current account information"
              }
            </p>
          </div>
          <Card>
            <Card.Body className="p-6">
              <h2>Recover My Account</h2>
              <div className="container">
                <Formik
                  enableReinitialize={true}
                  initialValues={formData}
                  validationSchema={traineeAccountRecoverySchema}
                  onSubmit={onSubmit}
                >
                  {({ handleChange }) => (
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
                            className="form-group form-select text-dark"
                            onChange={(e) => onSelectChange(e, handleChange(e))}
                          >
                            <option value="" className="text-muted">
                              Select a Zone
                            </option>
                            {zones.zoneComponents}
                          </Field>
                          <ErrorMessage
                            name="zoneId"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div>
                          <label
                            className="form-label pt-3"
                            htmlFor="traineeAccountId"
                          >
                            Username <span className="text-danger">*</span>
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
                          <ErrorMessage
                            name="traineeAccountId"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div>
                          <label
                            className="form-label pt-3"
                            htmlFor="currentPassword"
                          >
                            Current Password{" "}
                            <span className="text-danger">*</span>
                          </label>
                        </div>
                        <div className="form-group">
                          <Field
                            name="currentPassword"
                            type={
                              showPassword.currentShowPassword
                                ? "text"
                                : "password"
                            }
                            className="text-dark form-control"
                            placeholder="Confirm Current Password"
                            onFocus={setCheckbox}
                          ></Field>
                          {showPassword.currentCheckbox ? (
                            <FormCheck
                              type="checkbox"
                              className="mt-1 ms-1"
                              label="Show Password"
                              id="currentPasswordCheck"
                              onClick={onShowPassword}
                            />
                          ) : (
                            ""
                          )}
                          <ErrorMessage
                            name="currentPassword"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div>
                          <label
                            className="form-label pt-3"
                            htmlFor="newPassword"
                          >
                            New Password <span className="text-danger">*</span>
                          </label>
                        </div>
                        <div className="form-group">
                          <Field
                            name="newPassword"
                            type={
                              showPassword.newShowPassword ? "text" : "password"
                            }
                            className="text-dark form-control"
                            placeholder="New Password"
                            onFocus={setCheckbox}
                          ></Field>
                          {showPassword.newCheckbox ? (
                            <FormCheck
                              type="checkbox"
                              className="mt-1 ms-1"
                              label="Show Password"
                              id="newPasswordCheck"
                              onClick={onShowPassword}
                            />
                          ) : (
                            ""
                          )}
                          <ErrorMessage
                            name="newPassword"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div>
                          <label
                            className="form-label pt-3"
                            htmlFor="confirmPassword"
                          >
                            Confirm Password{" "}
                            <span className="text-danger">*</span>
                          </label>
                        </div>
                        <div className="form-group">
                          <Field
                            name="confirmPassword"
                            type={
                              showPassword.newShowPassword ? "text" : "password"
                            }
                            className="text-dark form-control"
                            placeholder="Confirm Password"
                          ></Field>
                          <ErrorMessage
                            name="confirmPassword"
                            component="div"
                            className="text-danger"
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}
AccountRecoveryForm.propTypes = {
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

export default AccountRecoveryForm;

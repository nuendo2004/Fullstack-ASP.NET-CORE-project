import React, { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form as FormikForm } from "formik";
import { Col, Row, TabContainer } from "react-bootstrap";
import toastr from "toastr";
import { loginTraineeAccount } from "../../../services/traineeAccountsService";
import { useLocation, useNavigate } from "react-router-dom";
import traineeAccountLoginSchema from "schemas/traineeAccountLoginSchema";
import lookUpService from "services/lookUpService";
import debug from "sabio-debug";
import accessLogsService from "services/accessLogsService";

const _logger = debug.extend("ZoneLogin");

function ZoneLogin() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData] = useState({
    username: "",
    password: "",
    zoneId: location.state.payload.zoneId,
    DeviceTypeId: 2,
  });

  const [userDevice] = useState({
    platform: window?.navigator?.userAgentData?.platform,
  });
  _logger(userDevice.platform);

  useEffect(() => {
    lookUpService
      .LookUp(["DeviceTypes"])
      .then(onGetDeviceTypeSuccess)
      .catch(onGetDeviceTypeError);
  }, []);

  const onGetDeviceTypeSuccess = (response) => {
    const devTypes = response?.item.deviceTypes;
    _logger("onGetDevTypes", devTypes);
    const matchingDeviceType = devTypes.find(
      (deviceTypes) => deviceTypes.name === userDevice.platform
    );
    if (matchingDeviceType) {
      accessLogsService.insertAccessLogs(matchingDeviceType.id);
    } else {
      accessLogsService.insertAccessLogs(devTypes[7].id);
    }
  };

  const onGetDeviceTypeError = (err) => {
    _logger("onGetDeviceTypeError", err);
  };

  const onClickSubmit = (values) => {
    const payload = { ...values };
    payload.platform = userDevice.platform;
    loginTraineeAccount(payload).then(onLoginSuccess).catch(onLoginErr);
  };

  const onLoginSuccess = () => {
    const zoneId = formData.zoneId;
    const navigateToZoneMenu = (payload) => {
      const stateForTransport = { type: "ZONE_PARAMS", payload };
      navigate(`/zones/${zoneId}/menu`, {
        state: stateForTransport,
      });
    };

    navigateToZoneMenu(formData);
    toastr.success("Trainee account has been successfully verified!");
  };
  const onLoginErr = (err) => {
    toastr.error("Please check for correct credentials", err);
  };

  return (
    <React.Fragment>
      <TabContainer defaultActiveKey="grid">
        <Row>
          <Col className="col-12">
            <div className="border-bottom pb-4 mb-4 d-flex align-items-center justify-content-between">
              <div className="mb-3 mb-md-0">
                <h1 className="mb-1 h2 fw-bold">
                  Please enter your Trainee Credentials
                </h1>
              </div>
            </div>
          </Col>
        </Row>
      </TabContainer>

      <Formik
        enableReinitialize={true}
        initialValues={formData}
        onSubmit={onClickSubmit}
        validationSchema={traineeAccountLoginSchema}
      >
        <FormikForm>
          <div className="container-fluid p-0">
            <div className="row">
              <div className="mb-2 col-xl-6 col-lg-12 col-md-12">
                <div className="card">
                  <div className="form-group">
                    <div className="p-5 fw-bold">
                      <label
                        className="form-label"
                        htmlFor="exampleForm.ControlInput1"
                      >
                        Username
                      </label>
                      <Field
                        type="text"
                        name="username"
                        className="form-control "
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="has-error text-danger"
                      />
                    </div>
                  </div>
                  <div className="form-group p-5 fw-bold">
                    <label htmlFor="subject">Password</label>
                    <Field
                      type="password"
                      name="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="has-error text-danger"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary mb-3 mt-5">
                    Sign in
                  </button>
                </div>
              </div>
            </div>
          </div>
        </FormikForm>
      </Formik>
    </React.Fragment>
  );
}
export default ZoneLogin;

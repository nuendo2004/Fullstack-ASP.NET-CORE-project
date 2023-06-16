import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { loginTraineeAccount } from "../../services/traineeAccountsService";
import lookUpService from "../../services/lookUpService";
import traineeAccountLoginSchema from "schemas/traineeAccountLoginSchema"
import { Card, Col, Row, Image } from "react-bootstrap";
import debug from "sabio-debug";
import { Formik, Field, ErrorMessage, Form } from "formik";
import Logo from "assets/images/brand/logo/immersed-spiral-logo.png";
import toastr from "toastr";
import accessLogsService from "services/accessLogsService";

const _logger = debug.extend("TraineeAccountLogin");

function TraineeAccLogin() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const {id} = useParams();
  const [formData] = useState({
    username: "",
    password: "", 
    zoneId: id,
    deviceTypeId: 2 
  });

  const [userDevice] = useState({ 
    platform: window?.navigator?.userAgentData?.platform,  
  });
  _logger(userDevice.platform);

  useEffect(() => {
    lookUpService.LookUp(["DeviceTypes"]).then(onGetDeviceTypeSuccess).catch(onGetDeviceTypeError);
  }, []); 

   const onGetDeviceTypeSuccess = (response) => { 
    
    const devTypes = response?.item.deviceTypes;
    _logger("onGetDevTypes", devTypes)
    const matchingDeviceType = devTypes.find(deviceTypes => deviceTypes.name === userDevice.platform);
    if (matchingDeviceType) { 
      accessLogsService.insertAccessLogs(matchingDeviceType.id)
    }
    else { 
       accessLogsService.insertAccessLogs(devTypes[7].id)
    }
   }
   
   const onGetDeviceTypeError = (err) => {
    _logger("onGetDeviceTypeError", err)
   };

  const onClickSubmit = (values) => { 
    const payload = {...values} 
    payload.platform = userDevice.platform;
    loginTraineeAccount(payload).then(onLoginSuccess).catch(onLoginErr);
  };
  const onLoginSuccess = () => {
    const zoneId = location?.state?.id;
    const zoneName = location?.state?.name?.toLowerCase();
    const urlName = zoneName?.replace(/\s/g, "");
    navigate(`/zones/${zoneId}/${urlName}`);
    toastr.success("Trainee Account Has been Successfully Verified");
  };
  const onLoginErr = (err) => {
    toastr.error("Please check for correct credentials", err);
  };
  return (
    <React.Fragment>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={10} md={10} className="py-8 py-xl-0">
          <Card>
            <Card.Body className="p-6">
              <div className="mb-4">
                <Link to="/">
                  <Image src={Logo} className="mb-4 w-15 h-15" alt="" />
                  <h3 className="d-inline pull-right">
                    <strong className="text-black">Immersed</strong>
                  </h3>
                </Link>
                <h1 className="mb-1 fw-bold">
                  Sign in to {location?.state?.name}
                </h1>
              </div>

              <Formik
                enableReinitialize={true}
                initialValues={formData}
                onSubmit={onClickSubmit}
                validationSchema={traineeAccountLoginSchema}
              >
                <Form>
                  <Row>
                    <Col lg={10} md={10} className="mb-3 m-auto">
                      <label htmlFor="username" className="pb-2">
                        Username
                      </label>
                      <Field
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        placeholder="Enter Username here"
                      />
                      <ErrorMessage
                        name="username"
                        component="p"
                        className="has-error"
                      />
                    </Col>
                    <Col lg={10} md={10} className="m-auto mt-3 form-group">
                      <label htmlFor="password">Password </label>
                      <Field
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="8 characters, 1 upper, 1 lower, 1 number, 1 symbol"
                      />
                    </Col>
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="has-error"
                    />
                    <Col
                      lg={6}
                      md={6}
                      className="m-auto mb-0 d-grid gap-2 mt-8"
                    >
                      <button type="submit" className="btn btn-primary">
                        Sign in
                      </button>
                    </Col>
                  </Row>
                </Form>
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}
export default TraineeAccLogin;

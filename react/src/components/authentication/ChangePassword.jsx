import React, { useState, Fragment } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Col, Card, Row, Image } from "react-bootstrap";
import Logo from "assets/images/brand/logo/immersed-spiral-logo.png";
import debug from "sabio-debug";
import passwordChangeSchema from "schemas/passwordChangeSchema";
import toastr from "toastr";
import userService from "services/userService";
import { useNavigate } from "react-router-dom";

const _logger = debug.extend("ForgotPassword");

function ForgotPassword() {
  const navigate = useNavigate();

  const [formData] = useState({
    password: "",
    passwordconfirm: "",
  });

  const queryParameters = new URLSearchParams(window.location.search);

  const handleSubmit = (value) => {
    const payload = value;
    payload.token = queryParameters.get("token");
    payload.email = queryParameters.get("email");
    userService
      .changePassword(payload)
      .then(onChangePasswordSuccess)
      .catch(onChangePasswordError);
  };

  const onChangePasswordSuccess = (response) => {
    _logger(response);
    toastr.success("Password successfully changed!");
    navigate("/signin");
  };

  const onChangePasswordError = (error) => {
    _logger(error.response.status);
    if (error.response.status === 403) {
      toastr.error("Password change not authorized...");
    } else if (error.response.status === 500) {
      toastr.error("Something went wrong...");
    }
  };

  false && _logger(onChangePasswordError, onChangePasswordSuccess);

  return (
    <Fragment>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={4} md={4} className="py-8 py-xl-0">
          <Card>
            <Card.Body className="p-6">
              <div className="mb-4">
                <Image src={Logo} className="mb-4 w-15 h-15" alt="" />
                <h3 className="d-inline pull-right">
                  <strong className="text-black">Immersed</strong>
                </h3>
                <h1 className="mb-1 fw-bold">Forgot Password</h1>
              </div>

              <Formik
                enableReinitialize={true}
                initialValues={formData}
                onSubmit={handleSubmit}
                validationSchema={passwordChangeSchema}
              >
                <Form>
                  <Row>
                    <Col lg={12} md={12} className="mb-3">
                      <label className="pb-2">Password </label>
                      <Field
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="New password"
                      />
                    </Col>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                    <Col lg={12} md={12} className="mb-3">
                      <label className="pb-2">Confirm password </label>
                      <Field
                        type="password"
                        className="form-control"
                        id="passwordconfirm"
                        name="passwordconfirm"
                        placeholder="New password"
                      />
                    </Col>
                    <ErrorMessage
                      name="passwordconfirm"
                      component="div"
                      className="text-danger"
                    />
                    <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                      <button className="btn btn-primary" type="submit">
                        Submit
                      </button>
                    </Col>
                  </Row>
                </Form>
              </Formik>
              <hr className="my-4" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
}

export default ForgotPassword;

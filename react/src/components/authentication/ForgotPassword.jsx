import React, { useState, Fragment } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Col, Card, Row, Image } from "react-bootstrap";
import Logo from "assets/images/brand/logo/immersed-spiral-logo.png";
import debug from "sabio-debug";
import forgotPasswordSchema from "schemas/forgotPasswordSchema";
import userService from "services/userService";
import toastr from "toastr";
import { useNavigate } from "react-router-dom";

const _logger = debug.extend("ForgotPassword");

function ForgotPassword() {
  const navigate = useNavigate();

  const [formData] = useState({
    email: "",
  });

  const handleSubmit = (value) => {
    const payload = value;
    userService
      .forgotPassword(payload)
      .then(onForgotPasswordSuccess)
      .catch(onForgotPasswordError);
  };

  const onForgotPasswordSuccess = (response) => {
    _logger(response);
    toastr.success("An email has been sent!");
    navigate("/");
  };

  const onForgotPasswordError = (error) => {
    _logger(error);
    toastr.success("An email has been sent!");
    navigate("/");
  };

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
                validationSchema={forgotPasswordSchema}
              >
                <Form>
                  <Row>
                    <Col lg={12} md={12} className="mb-3">
                      <label className="pb-2">Email </label>
                      <Field
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Email address here"
                      />
                    </Col>
                    <ErrorMessage
                      name="email"
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

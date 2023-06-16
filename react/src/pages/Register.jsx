import React, { Fragment, useState } from "react";
import debug from "sabio-debug";
import NavbarDefault from "layouts/marketing/navbars/NavbarDefaultRoutes";
import { Formik, Field, ErrorMessage } from "formik";
import registerSchema from "schemas/registerSchema";
import toastr from "toastr";
import Logo from "assets/images/brand/logo/immersed-spiral-logo.png";
import { Link } from "react-router-dom";
import { Col, Row, Card, Form, Image } from "react-bootstrap";
import ReactGA from "react-ga";
import GoogleAnalyticsPlugin from "components/googleAnalytics/GoogleAnalyticsPlugin";

const _logger = debug.extend("Register");

const Register = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    tenantId: "",
  });

  _logger(userData);
  _logger(setUserData);

  const onAccountClick = (values) => {
    GoogleAnalyticsPlugin(
      ReactGA.event({ category: "User", action: "Register", label: "Register" })
    );
    _logger("Register user");
    NavbarDefault.accountUser(values)
      .then(onRegisterSuccess)
      .catch(onRegisterError);
  };
  const onRegisterSuccess = (response) => {
    _logger("Account created", response);
    toastr.success("Account Created!", {
      autoClose: 2000,
    });
    NavbarDefault.getCurrentUser()
      .then(onGetAccountSuccess)
      .catch(onGetAccountError);
  };

  const onRegisterError = (err) => {
    _logger("Account error", err);
    toastr.error("Error, Please Try Again!", {
      autoClose: 2000,
    });
  };

  const onGetAccountSuccess = (response) => {
    _logger(response, "get current account");
    NavbarDefault.getCurrentUser()
      .then(onGetByIdSuccess)
      .catch(onGetAccountError);
  };

  const onGetByIdSuccess = (response) => {
    _logger("userId logged", response);
    toastr.success("userId logged Success");
  };

  const onGetAccountError = (err) => {
    _logger(err, "Invalid account");
    toastr.error("userId logged Error");
  };

  return (
    <Fragment>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={5} md={5} className="py-8 py-xl-0">
          <Card>
            <Card.Body className="p-6">
              <div className="mb-4">
                <Link to="/">
                  <Image src={Logo} className="mb-4" alt="" />
                </Link>
                <h1 className="mb-1 fw-bold">Sign up</h1>
                <span>
                  Already have an account?{" "}
                  <Link to="/authentication/sign-in" className="ms-1">
                    Sign in
                  </Link>
                </span>
              </div>
              <Formik
                enableReinitialize={true}
                initialValues={userData}
                onSubmit={onAccountClick}
                validationSchema={registerSchema}
              >
                <Form>
                  <div className="form-group">
                    <label htmlFor="email">First Name</label>
                    <Field
                      type="firstName"
                      name="firstName"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="has-error"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Last Name</label>
                    <Field
                      type="lastName"
                      name="lastName"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="has-error"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <Field type="email" name="email" className="form-control" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="has-error"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                      type="password"
                      name="password"
                      placeholder="**************"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="has-error"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Confirm Password</label>
                    <Field
                      type="password"
                      name="passwordConfirm"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="passwordConfirm"
                      component="div"
                      className="has-error"
                    />
                  </div>
                  <Form.Check type="checkbox" id="check-api-checkbox" />I agree
                  to the
                  <Link to="/pages/terms-and-conditions">
                    Terms of Service{" "}
                  </Link>{" "}
                  and{" "}
                  <Link to="/pages/terms-and-conditions">Privacy Policy.</Link>{" "}
                  <Link to="/" className="btn btn-primary mb-0 d-grid gap-2">
                    Done!
                  </Link>
                </Form>
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Register;

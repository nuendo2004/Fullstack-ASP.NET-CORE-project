import React, { useState, Fragment, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Col, Row, Card } from "react-bootstrap";
import { Formik, Field, ErrorMessage, Form } from "formik";
import Logo from "assets/images/brand/logo/immersed-spiral-logo.png";
import { userSigninSchema } from "schemas/userFormSchema";
import swal from "sweetalert2";
import toastr from "toastr";
import { Image } from "react-bootstrap";
import userService from "services/userService";
import logger from "sabio-debug";
import ReactGA from "react-ga";
import GoogleAnalyticsPlugin from "components/googleAnalytics/GoogleAnalyticsPlugin";

const _logger = logger.extend("SignUp");

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { state } = useLocation();

  const checkLocation = () => {
    if (state) {
      _logger("There was a state in location:", state.payload);
      setFormData(() => {
        return {
          email: state.payload,
          password: "",
        };
      });
    } else {
      _logger("No state in location");
    }
  };

  useEffect(() => {
    checkLocation();
  }, []);

  const onSignInClick = (value) => {
    GoogleAnalyticsPlugin(
      ReactGA.event({ category: "User", action: "Sign In", label: "Sign In" })
    );
    const payload = value;
    _logger("onSignIn clicked", payload);
    userService
      .loginUser(payload)
      .then(onSignInUserSuccess)
      .catch(onSignInUserFail);
  };

  const getCurrent = () => {
    userService
      .currentUser()
      .then(onCurrentUserSuccess)
      .catch(onCurrentUserFail);
  };

  const onCurrentUserSuccess = (response) => {
    _logger("currentUser success", response);
    let role = response.item.roles[0];
    _logger("role", role);
    if (role === "OrgAdmin" || role === "SysSupport") {
      navigate("/dashboard/", { state: { type: "LOGIN" } });
    } else if (role === "SysAdmin") {
      navigate("/dashboard/analytics/internal", { state: { type: "LOGIN" } });
    } else if (role === "Trainee") {
      navigate("/transit/", { state: { type: "LOGIN" } });
    } else navigate("/", { state: { type: "LOGIN" } });
  };

  const onCurrentUserFail = (error) => {
    toastr.error("Unable to find current user");
    _logger("currentUser fail", error);
  };

  const onSignInUserSuccess = (response) => {
    _logger("signInUser ok", response);
    getCurrent();
  };

  const onSignInUserFail = (error) => {
    _logger("signInUser error", error);
    swal.fire({
      title: "Invalid username or password",
      icon: "error",
      confirmButtonText: "Try again",
    });
  };
  return (
    <Fragment>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={4} md={4} className="py-8 py-xl-0">
          <Card>
            <Card.Body className="p-6">
              <div className="mb-4">
                <Link to="/">
                  <Image src={Logo} className="mb-4 w-15 h-15" alt="" />
                  <h3 className="d-inline pull-right">
                    <strong className="text-black">Immersed</strong>
                  </h3>
                </Link>
                <h1 className="mb-1 fw-bold">Sign in</h1>
                <span>
                  Don’t have an account?{" "}
                  <Link to="/signup" className="ms-1">
                    Sign up
                  </Link>
                </span>
              </div>

              <Formik
                enableReinitialize={true}
                initialValues={formData}
                onSubmit={onSignInClick}
                validationSchema={userSigninSchema}
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
                      component="p"
                      className="text-danger"
                    />
                    <Col lg={12} md={12} className="mb-3">
                      <label>Password </label>
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
                      className="text-danger"
                    />
                    <Col lg={12} md={12} className="mb-3">
                      <div className="d-md-flex justify-content-between align-items-center">
                        <div
                          className="form-check px-1"
                          type="checkbox"
                          id="check-api-checkbox"
                        >
                          <input type="checkbox" />
                          <label className="ps-2">Remember me</label>
                        </div>
                        <Link to="/authentication/forget-password">
                          Forgot your password?
                        </Link>
                      </div>
                    </Col>
                    <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                      <button className="btn btn-primary" type="submit">
                        Sign in
                      </button>
                    </Col>
                  </Row>
                </Form>
              </Formik>
              <hr className="my-4" />
              <div className="mt-4 text-center">
                {/* Facebook */}
                <Link
                  to="#"
                  className="btn-social btn-social-outline btn-facebook"
                >
                  <i className="fab fa-facebook"></i>
                </Link>{" "}
                {/* Twitter */}
                <Link
                  to="#"
                  className="btn-social btn-social-outline btn-twitter"
                >
                  <i className="fab fa-twitter"></i>
                </Link>{" "}
                {/* LinkedIn */}
                <Link
                  to="#"
                  className="btn-social btn-social-outline btn-linkedin"
                >
                  <i className="fab fa-linkedin"></i>
                </Link>{" "}
                {/* GitHub */}
                <Link
                  to="#"
                  className="btn-social btn-social-outline btn-github"
                >
                  <i className="fab fa-github"></i>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default SignIn;

import React, { useState, Fragment, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row, Card } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Logo from "assets/images/brand/logo/immersed-spiral-logo.png";
import swal from "sweetalert2";
import { userSignupSchema } from "schemas/userFormSchema";
import { Image } from "react-bootstrap";
import userService from "services/userService";
import SiteReferencesModal from "../sitereferences/SiteReferencesModal";
import logger from "sabio-debug";
const _logger = logger.extend("SignUp");

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    mi: "",
    avatarUrl: "",
    password: "",
    passwordconfirm: "",
    agreementCheckbox: "",
    referenceTypeId: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(!showModal);

  const navigate = useNavigate();
  const ref = useRef(null);

  function onSubmitClick(value) {
    handleShowModal();
    setFormData((prevState) => {
      const newObject = {
        ...prevState,
      };
      newObject.email = value.email;
      newObject.firstName = value.firstName;
      newObject.lastName = value.lastName;
      newObject.mi = value.mi;
      newObject.avatarUrl = value.avatarUrl;
      newObject.password = value.password;
      newObject.passwordconfirm = value.passwordconfirm;
      return newObject;
    });
  }

  const onModalSignUpClick = (typeIdPassedFromModal) => {
    const referenceTypeId = typeIdPassedFromModal;

    setFormData((prevState) => {
      const newObject = {
        ...prevState,
      };
      newObject.referenceTypeId = referenceTypeId;
      return newObject;
    });
  };

  useEffect(() => {
    if (formData.referenceTypeId) {
      _logger("userData Submit", formData);
      userService
        .registerNewUser(formData)
        .then(onSignUpUserSuccess)
        .catch(onSignUpUserFail);
    }
  }, [formData.referenceTypeId]);

  const onSignUpUserSuccess = (response) => {
    _logger("signupUser ok", response);
    swal
      .fire({
        icon: "success",
        title: "Almost done!",
        text: "A confirmation email was sent to the provided email, please go to that email and click on the link to complete sign up",
        confirmButtonText: "Ok",
      })
      .then((result) => {
        if (result.isConfirmed) {
          navigate("/signin");
        }
      });
  };

  const onSignUpUserFail = (error) => {
    _logger("signUpUser error", error);
    if (error.response.status === 400) {
      swal
        .fire({
          title: "That email exists. Click here to sign in.",
          icon: "warning",
          confirmButtonText: "Sign In",
        })
        .then(
          navigate("/signin", {
            state: { type: "USER_EMAIL", payload: ref.current.values.email },
          })
        );
    } else {
      swal.fire({
        title: "Sign Up Unsuccessful",
        icon: "error",
        confirmButtonText: "Try again",
      });
    }
  };

  return (
    <Fragment>
      <SiteReferencesModal
        isShowModalEnabled={showModal}
        onModalSignUpClick={onModalSignUpClick}
        handleCloseModal={handleShowModal}
      ></SiteReferencesModal>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={4} md={4} className="py-8 py-xl-0">
          <Card>
            <Card.Body className="p-6">
              <div className="mb-4">
                <Link to="/">
                  <Image src={Logo} className="w-15 h-15" alt="" />
                  <h3 className="d-inline pull-right">
                    <strong className="text-black">Immersed</strong>
                  </h3>
                </Link>
                <h1 className="mb-1 fw-bold">Sign up</h1>
                <span>
                  Already have an account?{" "}
                  <Link to="/signin" className="ms-1">
                    Sign in
                  </Link>
                </span>
              </div>
              <Formik
                innerRef={ref}
                enableReinitialize={true}
                initialValues={formData}
                onSubmit={onSubmitClick}
                validationSchema={userSignupSchema}
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
                      <label className="pb-2">First Name</label>
                      <Field
                        type="text"
                        className="form-control"
                        id="firstname"
                        name="firstName"
                        placeholder="First Name Here"
                      />
                    </Col>
                    <Col lg={12} md={12} className="mb-3">
                      <label className="pb-2">Middle Initial (MI)</label>
                      <Field
                        type="text"
                        className="form-control"
                        id="mi"
                        name="mi"
                        placeholder="Middle Initial Here"
                      />
                    </Col>
                    <Col lg={12} md={12} className="mb-3">
                      <label className="pb-2">Last Name</label>
                      <Field
                        type="text"
                        className="form-control"
                        id="lastname"
                        name="lastName"
                        placeholder="Last Name Here"
                      />
                    </Col>
                    <Col lg={12} md={12} className="mb-3">
                      <label className="pb-2">Avatar URL</label>
                      <Field
                        type="text"
                        className="form-control"
                        id="avatarUrl"
                        name="avatarUrl"
                        placeholder="Avatar URL Here"
                      />
                    </Col>
                    <Col lg={12} md={12} className="mb-3">
                      <label className="pb-2">Password</label>
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
                      <label className="pb-2">Confirm Password </label>
                      <Field
                        type="password"
                        className="form-control"
                        id="passwordconfirm"
                        name="passwordconfirm"
                        placeholder="Must match password"
                      />
                    </Col>
                    <ErrorMessage
                      name="passwordconfirm"
                      component="p"
                      className="text-danger"
                    />
                    <Col lg={12} md={12} className="mb-3">
                      <Field
                        className="px-1"
                        type="checkbox"
                        id="agreementCheckbox"
                        name="agreementCheckbox"
                      />
                      <label className="ps-2 pb-2">
                        I agree to the
                        <Link
                          to="/pages/terms-and-conditions"
                          target={"_blank"}
                        >
                          {" "}
                          Terms of Service{" "}
                        </Link>{" "}
                        and{" "}
                        <Link to="/privpolicy" target={"_blank"}>
                          Privacy Policy.
                        </Link>
                      </label>
                      <ErrorMessage
                        name="agreementCheckbox"
                        component="p"
                        className="text-danger"
                      />
                    </Col>
                    <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                      <button type="submit" className="btn btn-primary">
                        Submit
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

export default SignUp;

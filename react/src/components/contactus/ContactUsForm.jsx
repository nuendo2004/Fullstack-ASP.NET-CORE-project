import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../contact.css";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import contactSchema from "./contactSchema";
import debug from "sabio-debug";
import contactService from "services/contactUsService";
import toastr from "toastr";
import swal from "sweetalert2";
import Footer from "layouts/marketing/footers/Footer";
import svg from "assets/images/svg/3d-girl-seeting.svg";
const _logger = debug.extend("ContactUs");

function Contact() {
  const onClickSubmit = (values) => {
    contactService
      .contactUs(values)
      .then(onGetContactSuccess)
      .catch(onGetContactError);
  };
  const navigate = useNavigate();
  const onGetContactSuccess = () => {
    swal
      .fire({
        icon: "success",
        title: "Email Sent!",
        text: "A confirmation email was sent to the provided email",
        confirmButtonText: "Ok",
      })
      .then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
  };
  const onGetContactError = (error) => {
    _logger(error);
    toastr.error("Email not sent");
  };

  const [contactInfo] = useState({
    firstName: "",
    lastName: "",
    from: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });

  return (
    <React.Fragment>
      <nav className="navbar-transpaarent navbar navbar-expand-lg navbar-light bg-transparent">
        <div className="ms-17 container">
          <div className="d-flex align-items-center">
            <a className="navbar-brand" href="/">
              <img
                src="https://trello.com/1/cards/635b66c13abdf201c5280782/attachments/635b66c880edf60ee09bb93b/previews/635b66c980edf60ee09bb9c3/download/immersed-spiral-256-blue-transp.png"
                alt={"logo"}
              />
            </a>
            <div className="text-black-50 justify-content-broken d-flex">
              <div className="vr bg-dark bg-opacity-25"></div>
              <h3 className="ms-2 mb-0">Immersed</h3>
            </div>
          </div>
        </div>
      </nav>
      <div className="py-lg-15 py-10  mt-n12 bg-colors-gradient">
        <div className="container">
          <div className="align-items-center justify-content-center row">
            <div className="col-md-6 col-12">
              <h1 className="fw-bold mb-1 display-3">How can we help you?</h1>
              <h3 className="mb-5">Have questions? Send us a message below!</h3>
            </div>
            <div className="col-md-6 col-12">
              <div className="d-flex align-items-center justify-content-end">
                <img
                  src={svg}
                  alt={"Icon"}
                  className="text-center img-fluid"
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-n8">
        <div className="container">
          <div className="formcontainer">
            <div className="bg-white rounded-3 shadow-sm">
              <Formik
                enableReinitialize={true}
                initialValues={contactInfo}
                onSubmit={onClickSubmit}
                validationSchema={contactSchema}
              >
                <Form>
                  <div className="card">
                    <h5 className="card-title">Contact Us</h5>
                    <div className="card-body d-lg-flex align-items-center  position-fixed-lg bg-cover col-lg-12">
                      <div className="row">
                        <div className="col-md-6 col-sm-12">
                          <div className="mb-3 mt-3">
                            <label
                              className="form-label"
                              htmlFor="formFirstName"
                            >
                              First Name:
                            </label>
                            <span className="text-danger">*</span>
                            <Field
                              placeholder="First Name"
                              type="text"
                              id="formFirstName"
                              className="form-control"
                              name="firstName"
                            />
                            <ErrorMessage
                              name="firstName"
                              component="div"
                              className="contact-error"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <div className="mb-3 mt-3">
                            <label
                              className="form-label"
                              htmlFor="formLastName"
                            >
                              Last Name:
                            </label>
                            <span className="text-danger">*</span>
                            <Field
                              placeholder="Last Name"
                              type="text"
                              id="formLastName"
                              className="form-control"
                              name="lastName"
                            />
                            <ErrorMessage
                              name="lastName"
                              component="div"
                              className="contact-error"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="formEmail">
                              Email:
                            </label>
                            <span className="text-danger">*</span>
                            <Field
                              placeholder="Email"
                              type="email"
                              id="formEmail"
                              className="form-control"
                              name="from"
                            />
                            <ErrorMessage
                              name="from"
                              component="div"
                              className="contact-error"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="formFirstName"
                            >
                              Phone Number:
                            </label>
                            <span className="text-danger">*</span>
                            <Field
                              placeholder="Phone"
                              type="text"
                              id="formNumber"
                              className="form-control"
                              name="phoneNumber"
                            />
                            <ErrorMessage
                              name="phoneNumber"
                              component="div"
                              className="contact-error"
                            />
                          </div>
                        </div>
                        <div className="col-md-12 col-sm-12">
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="formContactReason"
                            >
                              Contact Reason:
                            </label>
                            <span className="text-danger">*</span>
                            <Field
                              as="select"
                              className="form-select"
                              id="formSubject"
                              name="subject"
                            >
                              <option value className="text-muted">
                                Select
                              </option>
                              <option value="Design" className="text-dark">
                                Design
                              </option>
                              <option value="Development" className="text-dark">
                                Development
                              </option>
                              <option value="Other" className="text-dark">
                                Other
                              </option>
                            </Field>
                            <ErrorMessage
                              name="subject"
                              component="div"
                              className="contact-error"
                            />
                          </div>
                        </div>
                        <div className="col-md-12 col-sm-12">
                          <div className="mb-3">
                            <label
                              htmlFor="formMessages"
                              className="form-label"
                            >
                              Message:
                            </label>
                            <span className="text-danger">*</span>
                            <Field
                              as="textarea"
                              placeholder="Messages"
                              rows="3"
                              id="formMessages"
                              className="form-control"
                              name="message"
                            />
                            <ErrorMessage
                              name="message"
                              component="div"
                              className="contact-error"
                            />
                          </div>
                        </div>
                        <div className="col-md-12 col-sm-12">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            name="submit"
                            onSubmit={onClickSubmit}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

Contact.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  from: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string,
  subject: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default Contact;

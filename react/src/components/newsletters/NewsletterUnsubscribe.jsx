import React, { useState } from "react";
import { Col, Row, Card, Image } from "react-bootstrap";
import { Formik, Field, ErrorMessage, Form } from "formik";
import Logo from "assets/images/brand/logo/immersed-spiral-logo.png";
import newsletterUnsubscribeSchema from "schemas/newsletterUnsubscribeSchema";
import newsletterSubscriptionService from "services/newsletterSubscriptionService";
import logger from "sabio-debug";
import toastr from "toastr";
import { Link } from "react-router-dom";

const _logger = logger.extend("NewsLetter");

function NewsletterUnsubscribe() {
  _logger("hello");

  const [formData] = useState({ email: "" });

  const onUnsubscribeClick = (values) => {
    const payload = { email: values.email, isSubscribed: false };
    newsletterSubscriptionService
      .updateSubscription(payload)
      .then(onUnsubscribeSuccess)
      .catch(onUnsubscribeError);
  };

  const onUnsubscribeSuccess = () => {
    toastr["success"]("You have Successfully Unsubscribed");
  };
  const onUnsubscribeError = () => {
    toastr.error("There has been an error");
  };

  return (
    <React.Fragment>
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
              </div>

              <Formik
                enableReinitialize={true}
                initialValues={formData}
                onSubmit={onUnsubscribeClick}
                validationSchema={newsletterUnsubscribeSchema}
              >
                <Form>
                  <Row>
                    <Col lg={12} md={12} className="mb-3">
                      <label className="pb-2">We are sorry to see you go</label>
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
                    <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                      <button className="btn btn-primary" type="submit">
                        Unsubscribe
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
    </React.Fragment>
  );
}

export default NewsletterUnsubscribe;

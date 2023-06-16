import React, { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { Button, Row, Col } from "react-bootstrap";
import newsletterSubscriptionService from "services/newsletterSubscriptionService";
import newsletterSubscriptionSchema from "schemas/newsletterSubscriptionSchema";
import swal from "sweetalert2";
import debug from "sabio-debug";

const _logger = debug.extend("NewsletterSubscriptionForm");

function NewsletterSubscriptionForm() {
  const [formData] = useState({
    email: "",
  });
  const onSubmit = (values) => {
    _logger("formdata", values);
    const payload = { ...values };
    newsletterSubscriptionService
      .addSubscription(payload)
      .then(onNewsletterSubSuccess)
      .catch(onNewsletterSubError);
  };
  const onNewsletterSubSuccess = (response) => {
    _logger("onNewsletterSubSuccess", response);
    swal.fire({
      icon: "success",
      title: "You are Subscribed",
      confirmButtonText: "Close",
      timer: 2000,
    });
  };
  const onNewsletterSubError = (err) => {
    _logger("onNewsletterSubError", err);
    swal.fire({
      icon: "warning",
      title: "Unable to subscribe, Please try again.",
      confirmButtonText: "Close",
      timer: 2000,
    });
  };
  return (
    <>
      <Row className="align-items-center justify-content-center text-center g-0 my-6">
        <Col lg={6} md={6}>
          <div>
            <h2 className="mb-4">Newsletter Subscription</h2>
            <div className="container">
              <Formik
                enableReinitialize={true}
                initialValues={formData}
                validationSchema={newsletterSubscriptionSchema}
                onSubmit={onSubmit}
              >
                <Form className="row">
                  <div className="form-group col-10">
                    <div className="form-group">
                      <Field
                        name="email"
                        type="text"
                        className="text-dark form-control"
                        placeholder="Enter Email"
                      ></Field>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="form-group col">
                    <Button type="submit" className="me-1 ">
                      Subscribe!
                    </Button>
                  </div>
                </Form>
              </Formik>
              <p className="lead my-4">
                {"Want the latest news? Get it in your inbox"}
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
export default NewsletterSubscriptionForm;

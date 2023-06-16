import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { modalSelectionSchema } from "../../schemas/siteReferenceSchema";

function SiteReferenceModal(props) {
  const [optionData] = useState({ ReferenceTypeId: "" });

  const onModalSubmitClick = (values) => {
    props.onModalSignUpClick(Number(values.ReferenceTypeId));
  };

  return (
    <React.Fragment>
      <Modal show={props.isShowModalEnabled} onHide={props.handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>How did you discover us?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please select an option below:
          <Formik
            enableReinitialize={true}
            initialValues={optionData}
            onSubmit={onModalSubmitClick}
            validationSchema={modalSelectionSchema}
          >
            {() => (
              <Form>
                <div>
                  <ul className="list-unstyled">
                    <div className="form-check">
                      <Field
                        type="radio"
                        className="form-check-input"
                        value="1"
                        name="ReferenceTypeId"
                      />
                      Search Engine
                    </div>
                    <div className="form-check">
                      <Field
                        type="radio"
                        className="form-check-input"
                        value="2"
                        name="ReferenceTypeId"
                      />
                      Social Media
                    </div>
                    <div className="form-check">
                      <Field
                        type="radio"
                        className="form-check-input"
                        value="3"
                        name="ReferenceTypeId"
                      />
                      Friend or Colleague
                    </div>
                    <div className="form-check">
                      <Field
                        type="radio"
                        className="form-check-input"
                        value="4"
                        name="ReferenceTypeId"
                      />
                      Other
                    </div>
                  </ul>
                  <ErrorMessage
                    name="ReferenceTypeId"
                    component="p"
                    className="text-danger"
                  />
                </div>
                <Modal.Footer>
                  <Button variant="secondary" onClick={props.handleCloseModal}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

SiteReferenceModal.propTypes = {
  isShowModalEnabled: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  onModalSignUpClick: PropTypes.func.isRequired,
};

export default SiteReferenceModal;

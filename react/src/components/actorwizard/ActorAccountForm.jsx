import React, { useEffect, Fragment, useState } from "react";
import { Col, Row, Card } from "react-bootstrap";
import { withFormik, Form, Field, FieldArray, ErrorMessage } from "formik";
import lookUpService from "services/lookUpService";
// import actorAccountSchema from "schemas/actorAccountSchema";
import PropTypes from "prop-types";

import debug from "sabio-debug";
const _logger = debug.extend("ActorAccount");

let tableName = ["accountStatus"];

function ActorAccountsForm(props) {
  _logger(props);
  const [accountStatus, setAccountStatus] = useState({
    actStatus: [],
  });

  const { values, isSubmitting, onNext, onBack, backLabel, nextLabel } = props;

  const handleSubmit = () => {
    onNext(values);
  };

  const handleBack = () => {
    onBack(values);
  };

  useEffect(() => {
    lookUpService.LookUp(tableName).then(onLookUpSuccess).catch();
  }, []);

  const onLookUpSuccess = (res) => {
    const lookUp = res.item.accountStatus;
    setAccountStatus((prevState) => {
      let status = { ...prevState };
      status.actStatus = lookUp.map(mapTypes);
      return status;
    });
  };

  const mapTypes = (type) => {
    return (
      <option key={type.id} value={type.id}>
        {type.name}
      </option>
    );
  };

  return (
    <Fragment>
      <Row className="my-6">
        <Col lg={12} md={12} className="d-flex justify-content-center">
          <Card className="actor-account-card d-flex flex-direction-row">
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit}>
                <FieldArray
                  name="actorAccount"
                  render={({ push, remove }) => (
                    <div>
                      <h1 className="d-flex pb-3">Actor Accounts</h1>
                      {values.actorAccount.length > 0 &&
                        values.actorAccount.map((actorAccount, index) => (
                          <div className="my-4" key={index}>
                            <div className="form-group mb-2">
                              <label
                                htmlFor={`actorAccount.${index}.userName`}
                                className="col-md-4"
                              >
                                Name
                              </label>
                              <Field
                                className="form-control"
                                name={`actorAccount.${index}.userName`}
                                placeholder="Jane Doe"
                                type="input"
                              />
                              <ErrorMessage
                                name="userName"
                                component="div"
                                className="has-error"
                              />
                            </div>                           
                            <div className="form-group mb-2">
                              <label
                                htmlFor={`actorAccount.${index}.avatarUrl`}
                                className="col-4"
                              >
                                Avatar
                              </label>
                              <Field
                                className="col-8 form-control"
                                name={`actorAccount.${index}.avatarUrl`}
                                placeholder="https://imgUrl"
                                type="input"
                              />
                              <ErrorMessage
                                name="avatarUrl"
                                component="div"
                                className="has-error"
                              />
                            </div>
                            <div className="form-group mb-2">
                              <label
                                htmlFor={`actorAccount.${index}.accountStatusId`}
                                className="col-4"
                              >
                                Status
                              </label>
                              <Field
                                className="col-8 form-control"
                                name={`actorAccount.${index}.accountStatusId`}
                                placeholder="Account Status"
                                as="select"
                              >
                                <option
                                  value="0"
                                  label="Account Status"
                                  className="text-muted"
                                ></option>
                                {accountStatus.actStatus}
                              </Field>
                              <ErrorMessage
                                name="accountStatusId"
                                component="div"
                                className="has-error"
                              />
                            </div>
                            {values.actorAccount.length < 0 ? (
                              ""
                            ) : (
                              <div className="row">
                                <div className="col-6">
                                  <button
                                    className="btn btn-xs btn-danger my-1"
                                    type="button"
                                    onClick={() => remove(index)}
                                  >
                                    X
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      <div className="row actor-account-submit">
                        <div className="col-4 d-flex">
                          <button
                            type="button"
                            disabled={isSubmitting}
                            onClick={() =>
                              push({
                                userName: "",                                
                                avatarUrl: "",
                                accountStatusId: "",
                              })
                            }
                            className="btn btn-xs btn-primary my-1"
                          >
                            +
                          </button>
                        </div>
                        <div className="col-4 d-flex justify-content-end m-0 p-0">
                          <button
                            type="submit"
                            onClick={handleBack}
                            disabled={isSubmitting}
                            className="btn btn-xs btn-primary my-1"
                          >
                            {backLabel}
                          </button>
                        </div>
                        <div className="col-4 d-flex justify-content-end m-0 p-0">
                          <button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="btn btn-xs btn-success my-1"
                          >
                            {nextLabel}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                />
              </Form>
              <br />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
}

export default withFormik({
  enableReinitialize: true,

  mapPropsToValues: (props) => ({
    actorAccount: props.formData.actorAccount,
  }),
  // validationSchema: actorAccountSchema,
  handleSubmit: function (values, { props }) {
    props.onNext(values);
  },
})(ActorAccountsForm);

ActorAccountsForm.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    actorAccount: PropTypes.arrayOf(
      PropTypes.shape({
        userName: PropTypes.string.isRequired,        
        avatarUrl: PropTypes.string.isRequired,
        accountStatusId: PropTypes.number.isRequired,
      })
    ),
  }),
  formData: PropTypes.arrayOf(
    PropTypes.shape({
      userName: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
      accountStatusId: PropTypes.number.isRequired,
    })
  ),
  handleSubmit: PropTypes.func,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  onFinish: PropTypes.func,
  handleChange: PropTypes.func,
  isSubmitting: PropTypes.bool,
  backLabel: PropTypes.string,
  nextLabel: PropTypes.string,
  onHomeClicked: PropTypes.func,
  mergeValues: PropTypes.func,
};

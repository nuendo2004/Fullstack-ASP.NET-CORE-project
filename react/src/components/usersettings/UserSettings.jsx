import React, { useState, useEffect } from "react";
import "./update.css";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import updateUserSchema from "../../schemas/updateUserSchema";
import userService from "../../services/userService";
import toastr from "toastr";
import debug from "sabio-debug";
import UserLayout from "./UserLayout";
const _logger = debug.extend("UserSettings");

function UserSettings(props) {

  _logger(props,"props---->")

  const [userProfile] = useState({
    firstName: props.currentUser.firstName,
    middleInitial: '',
    lastName: props.currentUser.lastName,
    phone: '',
    tenantId: "U03JD75TBKN",
  });

  useEffect(() => {
    _logger('useEffect firing');
    
  }, [props])

  const onClickUpdate = (values) => {
    _logger(values, 'Updater input');

    userService.currentUser(userProfile).then(onGetSuccess).catch(onGetError);
  };

  const onGetSuccess = (response) => {
    toastr.success("You have successfully updated", "Update Success");
    _logger('Service call', { success: response });
  };

  const onGetError = (error) => {
    toastr.error("Your attempt was unsuccessful", "Updating failed");
    _logger({ error: error.response.data });
  }; 

  return (
    <React.Fragment>
          <UserLayout>
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="border-0 card">
                <div className="card-header">
                  <div className="mb-3 mb-lg-0">
                    <h3 className="mb-0">Profile Details</h3>
                    <p className="mb-0">
                      You have full control to manage your own account setting.
                    </p>
                  </div>
                </div>
                <div className="card-body">
                  <div className="d-lg-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center mb-4 mb-lg-0">
                      <img
                        src={props.currentUser.avatarUrl}
                        id="img-uploaded"
                        alt=""
                        className="avatar-xl rounded-circle"
                      />
                      <div className="ms-3">
                        <h4 className="mb-0">Your avatar</h4>
                        <p className="mb-0">
                          PNG or JPG no bigger than 800px wide and tall.
                        </p>
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn btn-outline-white btn-sm"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <hr className="my-5" />
                  <div>
                    <h4 className="mb-0">Personal Details</h4>
                    <p className="mb-4">
                      Edit your personal information and address.
                    </p>
                    <Formik
                      enableReinitialize={true}
                      initialValues={userProfile}
                      onSubmit={onClickUpdate}
                      validationSchema={updateUserSchema}
                    >
                      <Form className="">
                        <div className="row">
                          <div className="mb-3 col-md-6 col-sm-12">
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="formFirstName"
                              >
                                First Name
                              </label>
                              <Field
                                name="firstName"
                                placeholder='First Name'
                                required=""
                                type="text"
                                id="formFirstName"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="firstName"
                                component="div"
                                className="user-update-error"
                              />
                            </div>
                          </div>
                          <div className="mb-3 col-md-6 col-sm-12">
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="formMiddleInitial"
                              >
                                Middle Initial
                              </label>
                              <Field
                                name="middleInitial"
                                placeholder='M.I.'
                                required=""
                                type="text"
                                id="formMiddleInitial"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="middleInitial"
                                component="div"
                                className="user-update-error"
                              />
                            </div>
                          </div>
                          <div className="mb-3 col-md-6 col-sm-12">
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="formLastName"
                              >
                                Last Name
                              </label>
                              <Field
                                name="lastName"
                                placeholder='Last Name'
                                required=""
                                type="text"
                                id="formLastName"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="lastName"
                                component="div"
                                className="user-update-error"
                              />
                            </div>
                          </div>
                          <div className="mb-3 col-md-6 col-sm-12">
                            <div className="mb-3">
                              <label className="form-label" htmlFor="formPhone">
                                Phone
                              </label>
                              <Field
                                name="phone"
                                placeholder='Phone number'
                                required=""
                                type="text"
                                id="formPhone"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="phone"
                                component="div"
                                className="user-update-error"
                              />
                            </div>
                          </div>
                          <div className="col-md-12 col-sm-12">
                            <button type="submit" className="btn btn-primary">
                              Update Profile
                            </button>
                          </div>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </UserLayout>        
    </React.Fragment>
  );
}

UserSettings.propTypes = {
  currentUser: PropTypes.shape({
    avatarUrl: PropTypes.string,
    firstName: PropTypes.string.isRequired,
    middleInitial: PropTypes.string,
    lastName: PropTypes.string.isRequired,
    phone: PropTypes.number,
  })
};

export default UserSettings;



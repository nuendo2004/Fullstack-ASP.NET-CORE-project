import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Col, Row, TabContainer, Breadcrumb } from "react-bootstrap";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import debug from "sabio-debug";
import { ErrorMessage, Field, Formik } from "formik";
import * as traineeAccountService from "../../services/traineeAccountsService";
import fileService from "../../services/fileService";
import "../avataraws/avatarslider.css";
import "./traineeaccountform.css";
import traineeAccountAddSchema from "schemas/traineeAccountAddSchema";
import PropTypes from "prop-types";
import traineesService from "services/traineesService";
import addEditService from "services/trainingUnitService";
import zonesService from "services/zonesServices";

const _logger = debug.extend("TraineeAccountsForm");

function TraineeAccountsForm(props) {
  const currentUser = props.currentUser;
  _logger("currentUser>>", currentUser);
  const [pageData, setPageData] = useState({
    userName: "",
    password: "",
    avatarUrl: "",
    traineeId: "",
    trainingUnitId: "",
    zoneId: "",
  });
  const navigate = useNavigate();
  const onDashClicked = () => {
    navigate(`/dashboard/analytics`);
  };
  const onAccountsClicked = () => {
    navigate(`/trainee/accounts`);
  };
  const location = useLocation();
  const zoneData = location.state;
  _logger("ZONEDATA", zoneData);
  const [arrayOfFiles, setArrayOfFiles] = useState([]);
  const [currentUrl, setCurrentUrl] = useState();
  const [arrayOfTrainee, setArrayOfTrainee] = useState([]);
  const [arrayOfZones, setArrayOfZones] = useState([]);
  const [arrayOfTrainingUnit, setArrayofTrainingUnit] = useState([]);

  useEffect(() => {
    if (currentUser.roles.includes("Trainee")) {
      loadDropTraineeAcc();
    } else {
      getAllDropDownList();
    }
    fileService.getAllFiles(1, 250).then(onGetFileSuccess).catch(onGetFileErr);
  }, []);

  const loadDropTraineeAcc = () => {
    traineesService
      .getTraineesByUserId(currentUser.id)
      .then(onGetCurrentTraineeSuc)
      .catch((err) => {
        _logger(err);
      });
  };

  const onGetCurrentTraineeSuc = (response) => {
    const pd = response.item;
    _logger("currentUserTrainee", response.item);
    setPageData((prevState) => {
      let newState = { ...prevState };
      newState.traineeId = pd.id;
      newState.trainingUnitId = pd.trainingUnits;
      return newState;
    });
  };
  const handleSubmit = (values) => {
    values.accountStatusId = 1;
    traineeAccountService
      .addTraineeAccount(values)
      .then(onTraineeAccAddSuc)
      .catch(onTraineeAccAddErr);
  };
  const getAllDropDownList = () => {
    addEditService
      .getAllTrainingUnit()
      .then(onGetAllTrainingUnitSuc)
      .catch((err) => {
        _logger(err);
      });
    zonesService
      .getAll()
      .then(onZoneGetAllSuccess)
      .catch((err) => {
        _logger(err);
      });
  };
  const populateTrainee = (data) => {
    _logger("getTraineesByTrainingUnitId", data);
    const trainingUnitId = data.target.value;
    traineesService
      .getTraineesByTrainingUnitId(trainingUnitId)
      .then(getTraineeByTrainingUnitId)
      .catch((err) => {
        _logger(err);
      });
  };
  const getTraineeByTrainingUnitId = (response) => {
    let arrayOfTrainee = response.items;
    setArrayOfTrainee(arrayOfTrainee);
  };
  const onZoneGetAllSuccess = (response) => {
    let arrayOfZones = response.items;
    setArrayOfZones(arrayOfZones);
  };
  const onGetAllTrainingUnitSuc = (response) => {
    let arrayOfTrainingUnit = response.items;
    setArrayofTrainingUnit(arrayOfTrainingUnit);
  };
  const onTraineeAccAddSuc = (response) => {
    _logger("SuccessfullyADDED", response);
    toastr.success("Trainee account Added successfully.");
    navigate("/");
  };
  const onTraineeAccAddErr = (err) => {
    toastr.error("Unable To add, please try again", err);
  };
  const onGetFileSuccess = (response) => {
    let arrayOfFiles = response.item.pagedItems;
    setArrayOfFiles(arrayOfFiles);
  };
  const onGetFileErr = (err) => {
    toastr.error("No AvatarUrl Available At the moment", err);
  };

  const mapFiles = (item) => {
    if (item !== null) {
      return (
        <option key={item.id} value={item.url}>
          {item.name}
        </option>
      );
    }
  };
  const previewUrl = (data) => {
    setCurrentUrl(data.target.value);
  };
  const previewAvatar = () => {
    if (currentUrl !== "") {
      return (
        <div className="trainee_account_preview_container">
          <img className="avatar_slide" src={currentUrl} alt="" />
        </div>
      );
    }
  };
  const mapAll = (item) => {
    if (item !== null) {
      return (
        <option key={item.id} value={item.id}>
          {item.name},{item.description}
        </option>
      );
    }
  };
  const mapTrainee = (item) => {
    if (item !== null) {
      return (
        <option value={item.id} key={item.id}>
          {item.user.firstName} {item.user.mi} {item.user.lastName}
        </option>
      );
    }
  };
  return (
    <React.Fragment>
      <TabContainer defaultActiveKey="grid">
        <Row>
          <Col className="col-12">
            <div className="border-bottom pb-4 mb-4 d-flex align-items-center justify-content-between">
              <div className="mb-3 mb-md-0">
                <h1 className="mb-1 h2 fw-bold">Add Trainee Accounts</h1>
                <Breadcrumb>
                  <Breadcrumb.Item onClick={onDashClicked}>
                    Dashboard
                  </Breadcrumb.Item>
                  <Breadcrumb.Item onClick={onAccountsClicked}>
                    Trainee Accounts
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
          </Col>
        </Row>
      </TabContainer>

      <Row>
        <Formik
          initialValues={pageData}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          validationSchema={traineeAccountAddSchema}
        >
          {({ handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <div>
                    <Row className="mb-3">
                      <Form.Group as={Col}>
                        <label>Trainee Id:</label>
                        <Form.Select
                          name="traineeId"
                          onChange={(input) => {
                            handleChange(input);
                          }}
                        >
                          <option
                            value=""
                            label="Must Select Training Unit First"
                            className="text-muted"
                          />
                          {currentUser.roles.includes("Trainee") ? (
                            <option
                              key={pageData.traineeId}
                              value={pageData.traineeId}
                            >
                              {pageData.traineeId}
                            </option>
                          ) : (
                            arrayOfTrainee.map(mapTrainee)
                          )}
                        </Form.Select>
                        <ErrorMessage
                          name="traineeId"
                          component="p"
                          className=".has-error"
                        />
                      </Form.Group>

                      <Form.Group as={Col}>
                        <label>Training Unit Id:</label>
                        <Form.Select
                          name="trainingUnitId"
                          onChange={(input) => {
                            handleChange(input);
                            populateTrainee(input);
                          }}
                        >
                          <option 
                            value=""
                            label="Choose..."
                            className="text-muted"
                          />
                          {currentUser.roles.includes("Trainee") ? (
                            <option
                              key={pageData.trainingUnitId.id}
                              value={pageData.trainingUnitId.id}
                            >
                              {pageData.trainingUnitId.name}
                            </option>
                          ) : (
                            arrayOfTrainingUnit.map(mapAll)
                          )}
                        </Form.Select>
                        <ErrorMessage
                          name="trainingUnitId"
                          component="p"
                          className=".has-error"
                        />
                      </Form.Group>

                      <Form.Group as={Col}>
                        <label>Zone Id:</label>
                        <Form.Select
                          name="zoneId"
                          defaultValue="Choose..."
                          onChange={(input) => {
                            handleChange(input);
                          }}
                        >
                          <option
                            value=""
                            label="Choose..."
                            className="text-muted"
                          />
                          {currentUser.roles.includes("Trainee") ? (
                            <option key={zoneData.id} value={zoneData.id}>
                              {zoneData.id}. {zoneData.name}
                            </option>
                          ) : (
                            arrayOfZones.map(mapAll)
                          )}
                        </Form.Select>
                        <ErrorMessage
                          name="zoneId"
                          component="p"
                          className=".has-error"
                        />
                      </Form.Group>
                    </Row>
                  </div>
                </div>
              </div>

              <div className="col-md-12 col-sm-12">
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="userName">
                    Username:
                  </label>
                  <span className="text-danger">*</span>
                  <Field
                    type="text"
                    name="userName"
                    className="form-control"
                    aria-describedby="traineeAccountUsername"
                    required
                  />
                  <ErrorMessage
                    name="userName"
                    component="p"
                    className="has-error"
                  />
                </div>
              </div>

              <div className="col-md-12 col-sm-12">
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="password">
                    Password:
                  </label>
                  <span className="text-danger">*</span>
                  <Field
                    type="password"
                    className="form-control"
                    name="password"
                    aria-describedby="traineeAccountPassword"
                    required
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="has-error"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="avatarUrl">Select Avatar Image</label>
                <Field
                  as="select"
                  name="avatarUrl"
                  className="form-group form-select text-dark"
                  onChange={(input) => {
                    handleChange(input);
                    previewUrl(input);
                  }}
                >
                  <option value="" label="Choose..." className="text-muted" />
                  {arrayOfFiles.map(mapFiles)}
                </Field>
                <ErrorMessage
                  name="avatarUrl"
                  component="p"
                  className="has-error"
                />
                {currentUrl ? previewAvatar() : null}
              </div>

              <button className="avatar_button_submit" type="submit">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </Row>
    </React.Fragment>
  );
}

TraineeAccountsForm.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default TraineeAccountsForm;

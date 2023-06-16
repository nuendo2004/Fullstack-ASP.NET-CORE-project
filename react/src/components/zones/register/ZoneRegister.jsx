import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Col, Row, TabContainer } from "react-bootstrap";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import * as traineeAccountService from "../../../services/traineeAccountsService";
import fileService from "../../../services/fileService";
import "../../avataraws/avatarslider.css";
import "../../traineeaccounts/traineeaccountform.css";
import traineeAccountAddSchema from "schemas/traineeAccountAddSchema";
import PropTypes from "prop-types";
import logger from "sabio-debug";

const _logger = logger.extend("ZoneRegister");

function ZoneRegister(props) {
  const currentUser = props.currentUser;
  const navigate = useNavigate();
  const location = useLocation();
  const [arrayOfFiles, setArrayOfFiles] = useState([]);
  const [currentUrl, setCurrentUrl] = useState();
  const [paginationData] = useState({ pageIndex: 1, pageSize: 250 });

  const [pageData, setPageData] = useState({
    username: "",
    password: "",
    avatarUrl: "",
    traineeId: currentUser.currentTraineeId,
    zoneId: location.state.payload.zoneId,
    DeviceTypeId: 2,
  });

  const [device] = useState({
    platform: window?.navigator?.userAgentData?.platform,
  });
  _logger(device.navigator?.userAgentData?.platform);

  useEffect(() => {
    if (location.state?.type === "ZONE_PARAMS" && location.state.payload) {
      setPageData((prevState) => {
        return { ...prevState, ...location.state.payload };
      });
    }

    fileService
      .getAllPaginated(paginationData.pageIndex, paginationData.pageSize)
      .then(onGetFileSuccess)
      .catch(onGetFileErr);
  }, []);

  const handleSubmit = async (values) => {
    _logger("submit", values);
    let res;
    try {
      res = await traineeAccountService.addTraineeAccount(values);
      if (!res) {
        onTraineeAccAddErr();
        return;
      } else {
        onTraineeAccAddSuc();
      }
    } catch {
      onTraineeAccAddErr();
    }
    if (res) {
      const payload = { ...values };
      traineeAccountService
        .loginTraineeAccount(payload)
        .then(onLoginSuccess)
        .catch(onLoginErr);
    }
  };

  const onTraineeAccAddSuc = () => {
    toastr.success("Trainee account Added successfully.");
  };

  const onLoginSuccess = () => {
    toastr.success("Trainee information has been successfully verified");
    const zoneId = pageData.zoneId;
    const navigateToZoneMenu = (payload) => {
      const stateForTransport = { type: "ZONE_PARAMS", payload };
      navigate(`/zones/${zoneId}/menu`, {
        state: stateForTransport,
      });
    };
    navigateToZoneMenu(pageData);
  };

  const onLoginErr = (err) => {
    toastr.error("Please check for correct credentials", err);
  };

  const onTraineeAccAddErr = (err) => {
    toastr.error("Account with that username already exists.", err);
  };

  const onGetFileSuccess = (response) => {
    let arrayOfFiles = response.item.pagedItems;
    setArrayOfFiles((prevState) => {
      let newArr = [...prevState];
      newArr = arrayOfFiles;
      return newArr;
    });
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

  return (
    <React.Fragment>
      <TabContainer defaultActiveKey="grid">
        <Row>
          <Col className="col-12">
            <div className="border-bottom pb-4 mb-4 d-flex align-items-center justify-content-between">
              <div className="mb-3 mb-md-0">
                <h1 className="mb-1 h2 fw-bold">Create A Trainee Account</h1>
              </div>
            </div>
          </Col>
        </Row>
      </TabContainer>

      <Row>
        <Formik
          enableReinitialize={true}
          initialValues={pageData}
          validationSchema={traineeAccountAddSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange }) => (
            <FormikForm>
              <div className="container-fluid p-0">
                <div className="row">
                  <div className="mb-2 col-xl-6 col-lg-12 col-md-12">
                    <div className="card">
                      <div className="form-group">
                        <div className="p-5 fw-bold">
                          <label
                            className="form-label"
                            htmlFor="exampleForm.ControlInput1"
                          >
                            Username
                          </label>
                          <Field
                            type="text"
                            name="username"
                            className="form-control "
                          />
                          <ErrorMessage
                            name="username"
                            component="div"
                            className="has-error text-danger"
                          />
                        </div>
                      </div>
                      <div className="form-group p-5 fw-bold">
                        <label htmlFor="subject">Password</label>
                        <Field
                          type="password"
                          name="password"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="has-error text-danger"
                        />
                      </div>

                      <div className="form-group p-5 fw-bold">
                        <div>
                          <label htmlFor="AvatarUrl">
                            Select Avatar Image{" "}
                            <span className="text-danger">*</span>
                          </label>
                        </div>
                        <Field
                          as="select"
                          name="avatarUrl"
                          aria-describedby="enterModel"
                          className="form-group form-select text-dark"
                          onChange={(input) => {
                            handleChange(input);
                            previewUrl(input);
                          }}
                        >
                          <option
                            value=""
                            label="Choose.."
                            className="text-muted"
                          >
                            Please select an Avatar Image
                          </option>
                          {arrayOfFiles.map(mapFiles)}
                        </Field>
                        {currentUrl ? previewAvatar() : null}
                        <ErrorMessage
                          name="avatarUrl"
                          component="div"
                          className="has-error text-danger"
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary mb-3 mt-5"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </FormikForm>
          )}
        </Formik>
      </Row>
    </React.Fragment>
  );
}

export default ZoneRegister;
ZoneRegister.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
    currentTraineeId: PropTypes.number.isRequired,
  }).isRequired,
};

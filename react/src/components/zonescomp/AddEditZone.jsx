import React, { useState, useEffect } from "react";
import debug from "sabio-debug";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { Card, Row, Col, Image } from "react-bootstrap";
import AddEditZoneSchema from "./AddEditZoneSchema";
import zoneServices from "../../services/zonesServices";
import Logo from "../../assets/images/brand/logo/immersed-spiral-logo.png";
import toastr from "toastr";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import lookUpService from "services/lookUpService";

const _logger = debug.extend("ZonesMapperV2");

function AddEditZone() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    zoneTypeId: "",
    zoneStatusId: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  const [idZone, setIdZone] = useState(0);

  const [idZoneStatus, setIdZoneStatus] = useState(0);

  const [selectOptionData, setSelectOptionData] = useState({
    zoneStatusData: [],
    zoneStatusOptions: [],
    zoneTypesData: [],
    zoneTypesOptions: [],
  });

  useEffect(() => {
    lookUpService
      .LookUp(["ZoneStatus", "zoneTypes"])
      .then(lookUpSuccess)
      .catch(lookUpError);
  }, []);

  const lookUpSuccess = (response) => {
    const zoneStatus = response.item.zoneStatus;
    const zoneTypes = response.item.zoneTypes;

    setSelectOptionData((prevState) => {
      const newState = { ...prevState };
      newState.zoneStatusData = zoneStatus;
      newState.zoneStatusOptions = zoneStatus.map(mapSelectOption);
      newState.zoneTypesData = zoneTypes;
      newState.zoneTypesOptions = zoneTypes.map(mapSelectOption);
      return newState;
    });
  };
  const lookUpError = (response) => {
    _logger("lookup", response);
    toastr.error("There was an error fetching data");
  };

  const mapSelectOption = (item) => {
    return (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    );
  };

  useEffect(() => {
    if (
      location &&
      location.state &&
      location.state.payload &&
      location.state.type === "PRODUCT_VIEW"
    ) {
      const locPay = location?.state?.payload;
      _logger(location);
      setFormData(() => {
        _logger("updater onChange");
        const newUserObject = {
          name: locPay.name,
          description: locPay.description,
          zoneTypeId: locPay.zoneType.id,
          zoneStatusId: locPay.zoneStatus.id,
        };
        _logger(idZone);
        return newUserObject;
      });

      setIdZone(locPay?.id);
    } else if (
      location &&
      location.state &&
      location.state.payload &&
      location.state.type === "PRODUCT_VIEW_STATUS"
    ) {
      const locPay = location?.state?.payload;
      _logger(location);
      setFormData(() => {
        _logger("updater onChange");
        const newUserObject = {
          name: locPay.name,
          description: locPay.description,
          zoneTypeId: locPay.zoneType.id,
          zoneStatusId: locPay.zoneStatus.id,
        };
        _logger(idZoneStatus);
        return newUserObject;
      });

      setIdZoneStatus(locPay?.id);
    }
  }, []);

  const onHandle = (values) => {
    _logger("From Formik", values);
    _logger("From Initial State", formData);

    if (idZone !== 0) {
      zoneServices
        .updateZone(values, idZone)
        .then(onUpdateSuccess)
        .catch(onUpdateError);
    } else if (idZoneStatus !== 0) {
      zoneServices
        .updateZoneStatus(idZoneStatus, values.zoneStatusId)
        .then(updateZoneStatusSuccess)
        .catch(updateZoneStatusError);
    } else {
      zoneServices.addZone(values).then(onAddSuccess).catch(onAddError);
    }
  };

  const updateZoneStatusSuccess = (response) => {
    _logger("success", response);
    toastr.success("You Updated a Zone Status");
    navigate(`/zones`);
  };

  const updateZoneStatusError = (response) => {
    _logger("error", response);
    toastr.error("Error updating a Zone Status");
  };

  const onAddError = (response) => {
    _logger("error", response);
    toastr.error("Adding Failed");
  };

  const onAddSuccess = (response) => {
    _logger("success", response);
    toastr.success("You Created a Zone");
    navigate(`/zones`);
  };

  const onUpdateSuccess = (response) => {
    _logger("success", response);
    toastr.success("You Updated a Zone");
    navigate(`/zones`);
  };

  const onUpdateError = (response) => {
    _logger("error", response);
    toastr.error("Error updating a Zone");
  };

  const onGoBack = (e) => {
    e.preventDefault();
    navigate(`/zones`);
  };

  return (
    <React.Fragment>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={9} md={9}>
          <Card>
            <Card.Body className="p-6">
              <Image src={Logo} className="mb-4 w-15 h-15" alt="" />
              <h3 className="d-inline pull-right">
                <strong className="text-black">Immersed</strong>
              </h3>

              {idZone ? (
                <h1>Edit Zone</h1>
              ) : idZoneStatus ? (
                <h1>Update Status of Zone: {formData.name}</h1>
              ) : (
                <h1>New Zone</h1>
              )}
              <div className="container">
                <Formik
                  enableReinitialize={true}
                  initialValues={formData}
                  validationSchema={AddEditZoneSchema}
                  onSubmit={onHandle}
                >
                  <Form>
                    {idZoneStatus ? (
                      <div className="form-group">
                        <div>
                          <label htmlFor="zoneStatusId">
                            Select a Status
                            <span className="text-danger">*</span>
                          </label>
                        </div>
                        <div className="form-group">
                          <Field
                            as="select"
                            name="zoneStatusId"
                            aria-describedby="enterModel"
                            className="form-group form-select text-dark"
                          >
                            <option
                              value=""
                              className="text-muted"
                              label="Select a Status"
                            >
                              Select a status
                            </option>
                            {selectOptionData.zoneStatusOptions}
                          </Field>
                          <ErrorMessage
                            name="zoneStatusId"
                            component="div"
                            className=".has-error text-danger"
                          />
                        </div>
                      </div>
                    ) : (
                     <React.Fragment>
                        <div className="form-group">
                          <label htmlFor="name">
                            Name<span className="text-danger">*</span>
                          </label>
                          <Field
                            name="name"
                            type="text"
                            className="form-control"
                            id="name"
                            aria-describedby="enterModel"
                            placeholder="Enter title"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className=".has-error text-danger"
                          />
                        </div>
                        <br />
                        <div className="form-group">
                          <label htmlFor="description">Description</label>
                          <Field
                            as="textarea"
                            name="description"
                            type="description"
                            className="form-control"
                            id="description"
                            placeholder="Enter description"
                          />
                        </div>

                        <br />
                        <div className="form-group">
                          <div>
                            <label htmlFor="zoneTypeId">
                              Select a Type
                              <span className="text-danger">*</span>
                            </label>
                          </div>
                          <Field
                            as="select"
                            name="zoneTypeId"
                            aria-describedby="enterModel"
                            className="form-group form-select text-dark"
                          >
                            <option
                              value=""
                              label="Select a Type"
                              className="text-muted"
                            >
                              Select a Type
                            </option>
                            {selectOptionData.zoneTypesOptions}
                          </Field>
                          <ErrorMessage
                            name="zoneTypeId"
                            component="div"
                            className=".has-error text-danger"
                          />
                        </div>

                        <br />
                        <div className="form-group">
                          <div>
                            <label htmlFor="zoneStatusId">
                              Select a Status
                              <span className="text-danger">*</span>
                            </label>
                          </div>
                          <div className="form-group">
                            <Field
                              as="select"
                              name="zoneStatusId"
                              aria-describedby="enterModel"
                              className="form-group form-select text-dark"
                            >
                              <option
                                value=""
                                className="text-muted"
                                label="Select a Status"
                              >
                                Select a status
                              </option>
                              {selectOptionData.zoneStatusOptions}
                            </Field>
                            <ErrorMessage
                              name="zoneStatusId"
                              component="div"
                              className=".has-error text-danger"
                            />
                          </div>
                        </div>
                        <br />
                      </React.Fragment>
                    )}
                    {idZone ? (
                      <button type="submit" className="btn btn-warning">
                        Edit
                      </button>
                    ) : idZoneStatus ? (
                      <button type="submit" className="btn btn-info">
                        Update Status
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    )}

                    <button
                      onClick={onGoBack}
                      type="submit"
                      className="zones-btn-go-back btn btn-danger"
                    >
                      Back
                    </button>
                  </Form>
                </Formik>
                <br />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default AddEditZone;

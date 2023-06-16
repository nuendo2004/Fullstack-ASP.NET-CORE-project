import React, { useState, useEffect } from "react";
import debug from "sabio-debug";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { Button, Card, Row, Col } from "react-bootstrap";
import traineesSchema from "./traineesSchema";
import traineeServices from "../../services/traineesService";
import * as toastr from "toastr";
import lookUpService from "../../services/lookUpService";
import trainingUnitService from "../../services/trainingUnitService";
import organizationsService from "services/organizationService";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const _logger = debug.extend("TraineesFormAddEdit");

function TraineesFormAddEdit() {
  const [selectedOrg, setSelectedOrg] = useState(0);
  const [availableTrainingUnits, setAvailableTrainingUnits] = useState([]);
  const [formData, setFormData] = useState({
    organizations: [],
    traineeStatus: [],
    trainingUnits: [],
    trainingUnitId: 0,
    traineeStatusId: 0,
    email: "",
    query: 2,
    pageIndex: 0,
    pageSize: 10,
  });

  _logger("formData", formData);

  useEffect(() => {
    lookUpService
      .LookUp(["TraineeStatus"])
      .then(onTraineeStatusSuccess)
      .catch(onTraineeStatusError);

    organizationsService
      .getAll()
      .then(getAllOrganizationSuccess)
      .catch(getAllOrganizationError);
  }, []);

  const mapOrganizations = (orga) => {
    return (
      <option key={`organizations${orga.id}`} value={orga.id}>
        {orga.name}
      </option>
    );
  };
  const getAllOrganizationSuccess = (response) => {
    let allOrganizations = response.item;

    setSelectedOrg(() =>
      allOrganizations ? allOrganizations.map(mapOrganizations) : []
    );
  };
  const getAllOrganizationError = (err) => {
    _logger(err);
  };

  const mapTraineeStatus = (aStatus) => {
    return (
      <option key={`traineeStatus${aStatus.id}`} value={aStatus.id}>
        {aStatus.name}
      </option>
    );
  };
  const onTraineeStatusSuccess = (response) => {
    _logger("Lookup", response);
    let allTraineeStatus = response.item.traineeStatus;
    setFormData((prevState) => {
      const pd = { ...prevState };
      pd.traineeStatus = allTraineeStatus.map(mapTraineeStatus);

      return pd;
    });
  };
  const onTraineeStatusError = (err) => {
    _logger("TraineeStatus err", err);
  };

  const mapTrainingUnit = (unit) => {
    return (
      <option key={`trainingUnits${unit.id}`} value={unit.id}>
        {unit.name}
      </option>
    );
  };
  const onTrainingUnitSuccess = (response) => {
    _logger("trainingUnits", response);
    let allTrainingUnit = response.item.pagedItems;

    setAvailableTrainingUnits(() => {
      return allTrainingUnit ? allTrainingUnit.map(mapTrainingUnit) : [];
    });
  };
  const onTrainingUnitError = (err) => {
    _logger("trainingUnit err", err);
  };

  const onHandle = (values) => {
    _logger("From Formik", values);
    const payload = {
      TrainingUnitId: parseInt(values.trainingUnitId),
      TraineeStatusId: parseInt(values.traineeStatusId),
    };
    traineeServices
      .addTrainees(payload)
      .then(onAddSuccessTrainees)
      .catch(onAddErrorTrainees);
    _logger("TraineesFormData, page refresh Detected");
  };

  const onAddSuccessTrainees = (response) => {
    _logger(response);
    toastr.success("Trainee Successfully Added");
  };

  const onAddErrorTrainees = (err) => {
    _logger(err);
    toastr.error("Unable To Add Trainee");
  };

  const filteringByOrg = (e, setF) => {
    const orgId = e.target.value;
    setF("organizations", orgId);

    trainingUnitService
      .getTrainingUnitByOrgId(
        orgId,
        formData.pageIndex,
        formData.pageSize,
        formData.query
      )
      .then(onTrainingUnitSuccess)
      .catch(onTrainingUnitError);
  };

  return (
    <React.Fragment>
      <Link
        to="/trainees"
        className="addtrainee-linkbutton btn btn-primary mt-3 mx-2"
      >
        <FaArrowLeft />{" "}
      </Link>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={7} md={7}>
          <Card>
            <Card.Body className="p-6">
              <h1> Trainee Add Form</h1>
              <div className="container">
                <Formik
                  enableReinitialize={true}
                  initialValues={formData}
                  validationSchema={traineesSchema}
                  onSubmit={onHandle}
                >
                  {({ setFieldValue }) => (
                    <Form>
                      <div className="form-group">
                        <div>
                          <label htmlFor="organizations">
                            Organizations <span className="text-danger">*</span>
                          </label>
                        </div>
                        <Field
                          onChange={(e) => filteringByOrg(e, setFieldValue)}
                          as="select"
                          name="organizations"
                          aria-describedby="enterModel"
                          className="form-group form-select text-dark"
                          key="select"
                        >
                          <option
                            className="text-muted"
                            label="Select an Organization"
                          ></option>
                          {selectedOrg}
                        </Field>
                        <ErrorMessage
                          name="organization"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <br />
                      <div className="form-group">
                        <div>
                          <label htmlFor="trainingUnit">
                            Training Unit <span className="text-danger">*</span>
                          </label>
                        </div>
                        <div className="form-group">
                          <Field
                            as="select"
                            name="trainingUnitId"
                            aria-describedby="enterModel"
                            className="form-group form-select text-dark"
                          >
                            <option
                              value=""
                              className="text-muted"
                              label="Select a unit"
                            >
                              Select a unit
                            </option>
                            {availableTrainingUnits}
                          </Field>
                          <ErrorMessage
                            name="trainingUnitId"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <br />
                      <div className="form-group">
                        <div>
                          <label htmlFor="traineeStatus">
                            Trainee Status{" "}
                            <span className="text-danger">*</span>
                          </label>
                        </div>
                        <Field
                          as="select"
                          name="traineeStatusId"
                          aria-describedby="enterModel"
                          className="form-group form-select text-dark"
                        >
                          <option
                            value=""
                            label="Select a status"
                            className="text-muted"
                          >
                            Select a status
                          </option>
                          {formData.traineeStatus}
                        </Field>
                        <ErrorMessage
                          name="traineeStatusId"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <br />
                      <div className="form-group">
                        <div>
                          <label htmlFor="email">
                            Email <span className="text-danger">*</span>
                          </label>
                        </div>
                        <div className="form-group">
                          <Field
                            as="input"
                            name="email"
                            className="text-dark form-control"
                          ></Field>
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <br />
                      <Button type="submit" className="me-1">
                        Invite a Trainee
                      </Button>
                    </Form>
                  )}
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
export default TraineesFormAddEdit;

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Card } from "react-bootstrap";
import lookUpService from "services/lookUpService";
import trainingUnitService from "../../services/trainingUnitService";
import addTrainingUnitSchema from "../../schemas/addTrainingUnitSchema";
import toastr from "toastr";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import debug from "sabio-debug";
import { useEffect } from "react";
let tableName = ["trainingStatus"];
const _logger = debug.extend("AddTrainingUnit");

function AddTrainingUnit(props) {
  const currentOrgId = props.currentUser.currentOrgId;
  const [userFormData, setUserFormData] = useState({
    name: "",
    description: "",
    trainingStatusId: "",
    primaryTrainerId: "",
  });

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.type === "Edit_TrainingUnit") {
      _logger("Edit Training Units is Firing", state.payload);
      const trainingUnitEdits = state.payload;

      setUserFormData(() => {
        return {
          id: trainingUnitEdits.id,
          name: trainingUnitEdits.name,
          description: trainingUnitEdits.description,
          trainingStatusId: trainingUnitEdits.trainingStatusId.id,
          primaryTrainerId: trainingUnitEdits.primaryTrainerId.id,
        };
      });
    }
  }, [state]);

  const [formInfo, setFormInfo] = useState({
    trainingStatusTypes: [],
    orgCurrentUser: [],
    trainingUnitTrainer: [],
  });

  useEffect(() => {
    trainingUnitService
      .getPrimaryTrainerByCurrentUser()
      .then(onGetTrainerSuccess)
      .catch(onGetTrainerError);

    lookUpService
      .LookUp(tableName)
      .then(onGetTypesSuccess)
      .catch(onGetTypeError);
  }, []);

  const onGetTrainerSuccess = (response) => {
    let trainer = response.items;
    _logger("Trainer is firing", trainer);

    setFormInfo((prevState) => {
      let mappedTrainer = { ...prevState };
      mappedTrainer.trainingUnitTrainer = trainer.map(mapUnitTrainer);
      return mappedTrainer;
    });
  };

  const onGetTrainerError = (err) => {
    _logger("error", err);
    toastr.error("Failed to select a Trainer");
  };

  const onGetTypesSuccess = (response) => {
    let allTypes = response.item.trainingStatus;
    _logger("Types", allTypes);

    setFormInfo((prevState) => {
      let mappedInfo = { ...prevState };
      mappedInfo.trainingStatusTypes = allTypes.map(mapTrainingUnitType);
      return mappedInfo;
    });
  };
  const onGetTypeError = (err) => {
    _logger("error", err);
    toastr.error("Failed to select a TrainingStatus");
  };

  const mapTrainingUnitType = (aType, index) => {
    return (
      <option key={`List-A` + index} value={aType.id}>
        {aType.name}
      </option>
    );
  };
  const mapUnitTrainer = (aTrainer) => {
    return (
      <option key={`List-C` + aTrainer.id} value={aTrainer.id}>
        {aTrainer.firstName} {aTrainer.lastName}
      </option>
    );
  };

  const onSubmit = (values) => {
    let payload = values;
    payload.organizationId = currentOrgId;
    _logger(payload, "on submit was clicked");

    if (userFormData.id) {
      trainingUnitService
        .updateTrainingUnit(payload, userFormData.id)
        .then(onUpdateSuccess)
        .catch(onUpdateError);
    } else {
      trainingUnitService
        .addTrainingUnit(payload)
        .then(onAddSuccess)
        .catch(onAddError);
    }
  };

  const onAddError = (err) => {
    _logger("error", err);
    toastr.error("Failed to Add a TrainingUnit");
  };

  const onAddSuccess = (response) => {
    navigate("/trainingUnits/OrgList");
    toastr.success("Add Success");
    _logger("post ok", response);
  };

  const onUpdateSuccess = (response) => {
    navigate("/trainingUnits/OrgList");
    _logger("success", response);
    toastr.success("Training Unit Updated");
  };

  const onUpdateError = (err) => {
    _logger("error", err);
    toastr.error("Error updating TrainingUnit");
  };

  return (
    <React.Fragment>
      <Card className="mb-3 card ">
        <Card.Header className="border-bottom px-4 py-3">
          <h4 className="mb-0">Basic Information</h4>
        </Card.Header>
        <Card.Body className="mb-3 ">
          <h1 className="text">
            {userFormData.id ? "Update" : "Add"} A Training Unit
          </h1>
          <Button href="/trainingUnits/OrgList" className="me-1">
            Go to Org List
          </Button>
          <div className="container">
            <Formik
              enableReinitialize={true}
              initialValues={userFormData}
              validationSchema={addTrainingUnitSchema}
              onSubmit={onSubmit}
            >
              <Form>
                <div className="form-group">
                  <label htmlFor="Name">
                    Name<span className="text-danger">*</span>
                  </label>
                  <Field
                    name="name"
                    type="text"
                    className="form-control"
                    id="name"
                    aria-describedby="enterModel"
                    placeholder="Training Unit Name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className=".has-error text-danger"
                  />
                </div>

                <div className="form-group">
                  <div>
                    <label htmlFor="TrainingStatusId">
                      Select a Status <span className="text-danger">*</span>
                    </label>
                  </div>
                  <Field
                    as="select"
                    name="trainingStatusId"
                    aria-describedby="enterModel"
                    className="form-group form-select text-dark"
                  >
                    <option value="0" label="Status" className="text-muted">
                      Please select a Training Status
                    </option>
                    {formInfo.trainingStatusTypes}
                  </Field>
                  <ErrorMessage
                    name="trainingStatusId"
                    component="div"
                    className=".has-error text-danger"
                  />
                </div>
                <div className="form-group">
                  <div>
                    <label htmlFor="PrimaryTrainerId">
                      Select a Trainer <span className="text-danger">*</span>
                    </label>
                  </div>
                  <Field
                    as="select"
                    name="primaryTrainerId"
                    aria-describedby="enterModel"
                    className="form-group form-select text-dark"
                  >
                    <option
                      value=""
                      label="Trainer Name"
                      className="text-muted"
                    >
                      Trainer Name
                    </option>
                    {formInfo.trainingUnitTrainer}
                  </Field>
                  <ErrorMessage
                    name="primaryTrainerId"
                    component="div"
                    className=".has-error text-danger"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="Description">Description</label>
                  <Field
                    as="textarea"
                    name="description"
                    type="Description"
                    className="form-control"
                    id="Description"
                    placeholder="Enter description"
                  />
                </div>
                <Button type="submit" className="btn btn-primary">
                  {userFormData.id ? "Update" : "Add"}
                </Button>
              </Form>
            </Formik>
          </div>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}

export default AddTrainingUnit;
AddTrainingUnit.propTypes = {
  currentUser: PropTypes.shape({
    currentOrgId: PropTypes.number,
  }),
};

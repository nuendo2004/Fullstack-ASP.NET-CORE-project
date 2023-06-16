import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Card } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Logo from "assets/images/brand/logo/immersed-spiral-logo.png";
import { taskEventsFormSchema } from "schemas/taskEventsFormSchema";
import { Image } from "react-bootstrap";
import taskEventsService from "services/taskEventsService";
import swal from "sweetalert2";
import logger from "sabio-debug";
import lookUpService from "services/lookUpService";
const _logger = logger.extend("TaskEvent");

const TaskEvents = () => {
  const [formData, setFormData] = useState({
    zoneId: 11,
    entityTypeId: 3,
    entityId: "",
    taskEventTypeId: "",
    numericValue: "",
    boolValue: "",
    text: "",
    payload: "",
  });

  const [lookUpData, setLookUpData] = useState({
    taskEventTypeArray: "",
    traineeAccountsComponents: "",
    traineeAccountsArray: "",
  });

  useEffect(() => {
    _logger("lookUpData", lookUpData);
    lookUpService
      .LookUp(["TaskEventTypes", "TraineeAccounts"])
      .then(lookUpSuccess)
      .catch(lookUpError);
  }, []);

  useEffect(() => {
    if (formData.payload) {
      _logger("formData Submit", formData);
      taskEventsService
        .createNewTaskEvent(formData)
        .then(onCreateTaskEventSuccess)
        .catch(onCreateTaskEventError);
    }
  }, [formData]);

  function onSubmitClick(values) {
    setFormData((prevState) => {
      const newObject = {
        ...prevState,
      };
      newObject.entityId = Number(values.entityId);
      newObject.taskEventTypeId = Number(values.taskEventTypeId);
      newObject.numericValue = Number(values.numericValue);
      newObject.boolValue = values.boolValue === "1" ? true : false;
      newObject.text = values.text;
      newObject.payload = values.payload;
      return newObject;
    });
  }

  const onCreateTaskEventSuccess = (response) => {
    _logger("TaskEvent OK", response);
    swal.fire({
      icon: "success",
      title: "All Done!",
      text: "Task Event Created",
      confirmButtonText: "Ok",
    });
  };

  const onCreateTaskEventError = (error) => {
    _logger("TaskEvent OK", error);
    swal.fire({
      title: "Creation was unsuccessfull",
      icon: "error",
      confirmButtonText: "Try again",
    });
  };

  const lookUpSuccess = (response) => {
    _logger("lookup OK", response);
    let taskEventTypeArray = response.item.taskEventTypes;
    let traineeAccountsArray = response.item.traineeAccounts;

    setLookUpData((prevState) => {
      const newObject = {
        ...prevState,
      };
      newObject.taskEventTypeArray = taskEventTypeArray;
      newObject.taskEventTypeComponents = taskEventTypeArray.map(mapLookUpData);
      newObject.traineeAccountsArray = traineeAccountsArray;
      newObject.traineeAccountsComponents =
        traineeAccountsArray.map(mapLookUpData);
      return newObject;
    });
  };

  const lookUpError = (error) => {
    _logger("lookup Error", error);
  };

  const mapLookUpData = (data) => {
    _logger("map data", data);
    return (
      <option key={data.id} value={`${data.id}`}>
        {data.name}
      </option>
    );
  };

  return (
    <Fragment>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={4} md={4} className="py-8 py-xl-0">
          <Card>
            <Card.Body className="p-6">
              <div className="mb-4">
                <Link to="/">
                  <Image src={Logo} className="w-15 h-15" alt="" />
                  <h3 className="d-inline pull-right">
                    <strong className="text-black">Immersed</strong>
                  </h3>
                </Link>
                <h1 className="mb-1 fw-bold">Task Event</h1>
              </div>
              <Formik
                enableReinitialize={true}
                initialValues={formData}
                onSubmit={onSubmitClick}
                validationSchema={taskEventsFormSchema}
              >
                <Form>
                  <Row>
                    <Col lg={12} md={12} className="mb-3">
                      <label className="pb-2">Zone Id </label>
                      <Field
                        as="select"
                        className="form-control"
                        id="zoneId"
                        name="zoneId"
                        placeholder="Zone Id"
                      >
                        <option value="11">Hack Tac Toe</option>
                      </Field>
                      <ErrorMessage
                        name="zoneId"
                        component="p"
                        className="text-danger"
                      />
                    </Col>
                    <Col lg={12} md={12} className="mb-3">
                      <label className="pb-2">Entity Type Id</label>
                      <Field
                        as="select"
                        className="form-control"
                        id="entityTypeId"
                        name="entityTypeId"
                        placeholder="Entity Type Id"
                      >
                        <option value="3">Trainees</option>
                      </Field>
                      <ErrorMessage
                        name="entityTypeId"
                        component="p"
                        className="text-danger"
                      />
                    </Col>
                    <Col lg={12} md={12} className="mb-3">
                      <label className="pb-2">Entity Id</label>
                      <Field
                        as="select"
                        className="form-control"
                        id="entityId"
                        name="entityId"
                        placeholder="Entity Id"
                      >
                        <option value="">Select</option>
                        {lookUpData.traineeAccountsComponents}
                      </Field>
                      <ErrorMessage
                        name="entityId"
                        component="p"
                        className="text-danger"
                      />
                    </Col>
                    <Col lg={12} md={12} className="mb-3">
                      <label className="pb-2">Task Event Type Id</label>
                      <Field
                        as="select"
                        className="form-control"
                        id="taskEventTypeId"
                        name="taskEventTypeId"
                        placeholder="Task Event Type Id"
                      >
                        <option value="">Select</option>
                        {lookUpData.taskEventTypeComponents}
                      </Field>
                      <ErrorMessage
                        name="taskEventTypeId"
                        component="p"
                        className="text-danger"
                      />
                    </Col>
                    <Col lg={12} md={12} className="mb-3">
                      <label className="pb-2">Numeric Value</label>
                      <Field
                        type="number"
                        className="form-control"
                        id="numericValue"
                        name="numericValue"
                        placeholder="Numeric Value"
                      />
                    </Col>
                    <Col lg={12} md={12} className="mb-3">
                      <label className="pb-2">Bool Value</label>
                      <Field
                        as="select"
                        name="boolValue"
                        id="boolValue"
                        className="form-control"
                        placeholder="Select"
                      >
                        <option value="">Select</option>
                        <option value="1">True</option>
                        <option value="0">False</option>
                      </Field>
                      <ErrorMessage
                        name="boolValue"
                        component="p"
                        className="text-danger"
                      />
                    </Col>
                    <Col lg={12} md={12} className="mb-3">
                      <label className="pb-2">Text</label>
                      <Field
                        type="text"
                        className="form-control"
                        id="text"
                        name="text"
                        placeholder="Text"
                      />
                      <ErrorMessage
                        name="text"
                        component="p"
                        className="text-danger"
                      />
                    </Col>
                    <Col lg={12} md={12} className="mb-3">
                      <label className="pb-2">Payload</label>
                      <Field
                        type="text"
                        className="form-control"
                        id="payload"
                        name="payload"
                        placeholder="Payload"
                      />
                      <ErrorMessage
                        name="payload"
                        component="p"
                        className="text-danger"
                      />
                    </Col>
                    <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </Col>
                  </Row>
                </Form>
              </Formik>
              <hr className="my-4" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default TaskEvents;

import React from "react";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Col, Button } from "react-bootstrap";
import { TSFlatPickr } from "./flat-pickr/TSFlatPickr";
import { trainingScheduleSchema } from "schemas/trainingScheduleSchema";
import trainingScheduleService from "services/trainingScheduleService";
import PropTypes from "prop-types";
import toastr from "toastr";

function AddTrainingScheduleModal({
  newEvent,
  setNewEvent,
  isShowAddModal,
  setIsShowAddModal,
  trainingUnits,
  setAddRefresh,
  setSelectedDate,
  setEvents,
  events,
}) {
  const handleFormSubmit = () => {
    const eventData = {
      name: newEvent.name,
      daysOfWeekId: newEvent.daysOfWeekId,
      trainingUnitId: newEvent.trainingUnitId,
      startDate: newEvent.startDate,
      endDate: newEvent.endDate,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
    };
    trainingScheduleService
      .create(eventData)
      .then(addNewEventSuccess)
      .catch(onAddFail);
  };

  const addNewEventSuccess = (response) => {
    setEvents([...events, response]);
    setNewEvent({
      name: "",
      trainingUnitId: "",
      daysOfWeekId: "",
      startDate: new Date(),
      endDate: new Date(),
      startTime: new Date(),
      endTime: new Date(),
    });
    setIsShowAddModal(false);
    setAddRefresh(true);
  };
  const onAddFail = () => {
    toastr.error("Please enter all fields");
  };

  const handleDateChange = (dates, name, setFieldValue) => {
    if (dates && dates.length > 0) {
      setFieldValue(name, dates[0]);
      setNewEvent((prevState) => ({
        ...prevState,
        [name]: dates[0],
      }));
    }
  };

  const onFormFieldChange = (e) => {
    e.preventDefault();
    const target = e.target;
    const fieldValue = target.value;
    const nameOfField = target.name;
    setNewEvent((prevState) => {
      const newFieldData = { ...prevState };
      newFieldData[nameOfField] = fieldValue;
      if (
        nameOfField === "startDate" ||
        nameOfField === "endDate" ||
        nameOfField === "endTime" ||
        nameOfField === "startTime"
      ) {
        setSelectedDate(new Date(fieldValue));
      }
      return newFieldData;
    });
  };
  const handleModalClose = () => {
    setIsShowAddModal(false);
  };
  function renderTrainingUnitOption(trainingUnit) {
    return (
      <option key={trainingUnit.id} value={trainingUnit.id}>
        {trainingUnit.name}
      </option>
    );
  }
  return (
    <Modal show={isShowAddModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title className="schedule-calendartitle">
          New Schedule
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize={true}
          initialValues={newEvent}
          onSubmit={handleFormSubmit}
          validationSchema={trainingScheduleSchema}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Col md={12} sm={12}>
                <label className="pb-2 d-flex justify-content-between text-left">
                  Training Unit
                </label>
                <select
                  name="trainingUnitId"
                  id="trainingUnitId"
                  className="text-right"
                  onChange={onFormFieldChange}
                  value={values.trainingUnitId}
                >
                  <option value="">Select a training unit</option>
                  {trainingUnits && trainingUnits.map(renderTrainingUnitOption)}
                </select>
              </Col>
              <Col md={12} sm={12}>
                <label className="pb-2">Name</label>
                <Field
                  type="text"
                  className="form-control"
                  placeholder="Training Schedule Name"
                  name="name"
                  id="name"
                  onChange={onFormFieldChange}
                  value={values.name}
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-danger p-1"
                />
              </Col>
              <Col md={12} sm={12}>
                <label htmlFor="selectStartDate">Start Date</label>
                <TSFlatPickr
                  data-enable-time
                  value={values.startDate}
                  placeholder="Start Date"
                  options={{
                    altInput: true,
                    altFormat: "M d, Y",
                  }}
                  onChange={(newDates) =>
                    handleDateChange(newDates, "startDate", setFieldValue)
                  }
                />
              </Col>
              <Col md={12} sm={12}>
                <label htmlFor="selectStartTime">Start Time</label>
                <TSFlatPickr
                  data-enable-time
                  value={values.startTime}
                  placeholder="Start Time"
                  options={{
                    enableTime: true,
                    noCalendar: true,
                  }}
                  onChange={(newDates) =>
                    handleDateChange(newDates, "startTime", setFieldValue)
                  }
                />
              </Col>
              <Col md={12} sm={12}>
                <label htmlFor="selectEndDate">End Date</label>
                <TSFlatPickr
                  data-enable-time
                  value={values.endDate}
                  placeholder="End Date"
                  options={{ altInput: true, altFormat: "M d, Y" }}
                  onChange={(newDates) =>
                    handleDateChange(newDates, "endDate", setFieldValue)
                  }
                />
              </Col>
              <Col md={12} sm={12}>
                <label htmlFor="selectEndTime">End Time</label>
                <TSFlatPickr
                  data-enable-time
                  value={values.endTime}
                  placeholder="End Time"
                  options={{ enableTime: true, noCalendar: true }}
                  onChange={(newDates) =>
                    handleDateChange(newDates, "endTime", setFieldValue)
                  }
                />
              </Col>
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleFormSubmit}
        >
          Submit
        </button>
        <Button variant="secondary" onClick={handleModalClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

AddTrainingScheduleModal.propTypes = {
  isShowAddModal: PropTypes.bool.isRequired,
  setIsShowAddModal: PropTypes.func.isRequired,
  trainingUnits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  setAddRefresh: PropTypes.func.isRequired,
  setSelectedDate: PropTypes.func.isRequired,
  setEvents: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      startDate: PropTypes.instanceOf(Date).isRequired,
      endDate: PropTypes.instanceOf(Date).isRequired,
      daysOfWeekId: PropTypes.number.isRequired,
      trainingUnitId: PropTypes.number.isRequired,
    })
  ).isRequired,
  newEvent: PropTypes.shape({
    name: PropTypes.string.isRequired,
    trainingUnitId: PropTypes.string.isRequired,
    daysOfWeekId: PropTypes.number.isRequired,
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
    startTime: PropTypes.instanceOf(Date).isRequired,
    endTime: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  setNewEvent: PropTypes.func.isRequired,
};

export default AddTrainingScheduleModal;

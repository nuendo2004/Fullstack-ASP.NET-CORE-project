import React, { useState, useEffect } from "react";
import toastr from "toastr";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import FullCalendar from "@fullcalendar/react";
import { Button } from "react-bootstrap";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Col } from "react-bootstrap";
import { TSFlatPickr } from "./flat-pickr/TSFlatPickr";
import "../trainingschedule/trainercalendar.css";
import trainingScheduleService from "services/trainingScheduleService";
import { trainingScheduleSchema } from "schemas/trainingScheduleSchema";
import trainingUnitService from "services/trainingUnitService";
import AddTrainingScheduleModal from "./AddTrainingScheduleModal";

function TrainerScheduleCalendar(props) {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditDelModalOpen, setEditDelModal] = useState(false);
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [updateEvent, setUpdateEvent] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [addRefresh, setAddRefresh] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [trainingUnits, setTrainingUnits] = useState([]);
  const [formattedEvents, setFormattedEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: props.name || "",
    trainingUnitId: props.trainingUnitId || "",
    daysOfWeekId: 2,
    startDate: props.startDate || new Date(),
    endDate: props.endDate || new Date(),
    startTime: props.startTime || new Date(),
    endTime: props.endTime || new Date(),
  });

  useEffect(() => {
    trainingUnitService.getAllTrainingUnit().then(unitSuccess).catch(unitFail);
  }, []);

  const unitSuccess = (response) => {
    setTrainingUnits(response.items);
  };

  const unitFail = () => {
    toastr.error("Can't load TrainingUnits");
  };

  useEffect(() => {
    trainingScheduleService
      .createdByNoPagination()
      .then(eventSuccess)
      .catch(eventError);
  }, [addRefresh]);

  const handleModalClose = () => {
    setEditDelModal(false);
    setIsShowAddModal(false);
  };
  const eventSuccess = (response) => {
    const formatEvent = (event) => ({
      id: event.id,
      publicId: event.publicId,
      title: event.name,
      start: new Date(event.startDate),
      end: new Date(event.endDate),
      color: "purple",
    });
    const events = response.items.map(formatEvent);
    setFormattedEvents(events);
    setAddRefresh(false);
  };

  const eventError = () => {
    toastr.error("The schedule only accessible to Admin and Trainers");
  };

  const deletingHandler = () => {
    const handler = onDeleteSuccess(selectedEvent.item.id);
    trainingScheduleService
      .archive(selectedEvent.item.id)
      .then(handler)
      .catch(onDeleteFailed);
  };

  function filterEventById(event, idToBeDelete) {
    return event.filter((event) => event.id !== idToBeDelete);
  }

  const onDeleteSuccess = (idToBeDelete) => {
    setEvents((prevEvents) => {
      const updatedEvents = filterEventById(prevEvents, idToBeDelete);
      return updatedEvents;
    });
    setEditDelModal(false);
    setAddRefresh(true);
  };

  const onDeleteFailed = () => {
    toastr.error(`Error deleting event`);
  };

  const selectDate = (clickDate) => {
    setIsShowAddModal(true);
    setNewEvent({
      name: "",
      trainingUnitId: "",
      daysOfWeekId: 2,
      startDate: clickDate.start,
      endDate: clickDate.end,
      startTime: clickDate.start,
      endTime: clickDate.end,
    });
  };

  const handleUpdateDate = (newDates, fieldName, setFieldValue) => {
    setUpdateEvent((prevState) => {
      const newEvent = { ...prevState };
      const newDate = newDates[0];
      newEvent[fieldName] = newDate;
      setFieldValue(fieldName, newDate, true);
      return newEvent;
    });
  };

  useEffect(() => {
    trainingScheduleService
      .createdByNoPagination()
      .then(eventSuccess)
      .catch(eventError);
  }, [addRefresh, selectedDate]);

  function handleClick(clickEvent) {
    setEditDelModal(true);
    const eventId = clickEvent.event._def.publicId;

    trainingScheduleService
      .getById(eventId)
      .then(onGetSuccess)
      .catch(onGetError);
  }

  const onGetSuccess = (data) => {
    setSelectedEvent(data);
    setUpdateEvent({
      name: data.item.name,
      trainingUnitId: data.item.trainingUnitId,
      daysOfWeekId: data.item.daysOfWeekId,
      startDate: data.item.startDate,
      endDate: data.item.endDate,
      startTime: data.item.startTime,
      endTime: data.item.endTime,
      id: data.item.id,
    });
  };

  const onGetError = (error) => {
    toastr.error(`Invalid Event Id :  ${error}`);
  };

  const handleEdit = () => {
    const update = {
      name: updateEvent.name,
      startDate: new Date(updateEvent.startDate),
      startTime: new Date(updateEvent.startTime),
      endDate: new Date(updateEvent.endDate),
      endTime: new Date(updateEvent.endTime),
      daysOfWeekId: updateEvent.daysOfWeekId,
      id: updateEvent.id,
      trainingUnitId: updateEvent.trainingUnitId,
    };
    trainingScheduleService
      .update(update, selectedEvent.item.id)
      .then(onUpdateSuccess)
      .catch(onUpdateFail);
  };
  const onUpdateSuccess = (response) => {
    setEvents((prevEvents) => {
      return prevEvents.map((event) => {
        if (event.id === response.id) {
          return {
            ...event,
            name: response.name,
            startDate: new Date(response.startDate),
            startTime: new Date(response.startTime),
            endDate: new Date(response.endDate),
            endTime: new Date(response.endTime),
            daysOfWeekId: response.daysOfWeekId,
            trainingUnitId: response.trainingUnitId,
          };
        } else {
          return event;
        }
      });
    });
    setEditDelModal(false);
    setRefresh((prevRefresh) => !prevRefresh);
  };

  useEffect(() => {
    trainingScheduleService
      .createdByNoPagination()
      .then(eventSuccess)
      .catch(eventError);
  }, [refresh, selectedDate]);

  const onUpdateFail = (error) => {
    toastr.error(`error updating event data: ${error}`);
  };
  const onUpdateFieldChange = (e) => {
    e.preventDefault();
    const target = e.target;
    const fieldValue = target.value;
    const nameOfField = target.name;
    setUpdateEvent((prevState) => {
      const newFieldData = { ...prevState };
      newFieldData[nameOfField] = fieldValue;
      if (
        nameOfField === "startDate" ||
        nameOfField === "endDate" ||
        nameOfField === "endTime" ||
        nameOfField === "startTime"
      ) {
        newFieldData[nameOfField] = new Date(fieldValue);
      }
      return newFieldData;
    });
  };

  function renderTrainingUnitOption(trainingUnit) {
    return (
      <option key={trainingUnit.id} value={trainingUnit.id}>
        {trainingUnit.name}
      </option>
    );
  }

  return (
    <div>
      <h1 className="text-center training-calendar-head">Trainer Schedule</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        weekends={true}
        events={formattedEvents}
        selectable={true}
        eventOrderStrict={true}
        eventClick={handleClick}
        select={selectDate}
        dayMaxEvents={true}
        addRefresh={addRefresh}
        refresh={refresh}
      />
      {selectedEvent && (
        <Modal show={isEditDelModalOpen} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title className="schedule-calendartitle">
              {selectedEvent.item.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              enableReinitialize={true}
              initialValues={{
                name: updateEvent.name,
                startDate: updateEvent.startDate,
                endDate: updateEvent.endDate,
                id: selectedEvent.item.id,
                trainingUnitId: updateEvent.trainingUnitId,
              }}
              validationSchema={trainingScheduleSchema}
            >
              {({ handleBlur, setFieldValue, values }) => (
                <Form>
                  <Col md={12} sm={12}>
                    <label className="pb-2  d-flex justify-content-between text-left">
                      Training Unit
                    </label>
                    <select
                      name="trainingUnitId"
                      id="trainingUnitId"
                      className="text-right"
                      onChange={onUpdateFieldChange}
                      value={values.trainingUnitId}
                    >
                      <option value="">Select a training unit</option>
                      {trainingUnits &&
                        trainingUnits.map(renderTrainingUnitOption)}
                    </select>
                  </Col>

                  <Col md={12} sm={12}>
                    <label className="pb-2"> Name</label>
                    <Field
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      value={updateEvent.name}
                      onChange={onUpdateFieldChange}
                      onBlur={handleBlur}
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
                      value={updateEvent.startDate}
                      options={{
                        altInput: true,
                        altFormat: "M d, Y",
                      }}
                      onChange={(newDates) =>
                        handleUpdateDate(newDates, "startDate", setFieldValue)
                      }
                    />
                  </Col>
                  <Col md={12} sm={12}>
                    <label htmlFor="selectStartTime">Start Time</label>
                    <TSFlatPickr
                      data-enable-time
                      value={updateEvent.startTime}
                      options={{
                        enableTime: true,
                        noCalendar: true,
                      }}
                      onChange={(newDates) =>
                        handleUpdateDate(newDates, "startTime", setFieldValue)
                      }
                    />
                  </Col>
                  <Col md={12} sm={12}>
                    <label htmlFor="selectEndDate">End Date</label>
                    <TSFlatPickr
                      data-enable-time
                      value={updateEvent.endDate}
                      options={{ altInput: true, altFormat: "M d, Y" }}
                      onChange={(newDates) =>
                        handleUpdateDate(newDates, "endDate", setFieldValue)
                      }
                    />
                  </Col>
                  <Col md={12} sm={12}>
                    <label htmlFor="selectEndTime">End Time</label>
                    <TSFlatPickr
                      data-enable-time
                      value={updateEvent.endTime}
                      options={{ enableTime: true, noCalendar: true }}
                      onChange={(newDates) =>
                        handleUpdateDate(newDates, "endTime", setFieldValue)
                      }
                    />
                  </Col>
                </Form>
              )}
            </Formik>
          </Modal.Body>
          <Modal.Footer>
            <row>
              <Button
                className="calendar-delete-button"
                variant="danger"
                onClick={deletingHandler}
              >
                Delete Event
              </Button>
              <Button
                className="calendar-update-button"
                variant="secondary"
                onClick={handleEdit}
              >
                Update
              </Button>
              <Button variant="secondary" onClick={handleModalClose}>
                Return
              </Button>
            </row>
          </Modal.Footer>
        </Modal>
      )}
      {isShowAddModal && (
        <AddTrainingScheduleModal
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          isShowAddModal={isShowAddModal}
          setIsShowAddModal={setIsShowAddModal}
          trainingUnits={trainingUnits}
          setAddRefresh={setAddRefresh}
          setSelectedDate={setSelectedDate}
          setEvents={setEvents}
          handleModalClose={handleModalClose}
          events={events}
        />
      )}
    </div>
  );
}

TrainerScheduleCalendar.propTypes = {
  name: PropTypes.string,
  trainingUnitId: PropTypes.string,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  startTime: PropTypes.instanceOf(Date),
  endTime: PropTypes.instanceOf(Date),
};

export default TrainerScheduleCalendar;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col, Container } from "react-bootstrap";
import { TSFlatPickr } from "./flat-pickr/TSFlatPickr";
import toastr from "toastr";
import logger from "sabio-debug";
import { Formik, Form, Field, ErrorMessage } from "formik";
import trainingScheduleService from "services/trainingScheduleService";
import organizationsService from "services/organizationService";
import orgAdminService from "services/orgAdminService";
import { trainingScheduleSchema } from "schemas/trainingScheduleSchema";
import { useParams, useLocation } from "react-router-dom";

const _logger = logger.extend("TrainingScheduleForm");

const organization = {
  orgId: "",
};

function TrainingScheduleForm(props) {
  const user = props.currentUser;

  let [currentOrg, setCurrentOrg] = useState({
    ...organization,
  });

  const { state } = useLocation();
  const { scheduleId } = useParams();
  _logger("scheduleId", scheduleId);
  _logger("state", state);
  const [scId, setScheduleId] = useState(scheduleId);

  useEffect(() => {
    _logger("scId", scId);
    setScheduleId(scheduleId);
    if (state?.type === "SCHEDULE_EDIT" && state?.payload) {
      setTrainingScheduleData((prevState) => {
        const tsd = { ...prevState };
        tsd.id = state.payload.id;
        tsd.name = state.payload.name;
        tsd.startDate = state.payload.startDate;
        tsd.startTime = state.payload.startTime.substring(11, 16);
        tsd.endDate = state.payload.endDate;
        tsd.endTime = state.payload.endTime.substring(11, 16);
        return tsd;
      });
    }
  }, [scheduleId, state]);

  useEffect(() => {
    getOrganization();
  }, []);

  useEffect(() => {
    if (currentOrg?.orgId) {
      getOrganizationData();
    }
  }, [currentOrg?.orgId]);

  const getOrganization = () => {
    const id = user.id;
    organizationsService
      .organizationByUserId(id)
      .then(onGetOrganizationSuccess)
      .catch(onGetOrganizationFail);
  };

  const getOrganizationData = () => {
    const orgId = currentOrg.orgId;
    const numberSelection = 2;
    orgAdminService
      .getOrgAdminData(orgId, numberSelection)
      .then(onGetOrganizationDataSuccess)
      .catch(onGetOrganizationDataFail);
  };

  const onGetOrganizationSuccess = (response) => {
    _logger("getOrganization success", response);
    setCurrentOrg((prevState) => {
      let orgInfo = { ...prevState };
      orgInfo.orgId = response.item.pagedItems[0].id;
      orgInfo.orgLogo = response.item.pagedItems[0].logoUrl;
      orgInfo.name = response.item.pagedItems[0].name;
      orgInfo.orgType = response.item.pagedItems[0].organizationType.name;
      return orgInfo;
    });
  };
  const onGetOrganizationDataSuccess = (response) => {
    _logger("getOrganizationData success", response);
    setTrainingScheduleData((prevState) => {
      let tcd = { ...prevState };
      tcd.trainingUnitId = response.item.trainings[0].trainingUnitId;
      return tcd;
    });
  };

  const onGetOrganizationFail = (error) => {
    _logger("getOrganization fail", error);
    toastr.error("Could not find organization");
  };

  const onGetOrganizationDataFail = (error) => {
    _logger("getOrganizationData fail", error);
    toastr.error("Could not find organization data");
  };

  const [trainingScheduleData, setTrainingScheduleData] = useState({
    name: "",
    trainingUnitId: "",
    daysOfWeekId: 2,
    startDate: new Date(),
    endDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
  });

  const handleSubmit = (values) => {
    const trainingScheduleFormValues = values;
    _logger("trainingScheduleFormValues", trainingScheduleFormValues);
    if (trainingScheduleData.id) {
      trainingScheduleService
        .update(values, trainingScheduleData.id)
        .then(onUpdateScheduleSuccess)
        .catch(onUpdateScheduleError);
    } else {
      trainingScheduleService
        .create(values)
        .then(onCreateScheduleSuccess)
        .catch(onCreateScheduleError);
    }
  };

  const onCreateScheduleSuccess = (response) => {
    _logger("createSchedule success", response);
    toastr.success("Training schedule created successfully!");
  };

  const onCreateScheduleError = (error) => {
    _logger("createSchedule error", error);
    toastr.error("Unable to create training schedule");
  };

  const onUpdateScheduleSuccess = (response) => {
    _logger("updateSchedule success", response);
    toastr.success("Training schedule updated successfully!");
  };

  const onUpdateScheduleError = (error) => {
    _logger("updateSchedule error", error);
    toastr.error("Unable to update training schedule");
  };

  const handleDateChange = (dates, name, setFieldValue) => {
    if (dates?.length > 0) {
      setFieldValue(name, dates[0]);
    }
  };

  const displayText = trainingScheduleData.id
    ? "Edit Training Schedule"
    : "Add Training Schedule";

  return (
    <Container fluid="md">
      <Row>
        <Col md={6} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">{displayText}</h1>
            </div>
          </div>
        </Col>
      </Row>
      <Formik
        enableReinitialize={true}
        initialValues={trainingScheduleData}
        onSubmit={handleSubmit}
        validationSchema={trainingScheduleSchema}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Col md={6} sm={12} className="mb-3">
              <label className="pb-2">Training Schedule Name</label>
              <Field
                type="text"
                className="form-control"
                placeholder="Training Schedule Name"
                name="name"
                id="name"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-danger p-1"
              />
            </Col>
            <Col md={6} sm={12} className="mb-3">
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
            <Col md={6} sm={12} className="mb-3">
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
            <Col md={6} sm={12} className="mb-3">
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
            <Col md={6} sm={12} className="mb-3">
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
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

TrainingScheduleForm.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

export default TrainingScheduleForm;

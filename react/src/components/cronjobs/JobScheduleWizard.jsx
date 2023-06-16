import React, { useEffect } from "react";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import { FaWpforms, FaUserCog } from "react-icons/fa";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Loki from "react-loki";
import { Row } from "react-bootstrap";
import JobSettingsForm from "./JobSettingsForm";
import JobRecipientForm from "./JobRecipientForm";
import "./jobwizardui.css";
import "./jobwizard.css";
import jobScheduleService from "services/jobSchedulesService";
import toastr from "toastr";
import traineesService from "services/traineesService";

const _logger = debug.extend("JobScheduleWizard");

function JobScheduleWizard(props) {
  const user = props.currentUser;
  const newDate = new Date();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [formData, setFormData] = useState({
    chronJobTypeId: "",
    utcHourToRun: newDate,
    intervalTypeId: "",
    daysOfTheWeekId: "",
    entityTypeId: "",
    recipient: "",
    recipientId: "",
  });

  const getFormData = (values) => {
    return {
      chronJobTypeId: parseInt(formData.chronJobTypeId),
      utcHourToRun: formData.utcHourToRun.getUTCHours(),
      intervalTypeId: parseInt(formData.intervalTypeId),
      daysOfWeekId: parseInt(formData.daysOfTheWeekId),
      entityTypeId: parseInt(values.entityTypeId),
      recipient: values.recipient,
      recipientId: parseInt(values.recipientId),
    };
  };

  useEffect(() => {
    if (state && state.type === "JOB_VIEW" && state.payload !== formData) {
      let editData = state.payload;
      let timeData = new Date(Date.UTC(0, 0, 0, editData.utcHourToRun));
      traineesService
        .getTraineeById(editData.recipientId)
        .then(onGetTraineeSuccess)
        .catch(onGetTraineeError);
      setFormData((prevState) => {
        let data = { ...prevState };
        data.chronJobTypeId = editData.chronJobTypeId.toString();
        data.intervalTypeId = editData.intervalTypeId.toString();
        data.daysOfTheWeekId = editData.daysOfWeekId.toString();
        data.utcHourToRun = timeData;
        data.entityTypeId = editData.entityTypeId.toString();
        data.recipientId = editData.recipientId.toString();
        data.recipient = editData.recipient;
        return data;
      });
    }
  }, []);

  const mergeValues = (values) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        ...values,
      };
    });
  };

  const onGetTraineeSuccess = (response) => {
    setFormData((prevState) => {
      let data = { ...prevState };
      data.trainingUnitId = response.item.trainingUnitId.toString();
      data.organizationId = response.item.organization.id.toString();
      return data;
    });
  };

  const onGetTraineeError = (error) => {
    _logger(error);
    toastr.error("Something went wrong...");
  };

  const onAddJobSuccess = (response) => {
    _logger(response);
    toastr.success("You have succesfully added a job!");
    navigate("/cronjobs");
  };

  const onAddJobError = (error) => {
    _logger(error);
    toastr.error("Something went wrong...");
  };

  const onUpdateJobSuccess = (response) => {
    _logger(response);
    toastr.success("Job Schedule successfully updated!");
    navigate("/cronjobs");
  };

  const onUpdateJobError = (error) => {
    _logger(error);
    toastr.error("Something went wrong with updating...");
  };

  const onSubmit = (values) => {
    const payload = getFormData(values);
    if (payload && !state) {
      jobScheduleService
        .addJobSchedule(payload)
        .then(onAddJobSuccess)
        .catch(onAddJobError);
    } else if (payload && state) {
      payload.isActive = true;
      jobScheduleService
        .updateJobSchedule(payload, state.payload.id)
        .then(onUpdateJobSuccess)
        .catch(onUpdateJobError);
    }
  };

  const steps = [
    {
      label: "Job Settings",
      icon: <FaWpforms />,
      component: <JobSettingsForm formData={formData} user={user} />,
    },
    {
      label: "Job Recipient",
      icon: <FaUserCog />,
      component: (
        <JobRecipientForm formData={formData} user={user} onSubmit={onSubmit} />
      ),
    },
  ];

  return (
    <React.Fragment>
      <div className="py-4 bg-primary">
        <Row className="primary-row">
          <div className="job-org-loki-container loki-container">
            <Loki
              steps={steps}
              onNext={mergeValues}
              onBack={mergeValues}
              onFinish={onSubmit}
              backLabel={"Back"}
              nextLabel={"Next"}
              finishLabel={"Submit"}
              noActions
            />
          </div>
        </Row>
      </div>
    </React.Fragment>
  );
}

JobScheduleWizard.propTypes = {
  currentUser: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    lastName: PropTypes.string.isRequired,
    roles: PropTypes.instanceOf(Array).isRequired,
  }),
};
export default JobScheduleWizard;

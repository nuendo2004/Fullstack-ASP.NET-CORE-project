import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import Schedule from "./Schedule";
import trainingScheduleService from "services/trainingScheduleService";
import toastr from "toastr";
import logger from "sabio-debug";

const _logger = logger.extend("SchedulesList");

const SchedulesList = (props) => {
  
  const [scheduleInfo, setScheduleInfo] = useState({
    scheduleComponent: [],
  });

  useEffect(() => {
    setScheduleInfo((prevState) => {
      let si = { ...prevState };
      si.scheduleComponent = props.scheduleData?.map(mapScheduleData);
      return si;
    });
  }, [props]);

  const mapScheduleData = (schedule, index) => {
    return (
      <Schedule
        schedule={schedule}
        key={index}
        onDeleteClicked={onDeleteRequested}
      />
    );
  };

  const onDeleteRequested = useCallback((schedule) => {
    const idToBeDeleted = schedule.id;

    const handler = getDeleteSuccessHandler(idToBeDeleted);

    trainingScheduleService
      .archive(idToBeDeleted)
      .then(handler)
      .catch(onDeleteJobFail);
  }, []);

  const getDeleteSuccessHandler = () => {
    return () => {
      toastr.success("You have successfully deleted a job!", "Delete Success");
      props.setIsDeleted(true);
    };
  };

  const onDeleteJobFail = (error) => {
    _logger("deleteJob fail", error);

    toastr.error(
      "There was an error trying to delete a job",
      "Delete Unsuccessful"
    );
  };

  return (
    <Card className="h-100">
      <Card.Header className="d-flex align-items-center justify-content-between card-header-height">
        <h4 className="mb-0">{props.title}</h4>
        <Link to="#" className="btn btn-outline-white btn-sm">
          View all
        </Link>
      </Card.Header>
      <Card.Body>
        <ListGroup variant="flush">{scheduleInfo.scheduleComponent}</ListGroup>
      </Card.Body>
    </Card>
  );
};

SchedulesList.propTypes = {
  scheduleData: PropTypes.arrayOf(
    PropTypes.shape({})
  ),
  title: PropTypes.string,
  setIsDeleted: PropTypes.func,
};

export default SchedulesList;

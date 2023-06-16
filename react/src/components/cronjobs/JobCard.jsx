import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Row, Col } from "react-bootstrap";

function JobCard(props) {
  const job = props.job;

  const jobType = props.jobTypes?.find(
    (type) => type.id === job.chronJobTypeId
  );
  const dayType = props.dayTypes?.find((type) => type.id === job.daysOfWeekId);

  const formatTimeToLocal = (time) => {
    let newDate = new Date(Date.UTC(0, 0, 0, time));
    return newDate.toTimeString().slice(0, 5);
  };

  const onLocalEditClick = () => {
    props.onEditClick(job);
  };

  const runTime = formatTimeToLocal(job.utcHourToRun);

  formatTimeToLocal(job.utcHourToRun);

  return (
    <Col xl={3} lg={6} md={12} sm={12}>
      <Card className="mb-4 shadow-lg">
        <Card.Title className="d-flex flex-column align-items-center m-2">
          Job Type: {jobType?.name}
        </Card.Title>
        <Card.Text className="d-flex flex-column align-items-center gap-2 m-2">
          To: {job.recipient}
        </Card.Text>
        <Card.Text className="d-flex flex-column align-items-center gap-2 m-2">
          Day(s): {dayType.name}
        </Card.Text>
        <Card.Text className="d-flex flex-column align-items-center gap-2 m-2">
          Time running: {runTime}
        </Card.Text>
        <Row className="justify-content-center">
          <Col className="md-auto col-3 ms-auto">
            <Button
              variant="secondary"
              className="read-me-button mx-auto btn-sm m-2"
              onClick={onLocalEditClick}
            >
              Edit
            </Button>
          </Col>
          <Col className="md-auto col-3 me-auto">
            <Button
              variant="danger"
              className="read-me-button mx-auto btn-sm m-2"
            >
              Delete
            </Button>
          </Col>
        </Row>
      </Card>
    </Col>
  );
}

JobCard.propTypes = {
  job: PropTypes.shape({
    chronJobTypeId: PropTypes.number.isRequired,
    createdBy: PropTypes.number.isRequired,
    dateCreated: PropTypes.string.isRequired,
    dateModified: PropTypes.string.isRequired,
    daysOfWeekId: PropTypes.number.isRequired,
    entityTypeId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    intervalTypeId: PropTypes.number.isRequired,
    isActive: PropTypes.bool.isRequired,
    isDeleted: PropTypes.bool.isRequired,
    isRecurring: PropTypes.bool,
    modifiedBy: PropTypes.number.isRequired,
    recipient: PropTypes.string,
    recipientId: PropTypes.number,
    utcHourToRun: PropTypes.number.isRequired,
  }),
  jobTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      find: PropTypes.func.isRequired,
    })
  ),
  dayTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      find: PropTypes.func.isRequired,
    })
  ),
  onEditClick: PropTypes.func.isRequired,
};

export default JobCard;

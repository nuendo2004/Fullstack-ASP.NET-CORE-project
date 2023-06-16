import React from "react";
import propTypes from "prop-types";
import debug from "sabio-debug";
import { Col, Card } from "react-bootstrap";
import { formatDateTime } from "../../utils/dateFormater";

const _logger = debug.extend("TaskEventsCard");

function TaskEventsCard(props) {
  let taskEvent = props.taskEvent;

  _logger(taskEvent);

  return (
    <Col xl={6} lg={6} md={6} className="mb-4">
      <Card>
        <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
          <div>
            <h4 className="mb-0">Task Event Id: {taskEvent.id}</h4>
          </div>
        </Card.Header>
        <Card.Body>
          <div>
            <h4>Text:</h4>
            {taskEvent.text}
          </div>
          <div>
            <h4>Payload:</h4>
            {taskEvent.payload}
          </div>
          <div>
            <h4>Date Created:</h4>
            {formatDateTime(taskEvent.dateCreated)}
          </div>
          <div>
            <h4>Date Modified:</h4>
            {formatDateTime(taskEvent.dateModified)}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

TaskEventsCard.propTypes = {
  taskEvent: propTypes.shape({
    createdBy: propTypes.number.isRequired,
    dateCreated: propTypes.string.isRequired,
    dateModified: propTypes.string.isRequired,
    entityId: propTypes.number.isRequired,
    isBoolValue: propTypes.bool.isRequired,
    entityType: propTypes.shape({
      id: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
    }).isRequired,
    id: propTypes.number.isRequired,
    modifiedBy: propTypes.number.isRequired,
    numericValue: propTypes.number,
    payload: propTypes.string.isRequired,
    taskEventType: propTypes.shape({
      id: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
    }).isRequired,
    zoneId: propTypes.number.isRequired,
    text: propTypes.string.isRequired,
  }),
};
export default TaskEventsCard;

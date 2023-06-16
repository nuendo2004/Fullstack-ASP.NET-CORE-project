import React from "react";
import { Link } from "react-router-dom";
import { ListGroup, Col, Row, Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Schedule = (props) => {
  const navigate = useNavigate();
  const schedule = props.schedule;
  const index = props.index;

  const onLocalDeleteClicked = (e) => {
    props.onDeleteClicked(schedule, e);
  };

  const onLocalEditClicked = () => {
    navigateToEditPage(schedule);
  };

  const navigateToEditPage = (scheduleData) => {
    const state = {
      type: "SCHEDULE_EDIT",
      payload: scheduleData,
    };
    navigate(`/trainingscheduleform/${schedule.id}`, { state });
  };
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </Link>
  ));
  const ActionMenu = () => {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle}>
            <i className="fe fe-more-vertical text-muted"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu align="end">
            <Dropdown.Header>SETTINGS</Dropdown.Header>
            <Dropdown.Item eventKey="1" onClick={onLocalEditClicked}>
              <i className="fe fe-edit dropdown-item-icon"></i> Edit
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={onLocalDeleteClicked}>
              <i className="fe fe-trash dropdown-item-icon"></i> Remove
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  };

  const startDate = new Date(schedule.startDate);

  startDate.setDate(startDate.getDate());

  const newStartDateFormat = startDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  });

  const endDate = new Date(schedule.endDate);

  endDate.setDate(endDate.getDate());

  const newEndDateFormat = endDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  });
  return (
    <ListGroup.Item className={`px-0 ${index === 0 ? "pt-0" : ""}`}>
      <Row>
        <Col className="ps-0">
          <Link to="#">
            <h5 className="text-primary-hover ms-1 ps-2">{schedule.name}</h5>
          </Link>
          <div className="d-flex align-items-center">
            <span className="fs-6 ms-1 ps-2">{`${newStartDateFormat} - ${newEndDateFormat}`}</span>
          </div>
        </Col>
        <Col className="col-auto">
          <ActionMenu />
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

Schedule.propTypes = {
  schedule: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }),
  index: PropTypes.number,
  title: PropTypes.string,
  children: PropTypes.func,
  onClick: PropTypes.func,
  onDeleteClicked: PropTypes.func,
};

export default React.memo(Schedule);

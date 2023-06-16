import React from "react";
import PropTypes from "prop-types";
import debug from "sabio-debug";
import { useNavigate } from "react-router-dom";
import { Card, Button, Col } from "react-bootstrap";
const _logger = debug.extend("TrainingUnitsOrgCard");

function TrainingUnitsOrgCard(props) {
  const navigate = useNavigate();

  _logger("propssTrainingUnitsOrgCard props: ", props);

  const onEditTrainigUnitsOrgClicked = () => {
    const editPayload = {
      type: "Edit_TrainingUnit",
      payload: props.trainingUnitData,
    };
    navigate(`/trainingunit/${props.trainingUnitData.id}/edit`, {
      state: editPayload,
    });
  };
  const onViewDetailsClicked = () => {
    _logger("onViewDetailsClicked");
  };
  return (
    <React.Fragment>
      <Col lg={3}>
        <Card
          style={{ width: "18rem", height: "400px" }}
          className=" text-white bg-dark mb-2"
        >
          <Card.Img
            src="https://bit.ly/3NA6GlI"
            className="card-img-top"
            alt="..."
          />
          <Card.Body className="text-wrap">
            <Card.Title className="text-white mb-3">
              Name: {props.trainingUnitData.name}
            </Card.Title>
            <Card.Title className="text-white mb-3">
              Organization: {props.trainingUnitData.organization.name}
            </Card.Title>
            <Card.Subtitle className="text-white mb-3">
              Status: {props.trainingUnitData.trainingStatusId.name}
            </Card.Subtitle>
            <Card.Subtitle className="text-white mb-3">
              Trainer: {props.trainingUnitData.primaryTrainerId.firstName}{" "}
              {props.trainingUnitData.primaryTrainerId.lastName}
            </Card.Subtitle>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-1">
              <Button size={"sm"} onClick={onEditTrainigUnitsOrgClicked}>
                Edit
              </Button>
              <Button size={"sm"} onClick={onViewDetailsClicked}>
                View Details
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
}

TrainingUnitsOrgCard.propTypes = {
  trainingUnitData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    primaryTrainerId: PropTypes.shape({
      id: PropTypes.number,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
    organization: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    description: PropTypes.string,
    trainingStatusId: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
};

export default TrainingUnitsOrgCard;

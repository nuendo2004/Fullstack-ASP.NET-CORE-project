import React from "react";
import PropTypes from "prop-types";
import debug from "sabio-debug";
import { Card, Col } from "react-bootstrap";
const _logger = debug.extend("TrainingUnitTraineeCard");

function TrainingUnitTraineeCard(props) {
  _logger("propssTraineeCard props: ", props);

  return (
    <React.Fragment>
      <Col lg={3}>
        <Card
          style={{ width: "18rem", height: "400px" }}
          className=" text-white bg-dark mb-3"
        >
          <Card.Body className="text-wrap">
            <Card.Title className="text-white mb-3">
              Trainee:{props.traineeTrainingUnitData.trainingUnits.description}
            </Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
}

TrainingUnitTraineeCard.propTypes = {
  traineeTrainingUnitData: PropTypes.shape({
    trainingUnits: PropTypes.shape({
      description: PropTypes.string,
    }),
  }),
};

export default TrainingUnitTraineeCard;

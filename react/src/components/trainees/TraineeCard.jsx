import React, { useState } from "react";
import debug from "sabio-debug";
import { PropTypes } from "prop-types";
import { Card, Image, Col } from "react-bootstrap";
import { Fragment } from "react";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";
import "../trainees/trainees.css";
const _logger = debug.extend("TraineeCard");

function TraineeCard(props) {
  const aTrainee = props.trainee;
  const [isOpen, setIsOpen] = useState(false);

  _logger(aTrainee);

  const onToggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Fragment>
      <Col lg={3} md={4}>
        <Card className="mb-3 trainee-card ">
          <Card.Body>
            <div className="text-center">
              <Image
                src={aTrainee.user.avatarUrl}
                className="rounded-circle avatar-xl mb-3"
                alt=""
              />
              <h4 className="trainee-title mb-0">
                {aTrainee.trainingUnits.name}
              </h4>
              <p className="mb-0 fs-6 text-muted">
                {aTrainee.traineeStatus.name}
              </p>
            </div>
            <div className="trainees-organization d-flex justify-content-between border-bottom py-2 mt-6">
              <span className="text-warning">{aTrainee.organization.name}</span>
            </div>
            <div className=" trainee-card-text trainees-email d-flex justify-content-between pt-2">
              <Card.Text className="trainee-emailfont text-dark">
                {aTrainee.user.email}
              </Card.Text>
            </div>
            <div className="trainee-description d-flex justify-content-between border-bottom py-2 mt-4">
              <span className="text-dark">
                {aTrainee.organization.description.substring(0, 50) + "..."}
              </span>
            </div>
            <div className="trainee-card-button">
              <button
                onClick={onToggleModal}
                className="trainees-showmore btn btn-outline-primary mt-3"
              >
                Show More
              </button>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Modal show={isOpen}>
        <div className="file-modal-container">
          <ModalHeader className="file-modal-title">
            <span className="file-modal-close" onClick={onToggleModal}>
              <XCircle className="showmore-exitbutton"></XCircle>
            </span>
          </ModalHeader>
          <ModalBody className="file-section-container">
            <Card.Body>
              <div className="text-center">
                <Image
                  src={aTrainee.user.avatarUrl}
                  className="rounded-circle avatar-xl mb-3"
                  alt=""
                />
                <h4 className="mb-0">{aTrainee.trainingUnits.name}</h4>
                <p className="mb-0 fs-6 text-muted">
                  {aTrainee.traineeStatus.name}
                </p>
              </div>
              <div className="d-flex justify-content-between border-bottom py-2 mt-4">
                <span className="text-dark">
                  {aTrainee.organization.description}
                </span>
              </div>
              <div className="d-flex justify-content-between border-bottom py-2">
                <span>Organization</span>
                <span className="text-warning">
                  {aTrainee.organization.name}
                </span>
              </div>
              <div className="d-flex justify-content-between pt-2">
                <span>Email</span>
                <span className="text-dark">{aTrainee.user.email}</span>
              </div>
            </Card.Body>
          </ModalBody>
        </div>
      </Modal>
    </Fragment>
  );
}

export default React.memo(TraineeCard);

TraineeCard.propTypes = {
  trainee: PropTypes.shape({
    id: PropTypes.number.isRequired,

    trainingUnits: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    traineeStatus: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    organization: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      businessPhone: PropTypes.string.isRequired,
      logoUrl: PropTypes.string.isRequired,
    }),
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }),
  }),
};

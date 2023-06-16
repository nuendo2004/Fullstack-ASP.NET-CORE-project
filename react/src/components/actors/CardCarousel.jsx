import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import Modal from "react-modal";
import "./actors.css";

import debug from "sabio-debug";
const _logger = debug.extend("actorCardRender");

function ActorCardV2(props) {
  const actor = props.card;
  _logger("actorCardRenderV2----->", actor);
  const [modalIsOpen, setIsOpen] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const onClickPrev = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage
      ? actor.actorAccounts.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const onClickNext = () => {
    const isLastImage = currentIndex === actor.actorAccounts.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "black";
  }

  function closeModal() {
    setIsOpen(false);
  }

  let subtitle;

  const customStyles = {
    content: {
      width: "30%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const navigate = useNavigate();

  const goToPage = (e) => {
    let actorPage = e.currentTarget.dataset.page;
    const stateForTransport = { type: "Actor_Update", payload: actor };
    navigate(actorPage, { state: stateForTransport });
  };

  const onLocalDeleteRequest = (e) => {
    e.preventDefault();
    props.onActorClick(actor, e);
  };

  return (
    <React.Fragment>
      <Card className="mb-4 shadow-l">
        <Card.Body className="actor-body" key={"List-A" + actor.id}>
          <img
            className="actor-card-img-top"
            src={actor.actorAccounts[currentIndex].avatarUrl}
            alt="images"
            key={actor.actorAccounts[currentIndex].id}
          />
          <Card.Text className="d-flex flex-column align-items-center">
            <strong>Actor-Name:</strong> <b />
            {actor.name}
          </Card.Text>

          <Card.Text className="d-flex flex-column gap-2 align-items-center">
            <strong>Associated Actor Account:</strong> <b />
            {actor.actorAccounts[currentIndex].userName}
          </Card.Text>

          <div className="row d-flex ipad-row">
            <div className="col-md-6 d-flex justify-content-between my-2 ipad-btn">
              <Button
                variant="primary"
                className="read-me-button mx-auto btn-sm"
                id="newActor"
                data-page="/actorwizard"
                onClick={goToPage}
              >
                Edit
              </Button>
              <Button className="btn-sm modal-button" onClick={openModal}>
                View More
              </Button>
              <Button
                className="read-me-button mx-auto btn-danger btn-sm d-flex justify-content-end"
                onClick={onLocalDeleteRequest}
              >
                Delete
              </Button>
            </div>
            {actor.actorAccounts.length > 1 ? (
              <div className="row d-flex arrow rows mt-2">
                <div className="col-md-6 d-flex justify-content-start">
                  <button
                    className="btn btn-sm btn-success"
                    onClick={onClickPrev}
                  >
                    &#10094;
                  </button>
                </div>
                <div className="col-md-6 d-flex justify-content-end">
                  <button
                    className="btn btn-sm btn-success"
                    onClick={onClickNext}
                  >
                    &#10095;
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </Card.Body>
      </Card>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <img
          className="modal-card-img-top"
          src={actor.actorAccounts[currentIndex].avatarUrl}
          alt="Person Profile"
        />
        <h1
          ref={(_subtitle) => (subtitle = _subtitle)}
          className="d-flex justify-content-center"
        >
          {actor.consequence.name}
        </h1>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <p className="d-flex flex-column align-items-center">
            <strong> Zone: </strong> <br />
            {actor.consequence.zoneId.name}
          </p>

          <p className="d-flex flex-column align-items-center">
            <strong> Zone-Description: </strong> <br />
            {actor.consequence.zoneId.description}
          </p>
        </div>
        <div className="row d-flex flex-row justify-content-end actor-modal-btn-row">
          <button
            type="button"
            className="btn btn-success btn-md actor-modal-btn"
            onClick={closeModal}
          >
            close
          </button>
        </div>
      </Modal>
    </React.Fragment>
  );
}

ActorCardV2.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    createdBy: PropTypes.number,
    modifiedBy: PropTypes.number,
    description: PropTypes.string.isRequired,
    actorTypeId: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
    statusTypeId: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
    actorAccounts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        userName: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string.isRequired,
        zone: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
    consequence: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      consequenceType: PropTypes.shape({
        id: PropTypes.number.isRequired,
      }).isRequired,
      zoneId: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  onActorClick: PropTypes.func.isRequired,
};

export default ActorCardV2;

import React, { useState } from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

import debug from "sabio-debug";
const _logger = debug.extend("ActorReviewCard");
function ActorReview(props) {
  const actor = props.formData;
  _logger("Review Card actor.actorAccounts index0--->", actor);

  //TODO MAKE LOOK PRETTY

  const [currentIndex, setCurrentIndex] = useState(0);

  const onClickPrev = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage
      ? actor.actorAccount.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const onClickNext = () => {
    const isLastImage = currentIndex === actor.actorAccount.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const { values, onFinish, onBack, backLabel } = props;

  const handleSubmit = () => {
    onFinish(props.formData);
  };

  const handleBack = () => {
    onBack(values);
  };

  return (
    <React.Fragment>
      <div className="col d-flex justify-content-evenly mx-auto">
        <Card className="mb-4 shadow-l mt-8">
          <Card.Body className="actor-body" key={"List-A" + actor.userName}>
            <img
              className="actor-card-img-top"
              src={actor.actorAccount[currentIndex].avatarUrl}
              alt="images"
              key={actor.actorAccount[currentIndex]}
            />
            <div className="row">
              <div className="col-md-6">
                <Card.Text className="d-flex flex-column align-items-center">
                  <strong>Actor Name:</strong> <b />
                  {actor.actorName}
                </Card.Text>
              </div>
              <div className="col-md-6">
                <Card.Text className="d-flex flex-column align-items-center">
                  <strong>Consequence Name:</strong> <b />
                  {actor.conName}
                </Card.Text>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Card.Text className="d-flex flex-column align-items-center">
                  <strong>Accounts:</strong> <b />
                  {actor.actorAccount[currentIndex].userName}
                </Card.Text>
              </div>
              <div className="col-md-6">
                <Card.Text className="d-flex flex-column align-items-center">
                  <strong> Description:</strong> <b />
                  {actor.conDescription}
                </Card.Text>
              </div>
            </div>
            <div className="row d-flex ipad-row">
              {actor.actorAccount.length > 1 ? (
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
            <div className="row m-2">
              <div className="col-6">
                <button
                  onClick={handleBack}
                  className="btn btn-xs btn-primary"
                >
                  {backLabel}
                </button>
              </div>
              {/* SET THE MARGIN ON THIS BUTTON */}
              <div className="col-6 d-flex justify-content-end m-0 p-0">
                <button
                  onClick={handleSubmit}
                  className="btn btn-xs btn-success"
                >
                  Submit
                </button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </React.Fragment>
  );
}

ActorReview.propTypes = {
  currentUser: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    lastName: PropTypes.string.isRequired,
    roles: PropTypes.instanceOf(Array).isRequired,
  }).isRequired,
  values: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    actorName: PropTypes.string.isRequired,
    actorDescription: PropTypes.string.isRequired,
    conName: PropTypes.string.isRequired,
    conDescription: PropTypes.string.isRequired,
    actorAccount: PropTypes.arrayOf(
      PropTypes.shape({
        userName: PropTypes.string.isRequired,        
        avatarUrl: PropTypes.string.isRequired,
        accountStatusId: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
  formData: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    actorName: PropTypes.string.isRequired,
    actorDescription: PropTypes.string.isRequired,
    conName: PropTypes.string.isRequired,
    conDescription: PropTypes.string.isRequired,
    actorAccount: PropTypes.arrayOf(
      PropTypes.shape({
        userName: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string.isRequired,
        accountStatusId: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
  handleSubmit: PropTypes.func,
  onBack: PropTypes.func,
  onFinish: PropTypes.func,
  handleChange: PropTypes.func,
  isSubmitting: PropTypes.bool,
  backLabel: PropTypes.string,
  nextLabel: PropTypes.string,
  onHomeClicked: PropTypes.func,
  mergeValues: PropTypes.func,
};

export default ActorReview;

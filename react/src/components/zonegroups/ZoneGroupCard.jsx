import React, { useState } from "react";
import PropTypes from "prop-types";
import "../zonegroups/zonegroup.css";
import { Button } from "react-bootstrap";
import toastr from "toastr";
import traineeGroupsService from "../../services/traineeGroupsService";

import debug from "sabio-debug";
const _logger = debug.extend("ZoneGroupCard");

const ZoneGroupCard = (props) => {
  _logger("props", props);
  const zoneGroup = props.zoneGroup;
  _logger(zoneGroup.imageUrl, "ZoneGroup imgUrl");

  const [traineeGroupData, setTraineeGroupData] = useState({
    traineeId: 26,
    groupId: "",
  });

  const onJoin = () => {
    let payload = traineeGroupData;
    _logger(payload, "onJoin");
    payload.groupId = zoneGroup.id;
    payload.groupId = parseInt(payload.groupId);

    traineeGroupsService
      .addTraineeGroup(payload)
      .then(onJoinSuccess)
      .catch(onJoinError);
  };

  const onJoinSuccess = (response) => {
    handleShow();
    setTraineeGroupData((prevState) => {
      const addNewTraineeGroup = { ...prevState };
      addNewTraineeGroup.id = response.item;
      return addNewTraineeGroup;
    });
    _logger("add success", response);
    toastr.success("Zone Group Successfully Joined!");
  };

  const onJoinError = (error) => {
    _logger("add error", error);
    toastr.error("Error: Failed to Join Zone Group");
  };

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <React.Fragment>
      <div className="col-md-3">
        <div className="card text-white bg-dark mb-3">
          <img
            src={zoneGroup.imageUrl}
            className="zonegroup-card-img-top"
            alt="Not Found"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src =
                "https://sabio-training.s3-us-west-2.amazonaws.com/immersed8eb0f6f0-18ef-4ad9-840d-fe04923f1c12/Fast-spaceship.jpg";
            }}
          />
          <div
            className="card-header border-primary pb-3 bg-dark text-center zonegroup-card-section"
            style={{ height: 100 }}
          >
            <h2 className="card-title text-white">
              <a
                className=" text-white text-inherit"
                href="/zonegroupview/overview"
              >
                {zoneGroup.name}
              </a>
            </h2>
            <span className="text-muted fs-4">ID: #{zoneGroup.id}</span>
          </div>
          <div className="card-body pt-3">
            <div className="card-text" style={{ height: "5vh" }}>
              <span className="fw-bolder">Description :</span>{" "}
              <span className="fst-italic">{zoneGroup.description}</span>
            </div>
            <div className="d-flex justify-content-between pt-3">
              <span className="fw-bolder">Captain :</span>
              <span>Mr. Sanchez</span>
            </div>
            <div className="d-flex justify-content-between pt-3">
              <span className="fw-bolder">Crewmates :</span>
              <span>12</span>
            </div>
            <div className="d-flex justify-content-between pt-3 pb-0">
              <span className="fw-bolder">Galaxy :</span>
              <span>Space Invaders</span>
            </div>
          </div>
          <div className="card-footer border-primary pb-3 text-center bg-dark pt-2">
            <div
              className="d-grid gap-2 d-md-block pt-3 pb-2"
              style={{ display: "flex" }}
            >
              <Button
                variant="primary"
                className="me-2"
                style={{ width: "6.5vw" }}
                href="/zonegroupview/overview"
              >
                View
              </Button>
              :
              {show ? (
                <Button
                  show={setShow}
                  variant="primary"
                  className="ms-2"
                  id="leave"
                  style={{ width: "6.5vw" }}
                  onClick={onJoin}
                >
                  Leave
                </Button>
              ) : (
                <Button
                  variant="primary"
                  className="ms-2"
                  id="join"
                  style={{ width: "6.5vw" }}
                  onClick={onJoin}
                >
                  Join
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

ZoneGroupCard.propTypes = {
  zoneGroup: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    zoneId: PropTypes.number.isRequired,
    entityTypeId: PropTypes.number.isRequired,
    groupAdminId: PropTypes.number.isRequired,
    createdBy: PropTypes.number.isRequired,
  }),
};

export default ZoneGroupCard;

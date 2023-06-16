import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import zoneMainRoutes from "./zoneMainRoutes";
import { useMemo } from "react";
import { ArrowLeft, XLg } from "react-bootstrap-icons";
import { useState } from "react";
import "./zonemain.css";
import logger from "sabio-debug";

const _logger = logger.extend("TicTacToeMain");

const ZoneMain = ({ currentUser }) => {
  const zoneParams = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentState, setCurrentState] = useState();

  useEffect(() => {
    _logger("location", location);
    if (location.state.payload && location.state.type === "ZONE_PARAMS") {
      setCurrentState(location.state.payload);
    }
  });

  const currentMain = useMemo(() => {
    const zoneMainId = zoneParams?.id;

    const result = zoneMainRoutes.find(
      (item) => item.id === parseInt(zoneMainId)
    );

    return result;
  }, [zoneParams?.id]);

  const navigateToExit = () => {
    navigate("/transit");
  };

  const navigateToMenu = () => {
    navigate(`/zones/${zoneParams.id}/menu`);
  };

  return (
    <div className="position-relative">
      <div className="row mb-1">
        <div className="col-11">
          <button
            type="button"
            className="btn btn-primary"
            onClick={navigateToMenu}
          >
            <ArrowLeft color="white" size={30} />
          </button>
        </div>
        <div className="col">
          <button
            type="button"
            className="btn btn-primary"
            onClick={navigateToExit}
          >
            <XLg color="white" size={30} />
          </button>
        </div>
      </div>

      <div className="zonemain-center">
        {
          <currentMain.element
            currentUser={currentUser}
            payload={currentState}
          />
        }
      </div>
    </div>
  );
};

export default ZoneMain;

ZoneMain.propTypes = {
  currentUser: propTypes.shape({
    id: propTypes.number,
    email: propTypes.string,
    firstName: propTypes.string,
    isLoggedIn: propTypes.bool,
    roles: propTypes.arrayOf(propTypes.string),
    currentTraineeId: propTypes.number,
  }).isRequired,
};

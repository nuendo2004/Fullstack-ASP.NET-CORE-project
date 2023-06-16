import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import zoneMenuRoutes from "./zoneMenuRoutes";
import { useMemo } from "react";
import { ArrowLeft } from "react-bootstrap-icons";

const ZoneMenu = ({ currentUser }) => {
  const navigate = useNavigate();
  const zoneParams = useParams();
  const currentMenu = useMemo(() => {
    const zoneId = zoneParams?.id;
    const result = zoneMenuRoutes.find((item) => item.id === parseInt(zoneId));
    return result;
  }, [zoneParams?.id]);

  const navigateToZoneMain = (payload) => {
    const stateForTransport = { type: "ZONE_PARAMS", payload };
    navigate(`/zones/${zoneParams.id}/main`, {
      state: stateForTransport,
    });
  };

  const navigateToZoneTransit = () => {
    navigate("/transit");
  };

  return (
    <div className="position-relative">
      <div className="position-relative top-100 start-0 mb-1">
        <button
          type="button"
          className="btn btn-primary"
          onClick={navigateToZoneTransit}
        >
          <ArrowLeft color="white" size={30} />
        </button>
      </div>
      <div>
        {
          <currentMenu.element
            currentUser={currentUser}
            navigateToZoneMain={navigateToZoneMain}
          />
        }
      </div>
    </div>
  );
};

export default ZoneMenu;

ZoneMenu.propTypes = {
  currentUser: propTypes.shape({
    id: propTypes.number,
    email: propTypes.string,
    firstName: propTypes.string,
    isLoggedIn: propTypes.bool,
    roles: propTypes.arrayOf(propTypes.string),
    currentTraineeId: propTypes.number,
  }).isRequired,
};

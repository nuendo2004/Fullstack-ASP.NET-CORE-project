import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Logo from "assets/images/brand/logo/immersed-spiral-logo.png";
import "./displayzones.css";

function ZoneCard(props) {
  const aZone = props.zone;

  return (
    <div className="item px-md-1 transit-zone-card">
      <div className="mb-4 card-hover mx-2 card">
        <Link to={`/zones/${aZone.id}/entry`}>
          <img
            src={aZone.imageUrl || Logo}
            alt="zoneLogo"
            className="card-img-top rounded-top-md zone-card-img "
          />
        </Link>
        <div className="zone-card-body">
          <h3 className="mb-2 text-truncate-line-2 text-center mt-2">
            {aZone.name}
          </h3>
          <ul className="mb-3 list-inline ">
            <li className="zone-list-description ml-10 mr-10 text-center">
              {aZone.description}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

ZoneCard.propTypes = {
  zone: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }),
};

export default ZoneCard;

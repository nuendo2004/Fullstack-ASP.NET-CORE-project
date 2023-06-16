import React, { useState, useEffect, useRef } from "react";
import zonesService from "../../services/zonesServices";
import ZoneCard from "components/zonescomp/ZoneCard";
import toastr from "toastr";
import Slider from "react-slick";
import "./displayzones.css";
import "./transitzonecarousel.scss";
import ZoneLogger from "components/zonetracker/ZoneLogger";
import propTypes from "prop-types";

function DisplayZone({ currentUser }) {
  const [zones, setZones] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    zonesService.getAll().then(onDisplaySuccess).catch(onDisplayError);
  }, []);

  const onDisplaySuccess = (response) => {
    const allZones = response.items;
    const filteredZones = allZones.filter(
      (zone) => zone.id !== 1 && zone.id !== 2 && zone.id !== 3 && zone.id !== 4
    );

    const mapZones = (zone) => (
      <div key={zone.id} className="px-3">
        <ZoneCard zone={zone} />
      </div>
    );

    function renderZoneCards(filteredZones) {
      const zoneCards = filteredZones.map(mapZones);
      return zoneCards;
    }

    setZones(renderZoneCards(filteredZones));
  };

  const onDisplayError = () => {
    toastr.error("Zone unable to load");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerMode: true,
    centerPadding: "0",
    nextArrow: (
      <button className="slick-arrow transit-zone-slick-next">Next</button>
    ),
    prevArrow: <button className="slick-arrow-transit-zone-prev">Prev</button>,
  };

  return (
    <React.Fragment>
      <ZoneLogger entityId={currentUser.currentTraineeId} />
      <div className="container-fluid p-1 transit-zone-header bg-primary">
        <div className="align-items-center row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="py-4 py-md-1">
              <h5 className="mb-1 text-white display-4 text-center">
                Transit Zone
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div className="transit-zone-carousel-container">
        <div className="mb-4 row"></div>
        <div className="position-relative">
          <Slider ref={sliderRef} {...settings}>
            {zones}
          </Slider>
        </div>
      </div>
    </React.Fragment>
  );
}

DisplayZone.propTypes = {
  currentUser: propTypes.shape({
    currentTraineeId: propTypes.number.isRequired,
  }),
};

export default DisplayZone;

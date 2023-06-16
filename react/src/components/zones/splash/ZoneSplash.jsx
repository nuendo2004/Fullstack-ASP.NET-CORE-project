import React from "react";
import { useEffect, useState } from "react";
import zonesService from "services/zonesServices";
import toastr from "toastr";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getTraineeAccountsByTraineeIdandZoneId } from "services/traineeAccountsService";
import PropTypes from "prop-types";
import "./zonesplash.css";

function ZoneSplash(props) {
  const zoneParams = useParams();
  const [pageData, setPageData] = useState({
    zoneId: zoneParams.id,
    zoneName: "",
    zoneImageUrl: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    zonesService
      .getZoneById(pageData.zoneId)
      .then(onGetZoneByIdSuccess)
      .catch(onGetZoneByIdErr);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getTraineeAccountsByTraineeIdandZoneId(
        props.currentUser.currentTraineeId,
        pageData.zoneId
      )
        .then(takeToLoginPage)
        .catch(takeToRegisterPage);
    }, 5000);
  }, [pageData.zoneName]);

  const takeToRegisterPage = (error) => {
    if (error.response.status === 404) {
      const navigateToRegisterPage = (payload) => {
        const stateForTransport = { type: "ZONE_PARAMS", payload };
        navigate(`/zones/${pageData.zoneId}/register`, {
          state: stateForTransport,
        });
      };
      navigateToRegisterPage(pageData);
    } else {
      toastr.error("Error going to registration!", error);
    }
  };

  const takeToLoginPage = () => {
    const navigateToLoginPage = (payload) => {
      const stateForTransport = { type: "ZONE_PARAMS", payload };
      navigate(`/zones/${pageData.zoneId}/logins`, {
        state: stateForTransport,
      });
    };
    navigateToLoginPage(pageData);
  };

  const onGetZoneByIdSuccess = (response) => {
    setPageData({
      ...pageData,
      zoneName: response.item.name,
      zoneImageUrl: response.item.imageUrl,
    });
  };

  const onGetZoneByIdErr = (err) => {
    toastr.error("There was an error fetching data for zone", err);
  };

  return (
    <div>
      <div className="bg">
        <div className="header__body">
          <div className="header">
            <div className="d-flex justify-content-center">
              <img src={pageData.zoneImageUrl} alt="Header" />
            </div>
          </div>
          <h1 className="zone-splash">{pageData.zoneName}</h1>
        </div>
      </div>
    </div>
  );
}

ZoneSplash.propTypes = {
  currentUser: PropTypes.shape({
    currentTraineeId: PropTypes.number.isRequired,
  }),
};

export default ZoneSplash;

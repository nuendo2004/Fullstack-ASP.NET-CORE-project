import React, { useEffect } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import sessionService from "../../services/sessionService";
import debug from "sabio-debug";
import toastr from "toastr";

const _logger = debug.extend("SessionObj");

function BeforeSuccess() {
  let [searchParams] = useSearchParams();
  _logger(searchParams);
  let navigate = useNavigate();
  let location = useLocation();
  let sessionId = searchParams.get("session_id");
  _logger(sessionId);
  useEffect(() => {
    sessionService
      .addSubscriptionData(sessionId)
      .then(onGetSessionData)
      .catch(onGetSessionError);
  }, []);

  const onGetSessionData = (response) => {
    let params = new URLSearchParams(location.search);
    let paramObj = {};
    params.forEach((value, key) => {
      _logger("url params", key, value);
      paramObj[key] = value;
    });
    _logger("Session Added: ", location, response);
    const stateForTransport = {
      type: "STRIPE_SESSION",
      state: paramObj,
    };
    navigate("/invoice", { state: stateForTransport });
  };

  const onGetSessionError = (error) => {
    if (error) {
      _logger(error.message);
      toastr.error("Something went wrong!", "Checkout Failed!");
    }
  };

  return (
    <div className="text-align-center">
      <h1>Loading page...</h1>
    </div>
  );
}

export default BeforeSuccess;

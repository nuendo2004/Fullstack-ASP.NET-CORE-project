import React from "react";
import swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import userService from "services/userService";

import debug from "sabio-debug";
const _logger = debug.extend("LogoutConsequence");

function LogoutConsequence() {
  const navigate = useNavigate();
  swal
    .fire({
      title: "You've been infected!",
      text: "It's not a good idea to click links from strangers!",
      icon: "error",
      confirmButtonText: "Continue",
    })
    .then(() => {
      userService.logoutUser().then(onLogoutSuccess).catch(onLogoutError);
    });

  function onLogoutSuccess() {
    navigate("/");
  }
  function onLogoutError(error) {
    _logger("There was an error", error);
  }
  return <></>;
}

export default LogoutConsequence;

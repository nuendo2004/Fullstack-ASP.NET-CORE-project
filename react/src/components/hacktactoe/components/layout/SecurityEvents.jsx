import Swal from "sweetalert2";
import { createSecurityEvent } from "../../../../services/securityEventsService";
import debug from "sabio-debug";
import { v4 as uuid } from "uuid";

const _logger = debug.extend("tto");

const securityEventOne = (uid, currentUser) => {
  Swal.fire({
    title: "DANGER!",
    text: `Your system has been compromised ${uid}`,
    icon: "error",
    confirmButtonText: "Delete all files",
  });
  const payload = {
    zoneId: 3,
    token: uid,
    traineeId: currentUser.id,
    trainingUnitId: 3,
    traineeAccountId: 3,
    createdById: currentUser.id,
  };
  createSecurityEvent(payload);
};
const securityEventTwo = (uid, currentUser, callback) => {
  const payload = {
    zoneId: 3,
    token: uid,
    traineeId: currentUser.id,
    trainingUnitId: 3,
    traineeAccountId: 3,
    createdById: currentUser.id,
  };
  createSecurityEvent(payload);
  callback();
};

const securityEventThree = (uid, currentUser, callback) => {
  const payload = {
    zoneId: 3,
    token: uid,
    traineeId: currentUser.id,
    trainingUnitId: 3,
    traineeAccountId: 3,
    createdById: currentUser.id,
  };
  createSecurityEvent(payload);
  for (let i = 0; i < 20; i++) {
    _logger("Hacking Opponent...", uuid());
  }
  callback();
  _logger("Operation Success");
};
const securityEventFour = (uid, currentUser) => {
  Swal.fire({
    title: "DANGER!",
    text: `Your system has been compromised by: ${currentUser?.firstName} ${uid}`,
    icon: "error",
    confirmButtonText: "Delete all files",
  });
  const payload = {
    zoneId: 3,
    token: uid,
    traineeId: currentUser.id,
    trainingUnitId: 3,
    traineeAccountId: 3,
    createdById: currentUser.id,
  };
  createSecurityEvent(payload);
  let color = document.getElementsByClassName("tto-wrapper")[0];
  if (color.style.backgroundColor !== "red") {
    document.getElementsByClassName("tto-wrapper")[0].style.backgroundColor =
      "red";
  } else {
    document.getElementsByClassName("tto-wrapper")[0].style.backgroundColor =
      "white";
  }
};

const securityEventFive = (uid, currentUser) => {
  Swal.fire({
    title: "COUNTER!",
    text: `Your system has been counter hacked by: ${currentUser?.firstName} ${uid}`,
    icon: "error",
    confirmButtonText: "Delete all files",
  });
  const payload = {
    zoneId: 3,
    token: uid,
    traineeId: currentUser.id,
    trainingUnitId: 3,
    traineeAccountId: 3,
    createdById: currentUser.id,
  };
  createSecurityEvent(payload);
  let color = document.getElementsByClassName("tto-wrapper")[0];
  if (color.style.backgroundColor !== "blue") {
    document.getElementsByClassName("tto-wrapper")[0].style.backgroundColor =
      "blue";
  }
};

const securityEventSix = (uid, currentUser, callback) => {
  Swal.fire({
    title: "Shields Raised!",
    text: `Your system has defenses set`,
    icon: "success",
    confirmButtonText: "Protect all files",
  });
  const payload = {
    zoneId: 3,
    token: uid,
    traineeId: currentUser.id,
    trainingUnitId: 3,
    traineeAccountId: 3,
    createdById: currentUser.id,
  };
  createSecurityEvent(payload);
  let color = document.getElementsByClassName("tto-wrapper")[0];
  if (color.style.backgroundColor !== "green") {
    document.getElementsByClassName("tto-wrapper")[0].style.backgroundColor =
      "green";
  }
  callback();
};

const securityEventSeven = (uid, currentUser) => {
  Swal.fire({
    title: "MOVES DELETED!",
    text: `Your moves have been deleted by: ${currentUser?.firstName} ${uid}`,
    icon: "error",
    confirmButtonText: "OK",
  });
  const payload = {
    zoneId: 3,
    token: uid,
    traineeId: currentUser.id,
    trainingUnitId: 3,
    traineeAccountId: 3,
    createdById: currentUser.id,
  };
  createSecurityEvent(payload);
};

export {
  securityEventOne,
  securityEventTwo,
  securityEventThree,
  securityEventFour,
  securityEventFive,
  securityEventSix,
  securityEventSeven,
};

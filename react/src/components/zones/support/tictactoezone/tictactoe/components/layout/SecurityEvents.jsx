import Swal from "sweetalert2";
import { createSecurityEvent } from "../../../../../../../services/securityEventsService";

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
  for (let i = 0; i < 20; i++) {}
  callback();
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

export {
  securityEventOne,
  securityEventTwo,
  securityEventThree,
  securityEventFour,
};

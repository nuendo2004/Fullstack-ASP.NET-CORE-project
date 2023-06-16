import * as Yup from "yup";

const traineeAccountRecoverySchema = Yup.object().shape({
  zoneId: Yup.number().min(1, "Zone is required").required("Zone is required"),
  traineeAccountId: Yup.number()
    .min(1, "Username is required")
    .required("Username is required"),
  currentPassword: Yup.string()
    .min(8, "Must Contain 8 Characters")
    .required("Current Password is required"),
  newPassword: Yup.string()
    .min(8, "Must Contain 8 Characters")
    .required("New Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Must Match New Password")
    .required("Password Confirmation Required"),
});

export default traineeAccountRecoverySchema;

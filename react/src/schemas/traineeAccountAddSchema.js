import * as Yup from "yup";

const traineeAccountAddSchema = Yup.object().shape({
  username: Yup.string().min(6).max(30).required("Minimum 6 characters required"),
  password: Yup.string().min(6).max(30).required("Password is required")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  ),
  avatarUrl: Yup.string().required("Required"),
  zoneId: Yup.number().required("Required"),
  traineeId: Yup.number().required("Required"),
});

export default traineeAccountAddSchema;

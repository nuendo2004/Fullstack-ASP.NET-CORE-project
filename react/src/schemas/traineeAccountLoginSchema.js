import * as Yup from "yup";

const traineeAccountLoginSchema = Yup.object().shape({
    username: Yup.string().min(6).max(30).required("username required"),
    password: Yup.string().min(6).max(30).required("password required"),
    zoneId: Yup.number().min(1).max(50).required("number is required")
  });

export default traineeAccountLoginSchema;
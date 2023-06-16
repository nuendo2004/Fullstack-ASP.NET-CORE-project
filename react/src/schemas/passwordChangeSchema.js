import * as Yup from "yup";

const passwordChangeSchema = Yup.object().shape({
  password: Yup.string()
    .min(8)
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  passwordconfirm: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Must match password"),
});

export default passwordChangeSchema;

import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Password Required"),
});

export default registerSchema;

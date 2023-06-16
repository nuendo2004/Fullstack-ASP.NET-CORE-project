import * as Yup from "yup";

const contactSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  from: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string().min(10),
  subject: Yup.string().required("Required"),
  message: Yup.string().min(10).max(500),
});

export default contactSchema;

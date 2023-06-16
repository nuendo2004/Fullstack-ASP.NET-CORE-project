import * as Yup from "yup";
import "yup-phone";

const contactSchema = Yup.object().shape({
  firstName: Yup.string().min(3).max(15).required("Required"),
  lastName: Yup.string().min(4).max(15).required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string().phone("US", true, "Invalid phone number"),
  contactReason: Yup.string().required("Required"),
  message: Yup.string().min(10).max(100),
});

export default contactSchema;

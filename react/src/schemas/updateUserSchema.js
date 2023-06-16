import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const updateSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3)
    .max(15)
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .required("Please enter the required field"),
  middleInitial: Yup.string()
    .min(1)
    .max(3)
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field")
    .required("Please enter the required field"),
  lastName: Yup.string()
    .min(3)
    .max(15)
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are alowed for this field")
    .required("Please enter the required field"),
  phone: Yup.string()
    .min(10)
    .max(11)
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone is also a required field"),
});
export default updateSchema;

import * as Yup from "yup";

const addSharedStoriesSchema = Yup.object().shape({
  title: Yup.string().min(8).required("Title required"),
  email: Yup.string().email("Invalid Email").required("Is Required"),
  story: Yup.string().min(50).max(3000).required("Required"),
  agreementCheckbox: Yup.bool().required("Please check box to continue")
});

export default addSharedStoriesSchema;
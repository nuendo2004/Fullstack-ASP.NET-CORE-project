import * as Yup from "yup";

const blogSchema = Yup.object().shape({
  title: Yup.string().min(2).max(50).required("Is Required"),
  subject: Yup.string().min(2).max(50).required("Is Required"),
  content: Yup.string().min(5).max(50000).required("Is Required"),
})

export default blogSchema;
  
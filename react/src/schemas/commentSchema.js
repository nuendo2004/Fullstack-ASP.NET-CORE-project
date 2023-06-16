import * as Yup from "yup";

const commentSchema = Yup.object().shape({
  text: Yup.string().min(10).required("Text needs to more than 10 characters"),
})

  export default commentSchema;
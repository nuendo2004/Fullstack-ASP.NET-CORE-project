import * as Yup from "yup";

const podcastSchema = Yup.object().shape({
  audio: Yup.string().required("Must be a valid URL"),
  author: Yup.string().min(2).required("Is Required"),
  title: Yup.string().min(2).required("Is Required"),
  content: Yup.string().min(5).max(20).required("Is Required"),
  link: Yup.string().required("Must be a valid URL"),
  category: Yup.string().min(2).required("Is Required"),
});

export default podcastSchema;

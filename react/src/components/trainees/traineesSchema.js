import * as Yup from "yup";

const traineeSchema = Yup.object().shape({
  traineeStatusId: Yup.string().required("is Required"),
  trainingUnitId: Yup.string().required("is Required"),
  email: Yup.string().required("is Required"),
});

export default traineeSchema;

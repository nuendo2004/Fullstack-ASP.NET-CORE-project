import * as Yup from "yup";

const addTrainingUnitsSchema = Yup.object().shape({
  name: Yup.string().min(2).max(50).required("Is Required"),
  description: Yup.string().min(2).max(1000),
  trainingStatusId: Yup.string().required("Is Required"),
  primaryTrainerId: Yup.string().required("Is Required"),
});
export default addTrainingUnitsSchema;

import * as Yup from "yup";

const trainingScheduleSchema = Yup.object().shape({
  name: Yup.string().min(3).max(50).required("Is Required"),
});

export { trainingScheduleSchema };

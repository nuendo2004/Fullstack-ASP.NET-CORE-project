import * as Yup from "yup";

const instructorsSchema = Yup.object().shape({
  zoneId: Yup.number().min(1).required("Is Required"),
 trainingUnitId: Yup.number().min(1).required("Is Required"),
 name: Yup.string().min(8).max(100).required("Is Required"),
 traineeId: Yup.number().min(1).required("Is Required"),
 quantity: Yup.number().min(1).required("Is Required"),
 entityId: Yup.number().min(1).required("Is Required"),
 zoneTokenTypeId: Yup.number().min(1).required("Is Required"),
});

export default instructorsSchema;

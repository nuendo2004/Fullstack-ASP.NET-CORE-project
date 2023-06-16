import * as Yup from "yup";

const basicSchema = Yup.object().shape({
  name: Yup.string().min(2).max(100).required("Name field is Required"),
  description: Yup.string().max(500),
  zoneTypeId: Yup.string().required("Zone Type is Required"),
  zoneStatusId: Yup.string().required("Zone Status is Required"),
});

export default basicSchema;

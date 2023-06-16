import * as Yup from "yup";

const taskEventsFormSchema = Yup.object().shape({
  zoneId: Yup.string().required("Required"),
  entityTypeId: Yup.string().required("Required"),
  entityId: Yup.string().required("Required"),
  taskEventTypeId: Yup.string().required("Required"),
  boolValue: Yup.string().required("Required"),
  text: Yup.string()
    .required("Required")
    .max(255, "Must be less than 255 characters"),
  payload: Yup.string().required("Required"),
});

export { taskEventsFormSchema };

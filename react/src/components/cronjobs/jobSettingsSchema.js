import * as Yup from "yup";

const jobSettingsSchema = Yup.object().shape({
  chronJobTypeId: Yup.number()
    .min(1, "Please make a selection")
    .max(4)
    .required("Required"),
  intervalTypeId: Yup.number()
    .min(1, "Please make a selection")
    .max(4)
    .required("Required"),
  daysOfTheWeekId: Yup.number()
    .min(1, "Please make a selection")
    .max(9)
    .required("Required"),
  utcHourToRun: Yup.date().required("Required"),
});

export default jobSettingsSchema;

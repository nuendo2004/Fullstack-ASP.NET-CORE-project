import * as Yup from "yup";

const rescueCenterReportSchema = Yup.object().shape({
  subject: Yup.string()
    .min(2, "Must be at least 2 Characters")
    .max(100, "Max of 100 characters")
    .required("Is Required"),
  description: Yup.string()
    .min(2, "Must be at least 2 Characters")
    .max(3000, "Max of 3000 characters")
    .required("Is Required"),
  eventReportingTypeId: Yup.number()
    .min(1, "Event type is required")
    .required("Is Required"),
});

export default rescueCenterReportSchema;

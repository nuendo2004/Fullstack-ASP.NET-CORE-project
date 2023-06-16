import * as Yup from "yup";

const jobRecipientSchema = Yup.object().shape({
  entityTypeId: Yup.number()
    .min(1, "Please select an entity type.")
    .max(9)
    .required("Is Required"),
  recipient: Yup.number().min(1, "Please select a trainee."),
});

export default jobRecipientSchema;

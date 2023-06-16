import * as Yup from "yup";

const newsletterSubscriptionSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email address")
    .min(2, "Must be at least 2 Characters"),
});

export default newsletterSubscriptionSchema;

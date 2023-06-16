import * as Yup from "yup";

const newsletterUnsubscribeSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required(),
});

export default newsletterUnsubscribeSchema;

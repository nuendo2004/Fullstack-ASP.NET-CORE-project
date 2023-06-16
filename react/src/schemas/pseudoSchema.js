import * as Yup from "yup";

const pseudoValSchema = Yup.object().shape({
    title: Yup
      .string()
      .min(2, "Minimum: 2")
      .max(30, "Exceeded Limit: 30")
      .required("Required Field"),
    adMainImageUrl: Yup
      .string()
      .min(1)
      .required("Please Select a File"),
    details: Yup
      .string()
      .min(5, "Minimum: 5")
      .max(90, "Exceeded Limit: 90")
      .required("Required Field"),
    actionId: Yup
      .string()
      .min(2, "Minimum: 2")
      .max(50, "Exceeded Limit: 50")
      .required("Required Field"),
  })

  export default pseudoValSchema;
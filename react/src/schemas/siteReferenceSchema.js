import * as Yup from "yup";

const modalSelectionSchema = Yup.object().shape({
  ReferenceTypeId: Yup.number().required("Please check a box to continue"),
});

export { modalSelectionSchema };

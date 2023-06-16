import * as Yup from "yup";

 const basicSchema = Yup.object().shape({
    name: Yup.string().min(2).max(50).required("is required"),
    description: Yup.string().min(2).max(50).required("is required"),
    organizationId: Yup.number().min(1).max(50).required("Number is required"),
    spreadLevelId: Yup.number().min(1).max(50).required("Number is required"),
    speedCategoryId: Yup.number().min(1).max(50).required("Number is required"),
    isDeleted: Yup.string().required("True or False"),
    createdBy: Yup.string().min(1).max(50).required("is required"),
  });

  export default basicSchema;
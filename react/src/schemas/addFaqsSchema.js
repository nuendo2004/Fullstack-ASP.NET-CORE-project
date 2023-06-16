import * as Yup from "yup";

const addFaqsSchema = Yup.object().shape({
  Question: Yup.string().min(2).max(50).required("is required"),
  Answer: Yup.string().min(2).max(50).required("is required"),
  FAQCategoriesId: Yup.number().min(1).max(50).required("is required"),
  SortOrder: Yup.number().min(1).max(50).required("is required"),
  UserId: Yup.number().min().max().required("is required"),
});

export { addFaqsSchema };

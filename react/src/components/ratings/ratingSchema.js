import * as Yup from "yup";

export const ratingSchema = Yup.object().shape({
  rating: Yup.number().min(1).max(5),
  entityId: Yup.number().min(1),
  entityTypeId: Yup.number().min(1),
});

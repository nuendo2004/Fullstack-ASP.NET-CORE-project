import * as Yup from "yup";

const editAvatarSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  avatarUrl: Yup.string().required("Required"),
  accountStatusId: Yup.number().required("Required"),
});

export default editAvatarSchema;

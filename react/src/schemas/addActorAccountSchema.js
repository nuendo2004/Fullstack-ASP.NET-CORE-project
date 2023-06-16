import * as Yup from "yup";

const actorAccountvalidationSchema = Yup.object().shape({
    userName: Yup.string().min(6).max(30).required("Minimum 6 characters Required"),
    password: Yup.string().min(6).max(30).required("Minimum 6 characters Required"),
    avatarUrl: Yup.string().url().required("Url is Required"),
    zoneId: Yup.string().required("Required field"),
    actorId: Yup.string().required("Required field"),
    accountStatusId: Yup.string().required("Required field"),
  });

  export default actorAccountvalidationSchema;
import * as Yup from "yup"; 



const actorAccountSchema = Yup.object().shape({
    userName: Yup.string().min(2).max(100).required("Is Required"),
    password:  Yup.string()
    .min(8)
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    avatarUrl: Yup.string().required("Required"),
    accountStatusId: Yup.number().min(1).max(5).required("Is Required"),
})

export default actorAccountSchema;
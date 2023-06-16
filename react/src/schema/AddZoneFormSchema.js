import * as Yup from "yup"


const AddZoneFormSchema = Yup.object().shape({
    name: Yup.string().min(2).max(50).required("is required"),
    description: Yup.string().min(2).max(50).required("is required"),
    spreadLevelId: Yup.number().min(1).max(50).required("Number is required"),
    speedCategoryId: Yup.number().min(1).max(50).required("Number is required"),

  });


  export {AddZoneFormSchema};
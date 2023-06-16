import * as Yup from "yup";

const locationFormSchema = Yup.object().shape({
    lineOne: Yup.string().min(2).max(50).required("Street Address is required"),
    lineTwo: Yup.string().min(2).max(50),
    city: Yup.string().min(2).max(50).required("City is required"),
    zip: Yup.string().min(2).max(50).required("Zip Code is required"),
    locationTypeId: Yup.number().min(1).max(50).required("Select a Location Type"),
    stateId: Yup.number().min(1).max(51).required("State Required"),
    latitude: Yup.number().min(-90).max(90),
    longitude: Yup.number().min(-180).max(180),
  });

  export default locationFormSchema;

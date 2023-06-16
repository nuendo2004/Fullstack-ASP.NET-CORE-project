import * as Yup from "yup";

 const addZoneGroupSchema = Yup.object().shape({
    name: Yup.string().min(2).max(200).required("Required field"),
    zoneId: Yup.number().min(1).required("Required field"),
    entityTypeId: Yup.number().min(1).required("Required field"),
    groupAdminId: Yup.number().min(1).required("Required field"),
  });

  export default addZoneGroupSchema;
import * as Yup from "yup";

const filterSchema = Yup.object().shape({
  ZoneTypeId: Yup.number(),
  ZoneStatusId: Yup.number(),
});

export default filterSchema;

import * as Yup from "yup";

const consequencesSchema = Yup.object().shape({
    conName: Yup.string().min(2).max(100).required("Is Required"),
    conDescription: Yup.string().min(2).max(500).required("Is Required"),
    consequenceTypeId: Yup.number().required("Is Required"),
    actorId: Yup.number().required("Is Required"),
    zoneId: Yup.number().required("Is Required"),
})

export default consequencesSchema;

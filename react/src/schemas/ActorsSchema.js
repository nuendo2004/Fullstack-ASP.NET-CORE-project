import * as Yup from "yup"; 


const actorSchema = Yup.object().shape({
    actorName: Yup.string().min(2).max(100).required("Is Required"),
    actorDescription: Yup.string().min(5).max(500).required("Is Required"),
    actorTypeId: Yup.number().min(1).max(5).required("Is Required"),
    statusTypeId: Yup.number().min(1).max(5).required("Is Required"),
    createdBy: Yup.number(),
    modifiedBy: Yup.number(),
})


export default actorSchema; 
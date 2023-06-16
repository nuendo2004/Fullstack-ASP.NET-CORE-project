import * as Yup from "yup"; 

const surveyQuestionSchema = Yup.object().shape({
    question: Yup.string().min(2).max(500).required("Is Required"),
    helpText: Yup.string().min(2).max(255).required("Is Required"),
    isRequired: Yup.bool().required("Is Required"),
    isMultipleAllowed: Yup.bool().required("Is Required"),
    questionTypeId: Yup.number().min(1).max(10).required("Is Required"),
    surveyId: Yup.number().min(1).required("Is Required"),
    statusId: Yup.number().min(1).max(4).required("Is Required"),
    sortOrder: Yup.number().min(1).required("Is Required"),
})

export default surveyQuestionSchema;
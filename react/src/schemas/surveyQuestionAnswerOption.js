import * as Yup from "yup";

const surveyQuestionAnswerOptionSchema = Yup.object().shape({
    questionId: Yup.string().min(2).max(500).required("Is Required"),
    text: Yup.string().min(2).max(500).required("Is Required"),
    value: Yup.string().min(2).max(100),
    additionalInfo: Yup.string().min(2).max(200)
})

export default surveyQuestionAnswerOptionSchema;
import * as Yup from "yup";

const surveyAnswerSchema = Yup.object().shape({
  answerOptionId: Yup.number().nullable(true),
  answer: Yup.string().nullable(true),
  answerNumber: Yup.number().nullable(true),
});

export default surveyAnswerSchema;

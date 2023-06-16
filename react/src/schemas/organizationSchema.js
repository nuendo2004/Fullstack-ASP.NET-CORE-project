import * as Yup from "yup";

const basicInfo = Yup.object().shape({
    orgName: Yup.string().required("This field is required"),
    orgType: Yup.string().required("This field is required").matches(/^\d/, "This field is required"),
    orgDescription: Yup.string(),
    orgPhone: Yup.string().phone("US", true, "Invalid phone number"),
    orgLogoUrl: Yup.string().url("Invalid URL"),
    orgUrl: Yup.string().url("Invalid URL"),
});

const orgSchema = { basicInfo };

export default orgSchema;
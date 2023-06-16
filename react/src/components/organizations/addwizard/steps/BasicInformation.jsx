import React, { useState, useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import { withFormik, ErrorMessage, Field } from "formik";
import ReactQuill from "react-quill";
import PropTypes from "prop-types";
import orgSchema from "../../../../schemas/organizationSchema";

const BasicInformation = (props) => {
    const {
        values,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        backLabel,
        nextLabel,
        onBack,
        onHomeClicked,
    } = props;

    const placeholders = {
        name: "Insert organization name.",
        type: "Select organization type",
        description: "Insert organization description",
        phone: "[+1(123) 456-7890]",
        orgLogoUrl: "http://www.example.com",
        url: "http://www.example.com",
    };

    //#region Hooks

    const [state, setState] = useState({
        types: [],
        typeOptions: [],
    });

    useEffect(() => {
        const typeOptions = values.orgTypes?.map(mapLookUpItem);

        if (typeOptions) {
            setState((prevState) => {
                const newState = { ...prevState };
                prevState.orgType = "";
                newState.typeOptions = typeOptions;
                return newState;
            });
        }
    }, [values.orgTypes]);

    //#endregion

    //#region

    const mapLookUpItem = (orgType, index) => {
        return (
            <option value={orgType.id} key={`orgType-${index}`}>
                {orgType.name}
            </option>
        );
    };

    //#endregion

    //#region Handlers

    const handleBack = () => {
        onBack(values);
    };

    //#endregion

    return (
        <Form onSubmit={handleSubmit}>
            <Card className="mb-3">
                <Card.Header className="border-bottom px-4 py-3">
                    <h4 className="mb-0">Basic Information</h4>
                </Card.Header>
                <Card.Body>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="orgName">Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={placeholders.name}
                            id="orgName"
                            name="orgName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.orgName}
                        />
                        <ErrorMessage name="orgName" component="div" className="has-error" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="orgType">Type</Form.Label>
                        <Form.Select
                            id="orgType"
                            name="orgType"
                            className="text-dark"
                            onChange={handleChange}
                            value={values.orgType}
                        >
                            <option defaultValue="" className="text-secondary">
                                {placeholders.type}
                            </option>
                            {state.typeOptions}
                        </Form.Select>
                        <ErrorMessage name="orgType" component="div" className="has-error" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="orgDescription">Description</Form.Label>
                        <Field id="orgDescription" name="orgDescription">
                            {({ field }) => (
                                <ReactQuill
                                    value={field.value}
                                    onChange={field.onChange(field.name)}
                                    placeholder={placeholders.description}
                                />
                            )}
                        </Field>
                        <ErrorMessage name="orgDescription" component="div" className="has-error" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="orgPhone">Business Phone</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={placeholders.phone}
                            id="orgPhone"
                            name="orgPhone"
                            onChange={handleChange}
                            value={values.orgPhone}
                        />
                        <ErrorMessage name="orgPhone" component="div" className="has-error" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="orgLogoUrl">Logo URL</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={placeholders.url}
                            id="orgLogoUrl"
                            name="orgLogoUrl"
                            onChange={handleChange}
                            value={values.orgLogoUrl}
                        />
                        <ErrorMessage name="orgLogoUrl" component="div" className="has-error" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="orgUrl">URL</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={placeholders.url}
                            id="orgUrl"
                            name="orgUrl"
                            onChange={handleChange}
                            value={values.orgUrl}
                        />
                        <ErrorMessage name="orgUrl" component="div" className="has-error" />
                    </Form.Group>
                </Card.Body>
            </Card>
            <div className="Loki-Actions ms-3">
                <div>
                    <button type="button" onClick={handleBack} disabled={true}>
                        {backLabel}
                    </button>
                    <button type="submit" disabled={isSubmitting}>
                        {nextLabel}
                    </button>
                </div>
                <div>
                    <button type="button" className="back-btn" onClick={onHomeClicked}>
                        Back to Home
                    </button>
                </div>
            </div>
        </Form>
    );
};

export default withFormik({
    enableReinitialize: true,

    mapPropsToValues: (props) => ({
        orgName: props.values.orgName || "",
        orgType: props.values.orgType || "",
        orgDescription: props.values.orgDescription || "",
        orgPhone: props.values.orgPhone || "",
        orgLogoUrl: props.values.orgLogoUrl || "",
        orgUrl: props.values.orgUrl || "",
        orgTypes: props.values.orgTypes || [],
    }),
    validationSchema: orgSchema.basicInfo,

    handleSubmit: function (values, { props }) {
        props.onNext(values);
    },
})(BasicInformation);

BasicInformation.propTypes = {
    values: PropTypes.shape({
        orgName: PropTypes.string,
        orgType: PropTypes.string,
        orgDescription: PropTypes.string,
        orgPhone: PropTypes.string,
        orgLogoUrl: PropTypes.string,
        orgUrl: PropTypes.string,
        orgTypes: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
            })
        ),
    }),
    isSubmitting: PropTypes.bool,
    handleSubmit: PropTypes.func,

    backLabel: PropTypes.string,
    nextLabel: PropTypes.string,
    onBack: PropTypes.func,
    onNext: PropTypes.func,
    errors: PropTypes.shape({
        orgName: PropTypes.string,
        orgType: PropTypes.string,
        orgDescription: PropTypes.string,
        orgPhone: PropTypes.string,
        orgUrl: PropTypes.string,
    }),
    handleChange: PropTypes.func,
    handleBlur: PropTypes.func,
    onHomeClicked: PropTypes.func,
};

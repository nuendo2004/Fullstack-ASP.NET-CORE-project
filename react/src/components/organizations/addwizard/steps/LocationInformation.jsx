import React, { useState, useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import { withFormik, ErrorMessage } from "formik";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import PropTypes from "prop-types";
import locationFormSchema from "schemas/locationFormScheme";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const libraries = ["places"];
const componentRestrictions = { country: ["us"] };

const LocationInformation = (props) => {
    const {
        values,
        isSubmitting,
        handleChange,
        handleSubmit,
        backLabel,
        nextLabel,
        onBack,
        onHomeClicked,
        mergeValues,
    } = props;
    const placeHolders = {
        type: "Select location type",
        lineOne: "Insert line one.",
        lineTwo: "Insert line two.",
        state: "Select state",
        city: "Select city",
        zipCode: "[12345]",
    };

    //#region Hooks

    const [state, setState] = useState({
        types: [],
        typeOptions: [],
        states: [],
        stateOptions: [],
    });

    const [autoComplete, setAutoComplete] = useState({});

    useEffect(() => {
        const typeOptions = state.types.map(mapOption);
        const stateOptions = state.states.map(mapStateOption);

        setState((prevState) => {
            const newState = { ...prevState };
            newState.typeOptions = typeOptions;
            newState.stateOptions = stateOptions;
            return newState;
        });
    }, [state.types, state.states]);

    useEffect(() => {
        const typeOptions = values.locTypes ? values.locTypes.map(mapOption) : [];
        const stateOptions = values.locStates ? values.locStates.map(mapStateOption) : [];

        setState((prevState) => {
            const newState = { ...prevState };
            newState.typeOptions = typeOptions;
            newState.stateOptions = stateOptions;
            return newState;
        });
    }, [values.locStates, values.locTypes]);

    //#endregion

    //#region Render

    const mapOption = (option, index) => {
        return (
            <option value={option.id} key={`${option.name}-${index}`}>
                {option.name}
            </option>
        );
    };

    const mapStateOption = (state, index) => {
        return (
            <option value={state.id} key={`${state.code}-${index}`}>
                {state.code} - {state.name}
            </option>
        );
    };

    //#endregion

    //#region Handlers

    const handleBack = () => {
        onBack(values);
    };

    const onLoad = (response) => {
        setAutoComplete(response);
    };

    const onPlaceChanged = () => {
        if (autoComplete !== null) {
            let filledAddress = fillInAddress();

            const autoFillLoc = {
                lineOne: filledAddress.lineOne,
                city: filledAddress.city,
                zip: filledAddress.zip,
                latitude: filledAddress.latitude,
                longitude: filledAddress.longitude,
            };

            for (const locState of values.locStates) {
                const stateCode = locState.code.trim();

                if (stateCode === filledAddress.state) {
                    autoFillLoc.stateId = locState.id.toString();
                    break;
                }
            }
            mergeValues({ ...values, ...autoFillLoc });
        }
    };

    const fillInAddress = () => {
        const place = autoComplete.getPlace();
        let lineOne = "";
        let city = "";
        let zip = "";
        let latitude = place.geometry.location.lat();
        let longitude = place.geometry.location.lng();
        let state = "";

        for (const component of place.address_components) {
            const componentType = component.types[0];

            switch (componentType) {
                case "street_number": {
                    lineOne = `${component.long_name} ${lineOne}`;
                    break;
                }
                case "route": {
                    lineOne += component.short_name;
                    break;
                }
                case "postal_code": {
                    zip = `${component.long_name}`;
                    break;
                }
                case "locality": {
                    city = `${component.long_name}`;
                    break;
                }
                case "administrative_area_level_1": {
                    state = `${component.short_name}`;
                    break;
                }
                default: {
                    break;
                }
            }
        }
        return { lineOne, city, zip, latitude, longitude, state };
    };

    //#endregion

    return (
        <Form onSubmit={handleSubmit}>
            <Card className="mb-3 ">
                <Card.Header className="border-bottom px-4 py-3">
                    <h4 className="mb-0">Location</h4>
                </Card.Header>

                <Card.Body>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="locationTypeId">Type</Form.Label>
                        <Form.Select
                            id="locationTypeId"
                            name="locationTypeId"
                            onChange={handleChange}
                            value={values.locationTypeId}
                            className="text-dark"
                        >
                            <option defaultValue="" className="text-secondary">
                                {placeHolders.type}
                            </option>
                            {state.typeOptions}
                        </Form.Select>
                        <ErrorMessage name="locationTypeId" component="div" className="has-error" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="lineOne">Line One</Form.Label>
                        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries}>
                            <Autocomplete
                                onLoad={onLoad}
                                onPlaceChanged={onPlaceChanged}
                                restrictions={componentRestrictions}
                            >
                                <Form.Control
                                    type="text"
                                    placeholder={placeHolders.lineOne}
                                    id="lineOne"
                                    name="lineOne"
                                    onChange={handleChange}
                                    value={values.lineOne}
                                />
                            </Autocomplete>
                        </LoadScript>
                        <ErrorMessage name="lineOne" component="div" className="has-error" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="lineTwo">Line Two</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={placeHolders.lineTwo}
                            id="lineTwo"
                            name="lineTwo"
                            onChange={handleChange}
                            value={values.lineTwo}
                        />
                        <ErrorMessage name="lineTwo" component="div" className="has-error" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="city">City</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={placeHolders.city}
                            id="city"
                            name="city"
                            onChange={handleChange}
                            value={values.city}
                        />
                        <ErrorMessage name="city" component="div" className="has-error" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="zip">Zip Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={placeHolders.zipCode}
                            id="zip"
                            name="zip"
                            onChange={handleChange}
                            value={values.zip}
                        />
                        <ErrorMessage name="zip" component="div" className="has-error" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="stateId">State</Form.Label>
                        <Form.Select
                            id="stateId"
                            name="stateId"
                            onChange={handleChange}
                            value={values.stateId}
                            className="text-dark"
                        >
                            <option defaultValue="" className="text-secondary">
                                {placeHolders.state}
                            </option>
                            {state.stateOptions}
                        </Form.Select>
                        <ErrorMessage name="stateId" component="div" className="has-error" />
                    </Form.Group>
                </Card.Body>
            </Card>
            <div className="Loki-Actions ms-3">
                <div>
                    <button type="button" onClick={handleBack} disabled={isSubmitting}>
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
        locationTypeId: props.values.locationTypeId || "",
        lineOne: props.values.lineOne || "",
        lineTwo: props.values.lineTwo || "",
        city: props.values.city || "",
        stateId: props.values.stateId || "",
        zip: props.values.zip || "",
        locStates: props.values.locStates || [],
        locTypes: props.values.locTypes || [],
    }),
    validationSchema: locationFormSchema,
    handleSubmit: function (values, { props }) {
        props.onNext(values);
    },
})(LocationInformation);

LocationInformation.propTypes = {
    values: PropTypes.shape({
        locationTypeId: PropTypes.string,
        lineOne: PropTypes.string,
        lineTwo: PropTypes.string,
        city: PropTypes.string,
        zip: PropTypes.string,
        stateId: PropTypes.string,
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        locStates: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                code: PropTypes.string,
            })
        ),
        locTypes: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
            })
        ),
    }),
    handleSubmit: PropTypes.func,
    onBack: PropTypes.func,
    onNext: PropTypes.func,
    handleChange: PropTypes.func,
    isSubmitting: PropTypes.bool,
    backLabel: PropTypes.string,
    nextLabel: PropTypes.string,
    onHomeClicked: PropTypes.func,
    mergeValues: PropTypes.func,
};

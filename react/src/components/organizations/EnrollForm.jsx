import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { Building, GeoAlt, CheckCircle } from "react-bootstrap-icons";
import Loki from "react-loki";
import BasicInformation from "./addwizard/steps/BasicInformation";
import LocationInformation from "./addwizard/steps/LocationInformation";
import Confirmation from "./addwizard/steps/Confirmation";
import lookUpService from "services/lookUpService";
import organizationsService from "services/organizationService";
import locationService from "services/locationService";
import debug from "sabio-debug";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "./addwizard/form.css";

const _logger = debug.extend("EnrollOrganization");

function EnrollForm() {
    const EMPTY_FIELD_STR = "N/A";

    //#region Hooks

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        orgName: "",
        orgType: "",
        orgDescription: "",
        orgPhone: "",
        orgLogoUrl: "",
        orgUrl: "",
        locationTypeId: "",
        lineOne: "",
        lineTwo: "",
        city: "",
        zip: "",
        stateId: "",
        latitude: 0.0,
        longitude: 0.0,
        locStates: [],
        locTypes: [],
        orgTypes: [],
    });

    useEffect(() => {
        const payload = ["OrganizationTypes", "LocationTypes"];
        locationService
            .getStates()
            .then((response) => response.data)
            .then(onGetLocStatesSuccess);
        lookUpService.LookUp(payload).then(onGetLookUpsSuccess);
    }, []);

    //#endregion

    //#region Data

    const getPayload = (values) => {
        return {
            OrganizationTypeId: parseInt(values.orgType),
            Name: values.orgName,
            Description: values.orgDescription
                ? values.orgDescription.slice(3, values.orgDescription.length - 4)
                : null,
            LogoUrl: getStrOrNull(values.orgLogoUrl),
            BusinessPhone: getStrOrNull(values.orgPhone),
            SiteUrl: getStrOrNull(values.orgUrl),
            IsDeleted: false,
            LocationTypeId: values.locationTypeId,
            LineOne: values.lineOne,
            LineTwo: getStrOrNull(values.lineTwo),
            City: values.city,
            Zip: values.zip,
            StateId: values.stateId,
            Latitude: 0.0,
            Longitude: 0.0,
        };
    };

    const getStrOrNull = (value) => {
        let fieldValue = value;

        if (value && value !== EMPTY_FIELD_STR) {
            fieldValue = value;
        } else {
            fieldValue = null;
        }

        return fieldValue;
    };

    //#endregion

    //#region Handlers

    const mergeValues = (values) => {
        setFormData((prevState) => {
            return {
                ...prevState,
                ...values,
            };
        });
    };

    const onSubmit = (values) => {
        const payload = getPayload(values);
        organizationsService.addV2(payload).then(onOrgAddSuccess).catch(onOrgAddError);
    };

    const onGetLookUpsSuccess = (response) => {
        const orgTypes = response.item.organizationTypes;
        const locTypes = response.item.locationTypes;
        setFormData((prevState) => {
            const newState = { ...prevState };
            newState.orgTypes = orgTypes;
            newState.locTypes = locTypes;
            return newState;
        });
    };

    const onGetLocStatesSuccess = (response) => {
        const locStates = response.items;
        setFormData((prevState) => {
            const newState = { ...prevState };
            newState.locStates = locStates;
            return newState;
        });
    };

    const onOrgAddSuccess = (response) => {
        toastr.success("Organization added successfully.");
        _logger("onOrgAddSuccess:", response);
        navigate(`/organization/${response.item}/invite`);
    };

    const onOrgAddError = (response) => {
        toastr.error("An error occurred while trying to add the organization", "Error");
        _logger("onOrgAddError:", response);
    };

    const onHomeClicked = () => {
        navigate("/");
    };

    //#endregion

    const steps = [
        {
            label: "Basic",
            icon: <Building />,
            component: <BasicInformation values={formData} onHomeClicked={onHomeClicked} />,
        },
        {
            label: "Location",
            icon: <GeoAlt />,
            component: (
                <LocationInformation values={formData} onHomeClicked={onHomeClicked} mergeValues={mergeValues} />
            ),
        },
        {
            label: "Confirm",
            icon: <CheckCircle />,
            component: (
                <Confirmation
                    values={formData}
                    onFinish={onSubmit}
                    onHomeClicked={onHomeClicked}
                    emptyFieldStr={EMPTY_FIELD_STR}
                />
            ),
        },
    ];

    return (
        <React.Fragment>
            <div className="py-4 bg-primary">
                <Container>
                    <Row>
                        <Col lg={{ span: 10, offset: 1 }} md={12} sm={12}>
                            <div className="d-lg-flex align-items-center justify-content-between">
                                <div className="mb-4 mb-lg-0">
                                    <h1 className="text-white mb-1">Add New Organization</h1>
                                    <p className="mb-0 text-white lead">Fill the form and add your organization.</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Row>
                    <div className="org-loki-container">
                        <Loki
                            steps={steps}
                            onNext={mergeValues}
                            onBack={mergeValues}
                            onFinish={onSubmit}
                            backLabel="Back"
                            nextLabel="Next"
                            noActions
                        />
                    </div>
                </Row>
            </div>
        </React.Fragment>
    );
}

export default EnrollForm;

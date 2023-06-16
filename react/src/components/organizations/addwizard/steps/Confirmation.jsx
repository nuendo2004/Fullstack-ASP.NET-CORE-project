import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import "../form.css";

function Confirmation(props) {
    const { values, backLabel, nextLabel, onBack, onFinish, onHomeClicked, emptyFieldStr } = props;
    const EMPTY_FIELD_STR = emptyFieldStr;

    //#region Hooks

    const [state, setState] = useState({
        type: "",
        locState: "",
        orgType: "",
    });

    useEffect(() => {
        const locType = values.locTypes.find((locT) => locT.id === parseInt(values.locationTypeId, 10));
        const locState = values.locStates.find((locS) => locS.id === parseInt(values.stateId, 10));
        const orgType = values.orgTypes.find((orgT) => orgT.id === parseInt(values.orgType, 10));
        setState({
            locType: locType?.name,
            locState: locState?.name,
            orgType: orgType?.name,
        });
    }, []);

    //#endregion

    //#region Handlers

    const handleSubmit = () => {
        onFinish(values);
    };

    //#endregion

    return (
        <React.Fragment>
            <Row className="justify-content-center">
                <Col xs={12} className="mb-4 mb-xl-0">
                    <Card>
                        <Card.Img variant="top" src={values.orgLogoUrl} className="org-card-logo" />
                        <Card.Body>
                            <Card.Title>Organization</Card.Title>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem className="d-flex flex-column justify-content-start">
                                    <div className="text-secondary">Name: </div>
                                    <div className="align-self-end">{values.orgName}</div>
                                </ListGroupItem>
                                <ListGroupItem className="d-flex flex-column justify-content-start">
                                    <div className="text-secondary">Type: </div>
                                    <div className="align-self-end">{state.orgType}</div>
                                </ListGroupItem>
                                <ListGroupItem className="d-flex flex-column justify-content-start">
                                    <div className="text-secondary">Phone: </div>
                                    <div className="align-self-end">{values.orgPhone || EMPTY_FIELD_STR}</div>
                                </ListGroupItem>
                                <ListGroupItem className="d-flex flex-column justify-content-start">
                                    <div className="text-secondary">URL:</div>
                                    <div className="align-self-end">{values.orgUrl || EMPTY_FIELD_STR}</div>
                                </ListGroupItem>
                                <ListGroupItem className="d-flex flex-column justify-content-start">
                                    <div className="text-secondary">Description: </div>
                                    <div>
                                        {values.orgDescription.slice(3, values.orgDescription.length - 4) ||
                                            EMPTY_FIELD_STR}
                                    </div>
                                </ListGroupItem>
                            </ListGroup>
                            <div className="py-3"></div>
                            <Card.Title>Location</Card.Title>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem className="d-flex flex-column justify-content-start">
                                    <div className="text-secondary">Type:</div>
                                    <div className="align-self-end">
                                        {values.locTypes[values.locationTypeId - 1].name}
                                    </div>
                                </ListGroupItem>
                                <ListGroupItem className="d-flex flex-column justify-content-start">
                                    <div className="text-secondary">Line one:</div>
                                    <div className="align-self-end">{values.lineOne}</div>
                                </ListGroupItem>
                                <ListGroupItem className="d-flex flex-column justify-content-start">
                                    <div className="text-secondary">Line two: </div>
                                    <div className="align-self-end">{values.lineTwo || EMPTY_FIELD_STR}</div>
                                </ListGroupItem>
                                <ListGroupItem className="d-flex flex-column justify-content-start">
                                    <div className="text-secondary">City:</div>
                                    <div className="align-self-end">{values.city}</div>
                                </ListGroupItem>
                                <ListGroupItem className="d-flex flex-column justify-content-start">
                                    <div className="text-secondary">Zip code:</div>
                                    <div className="align-self-end">{values.zip}</div>
                                </ListGroupItem>
                                <ListGroupItem className="d-flex flex-column justify-content-start">
                                    <div className="text-secondary">State: </div>
                                    <div className="align-self-end">{state.locState}</div>
                                </ListGroupItem>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div className="Loki-Actions ms-3">
                <div>
                    <button type="button" onClick={onBack}>
                        {backLabel}
                    </button>
                    <button type="submit" onClick={handleSubmit}>
                        {nextLabel}
                    </button>
                </div>
                <div>
                    <button type="button" className="back-btn" onClick={onHomeClicked}>
                        Back to Home
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Confirmation;

Confirmation.propTypes = {
    values: PropTypes.shape({
        orgName: PropTypes.string,
        orgType: PropTypes.string,
        orgDescription: PropTypes.string,
        orgPhone: PropTypes.string,
        orgLogoUrl: PropTypes.string,
        orgUrl: PropTypes.string,
        lineOne: PropTypes.string,
        lineTwo: PropTypes.string,
        type: PropTypes.string,
        city: PropTypes.string,
        zip: PropTypes.string,
        locationTypeId: PropTypes.string,
        stateId: PropTypes.string,
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
        orgTypes: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
            })
        ),
    }),
    handleSubmit: PropTypes.func,
    onBack: PropTypes.func,
    onFinish: PropTypes.func,
    handleChange: PropTypes.func,
    isSubmitting: PropTypes.bool,
    backLabel: PropTypes.string,
    nextLabel: PropTypes.string,
    finishLabel: PropTypes.string,
    onHomeClicked: PropTypes.func,
    emptyFieldStr: PropTypes.string,
};

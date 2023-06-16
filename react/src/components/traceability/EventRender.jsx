import React, { Fragment, useEffect, useState } from "react"
import { Accordion } from "react-bootstrap";
import PropTypes from "prop-types";
import consequenceService from "services/consequenceService";
import toastr from "toastr";

function RenderEvent(props) {

    const [eventData, setEventData] = useState({
        actorId: 0,
        actorName: "Henry",
        consequenceId: 0,
        consequenceName: ""
    });

    useEffect(() => {
        consequenceService.getConsequenceByZoneId(props.events.zoneId).then(onConsequenceSuccess).catch(onConsequenceError)
    }, [])

    const onConsequenceSuccess = (response) => {
        const info = response.items[0];
        setEventData((prevState) => {
            const pd = { ...prevState };
            pd.actorId = info.actorId.id;
            pd.consequenceId = info.consequenceType.id;
            pd.consequenceName = info.consequenceType.name;
            return pd;
        })
    };

    const onConsequenceError = () => {
        toastr.error("Consequence Error")
    }


    return (
        <Fragment>
            <Accordion.Item >
                <Accordion.Header><strong>Event ID: {props.events.id}</strong></Accordion.Header>
            </Accordion.Item>
            <Accordion.Item >
                <Accordion.Header><strong>Zone</strong></Accordion.Header>
                <Accordion.Body><strong>Zone Id: </strong> {props.events.zoneId}</Accordion.Body>
                <Accordion.Body><strong>Zone Name: </strong> {props.events.zoneName}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item >
                <Accordion.Header><strong>Actor</strong></Accordion.Header>
                <Accordion.Body><strong>Actor Id: </strong> {eventData.actorId}</Accordion.Body>
                <Accordion.Body><strong>Actor Name: </strong> {eventData.actorName}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item >
                <Accordion.Header><strong>Consequence</strong></Accordion.Header>
                <Accordion.Body><strong>Consequence Id: </strong> {eventData.consequenceId}</Accordion.Body>
                <Accordion.Body><strong>Consequence Type: </strong> {eventData.consequenceName}</Accordion.Body>
            </Accordion.Item>
            <br />
        </Fragment>
    )
};

RenderEvent.propTypes = {
    events: PropTypes.shape({
        id: PropTypes.number.isRequired,
        zoneId: PropTypes.number.isRequired,
        zoneName: PropTypes.string.isRequired,
    })
}

export default RenderEvent;
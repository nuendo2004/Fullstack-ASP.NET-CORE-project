import React, { Fragment, useState } from "react";
import { Card, Image, Col, Modal } from "react-bootstrap"
import PropTypes from "prop-types";
import moment from "moment"
import "./consequence.css";


function ConsequencesCard(props) {

    const aCons = props.consequence;
    const aUser = props.currentUser


    const onLocalEditClicked = (e) => {
        props.onEditClicked(aCons, e)
    };

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <Fragment>
            <Col className="col-4">
                <Card className="mb-4 shadow-lg cons-card">
                    <Image className="img-card-top" src="https://tinyurl.com/3zr5rm66"></Image>
                    <Card.Body className="consequence-text text-center">
                        <h3><strong>Consequence:</strong></h3>
                        <div>{aCons.name}</div>
                        <div>
                            <button className="btn btn-warning" style={{ marginTop: 15 }} onClick={handleShow}>Details</button>
                        </div>
                        {aUser.currentUser.id === aCons.createdBy.id ? <button className="btn btn-primary" style={{ marginTop: 15 }} onClick={onLocalEditClicked}>Edit</button> : ""}
                    </Card.Body>
                </Card>
            </Col>

            <Modal
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton >
                    <Modal.Title>Consequence Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Actor: </strong>{aCons.actorId.name}</p>
                    <p><strong>Zone: </strong>{aCons.zoneId.name}</p>
                    <p><strong>Description: </strong>{aCons.description}</p>
                    <p><strong>Date Created: </strong>{moment(aCons.dateCreated).format("MMMM Do YYYY")}</p>
                    <p><strong>Date Modified: </strong>{moment(aCons.dateModified).format("MMMM Do YYYY")}</p>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
};

ConsequencesCard.propTypes = {
    consequence: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        consequenceTypeId: PropTypes.number,
        actorId: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        }).isRequired,
        zoneId: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        }),
        createdBy: PropTypes.shape({
            id: PropTypes.number.isRequired,
        }),
        dateCreated: PropTypes.string.isRequired,
        dateModified: PropTypes.string.isRequired,
    }).isRequired,
    onEditClicked: PropTypes.func,
    currentUser: PropTypes.shape({
        currentUser: PropTypes.shape({
            id: PropTypes.number.isRequired,
        }).isRequired
    }).isRequired
};



export default ConsequencesCard;

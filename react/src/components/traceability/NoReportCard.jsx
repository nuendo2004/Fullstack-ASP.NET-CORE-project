import React, { Fragment } from "react";
import { Image } from "react-bootstrap"
import "./traceabilityeventcard.css";
import PropTypes from "prop-types";
import "./traceabilityeventcard.css";



function NoReportsCard(props) {

    let image = props.report.image;



    return (
        <Fragment>
            <Image className="no-record-image mx-auto" src={image}></Image>
            <p className="no-record-title text-center">No Record Found</p>
        </Fragment>
    )
};

NoReportsCard.propTypes = {
    report: PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    })
};


export default NoReportsCard;

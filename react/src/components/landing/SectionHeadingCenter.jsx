import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import "./landing.css";

const SectionHeadingCenter = ({ title, subtitle, description }) => {
  return (
    <Row className="mb-10 justify-content-center">
      <Col lg={8} md={12} sm={12} className="text-center text-pat">
        <span className="text-white mb-3 d-block text-uppercase fw-semi-bold ls-xl">
          {subtitle}
        </span>
        <h2 className="mb-2 display-4 fw-bold text-pat">{title}</h2>
        <p className="lead text-pat">{description}</p>
      </Col>
    </Row>
  );
};

SectionHeadingCenter.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
};

export default SectionHeadingCenter;

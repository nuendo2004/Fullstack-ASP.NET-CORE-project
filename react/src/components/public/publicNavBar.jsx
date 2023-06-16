import React from "react";
import { Col, Row } from "react-bootstrap";
import { Fragment } from "react";

function publicNavbar() {
  return (
    <Fragment>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex justify-content-between align-items-center" />
          <div className="mb-3 mb-md-0">
            <h1 className="mb-0 h2 fw-bold">Analytics</h1>
          </div>
        </Col>
        <div className="d-flex">
          <div className="input-group me-3  ">
            <span className="input-group-text text-muted" id="basic-addon2">
              <i className="fe fe-calendar"></i>
            </span>
          </div>
        </div>
      </Row>
    </Fragment>
  );
}

export default publicNavbar;

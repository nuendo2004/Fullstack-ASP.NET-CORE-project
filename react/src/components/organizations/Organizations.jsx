import React from "react";
import { Col, Row } from "react-bootstrap";
import OrganizationCards from "../organizations/OrganizationCards";

function OrganizationList() {
  return (
    <React.Fragment>
      <Row>
        <Col lg={{ span: 8, offset: 2 }} md={12} sm={12} className="mb-12">
          <h1 className="display-4 fw-bold mb-3">
            <span className="text-primary">Current list of organizations.</span>
          </h1>
        </Col>
      </Row>
      <Row className="d-flex">
        <Col>
          <OrganizationCards />
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default OrganizationList;

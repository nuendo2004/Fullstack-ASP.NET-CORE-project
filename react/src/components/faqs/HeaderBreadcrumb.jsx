import React, { Fragment } from "react";
import { Col, Row, Container } from "react-bootstrap";
import PropTypes from "prop-types";

import GKBreadcrumb from "../accordions/GKBreadcrumb";

function HeaderBreadcrumb({ breadcrumb }) {
  return (
    <Fragment>
      <div className="py-8 bg-colors-gradient">
        <Container>
          <Row>
            <Col md={{ offset: 2, span: 8 }} xs={12}>
              <h1 className="fw-bold mb-0 display-4">
                Frequently Asked Questions
              </h1>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="pt-3">
        <Container>
          <Row>
            <Col md={{ offset: 2, span: 8 }} xs={12}>
              <GKBreadcrumb breadcrumb={breadcrumb} />
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
}
HeaderBreadcrumb.propTypes = {
  breadcrumb: PropTypes.func.isRequired,
};
export default HeaderBreadcrumb;

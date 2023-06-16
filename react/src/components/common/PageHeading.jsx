import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import style from "./pageHeading.module.css";
function PageHeading(props) {
  return (
    <div className={`bg-primary py-4 py-lg-6 ${style.pageHeading}`}>
      <Container>
        <Row className="align-items-center">
          <Col xl={12} lg={12} md={12} sm={12}>
            <div>
              <h1 className="mb-0 text-white display-4 ms-5">
                {props.pagetitle}
              </h1>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

PageHeading.propTypes = {
  pagetitle: PropTypes.string.isRequired,
};

export default PageHeading;

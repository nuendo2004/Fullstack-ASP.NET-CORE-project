import React from "react";
import { Row, Col } from "react-bootstrap";
import AnalyticsRequests from "./GoogleAnalyticsRequest";
import { FcGoogle } from "react-icons/fc";

const DisplayAnaytics = () => {
  return (
    <React.Fragment>
      <div>
        <Row>
          <Col lg={12} md={12} sm={12} xl={12}>
            <div className="border-bottom pb-4 mb-4 d-md-flex justify-content-between align-items-center">
              <div className="mb-3 mb-md-0">
                <a href="https://datastudio.google.com/u/1/reporting/99a828d5-8d91-473a-859d-52f830629ef2/page/tWDGB">
                  <h1 className="mb-0 h2 fw-bold">
                    <FcGoogle />
                    oogle Analytics
                  </h1>
                </a>
              </div>
            </div>
          </Col>
        </Row>
        <AnalyticsRequests />
      </div>
    </React.Fragment>
  );
};

export default DisplayAnaytics;

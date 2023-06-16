import React from "react";
import Typed from "react-typed";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap"; //ListGroup
import "./landing.css";
// import Icon from "@mdi/react";
// import { mdiCheck } from "@mdi/js";

const HeroTyped = () => {
  return (
    <div className="py-lg-18 py-10 bg-auto bg-style-herotype">
      <Container>
        <Row className="justify-content-center">
          <Col xl={7} lg={7} md={12}>
            <div className="py-8 py-lg-0 text-center">
              <h1 className="display-2 fw-bold mb-3 text-primary">
                <span className="text-light px-3 px-md-0">Welcome to</span>
                <span className="text-primary ms-2">
                  <Typed
                    strings={["Immersed"]}
                    typeSpeed={60}
                    backSpeed={50}
                    loop
                  />
                </span>
              </h1>
              <p className="mb-6 h2 text-white">
                Immersed is an interactive security training tool that helps to
                protect children while using everyday technology.
              </p>
              <Link to="/dashboard/analytics" className="btn btn-primary me-2">
                Go to Dashboard
              </Link>

              {/* <div className="mt-8 mb-0">
                <ListGroup as="ul" bsPrefix="list-inline">
                  <ListGroup.Item
                    as="li"
                    bsPrefix="list-inline-item text-dark fw-semi-bold lh-1 fs-4 me-3 mb-2 mb-md-0"
                  >
                    <span className="icon-shape icon-xs rounded-circle bg-light-success text-center me-2">
                      <Icon
                        path={mdiCheck}
                        size={0.7}
                        className="text-success"
                      />
                    </span>
                    <span className="align-middle text-white">
                      30,000 online courses
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item
                    as="li"
                    bsPrefix="list-inline-item text-dark fw-semi-bold lh-1 fs-4 me-3 mb-2 mb-md-0"
                  >
                    <span className="icon-shape icon-xs rounded-circle bg-light-success text-center me-2">
                      <Icon
                        path={mdiCheck}
                        size={0.7}
                        className="text-success"
                      />
                    </span>
                    <span className="align-middle text-white">
                      Expert instruction
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item
                    as="li"
                    bsPrefix="list-inline-item text-dark fw-semi-bold lh-1 fs-4"
                  >
                    <span className="icon-shape icon-xs rounded-circle bg-light-success text-center me-2">
                      <Icon
                        path={mdiCheck}
                        size={0.7}
                        className="text-success"
                      />
                    </span>
                    <span className="align-middle text-white">
                      Lifetime access
                    </span>
                  </ListGroup.Item>
                </ListGroup>
              </div> */}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default HeroTyped;

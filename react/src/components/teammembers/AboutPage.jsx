import React from "react";
import CoFounder from "../teammembers/CoFounder";
import { Col, Row } from "react-bootstrap";
import Founder from "../teammembers/Founder";
import "../teammembers/aboutpage.css";

function AboutPage() {
  return (
    <React.Fragment>
      <Row>
        <Col lg={{ span: 8, offset: 2 }} md={12} sm={12} className="mb-12">
          {}
          <h1 className="display-2 fw-bold mb-3">
            Hi there, we’re <span className="text-primary">Immersed!!</span>
          </h1>
          {}
          <p className="h2 mb-3 ">Our mission</p>
          <p className="h2 mb-3 ">
            The Immersed website places the user into a situation where they are
            caught up in a task, such as playing a game or interacting through a
            social platform, but inside a controlled training environment.
          </p>
          <p className="h2 mb-3 ">
            We offer up opportunities to violate good cyber security practice.
          </p>

          <p className="h2 mb-3 ">
            To let the user play out the consequences of the security violation
            in a way the user feels the consequence.
          </p>

          <p className="h2 mb-3 ">
            We also give the user specific feedback based on the action taken.
          </p>
          <h1 className="display-4 fw-bold mb-3">
            <span className="text-primary">Meet our founders!</span>
          </h1>
        </Col>
      </Row>
      <Row className="d-flex">
        <Col>
          <CoFounder />
        </Col>

        <Col>
          <Founder />
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default AboutPage;

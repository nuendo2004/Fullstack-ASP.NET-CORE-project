import React from "react";
import { securityTipsData } from "./rescueCenterData";
import { Col, Row, Container } from "react-bootstrap";
import GKAccordionBox from "../accordions/GkAccordionBox";

function SecurityTips() {
  return (
    <>
      <div className="py-5">
        <Container>
          <Row>
            <Col md={{ offset: 2, span: 8 }} xs={12}>
              <div className="mb-4">
                <h2 className="mb-0 fw-semi-bold">Top Cyber Security Tips</h2>
              </div>
              <p className="mb-4">
                {
                  "Below you can find the some of the top cyber security tips. Knowing these you will be in a much better position to takle your training and avoid those common security events"
                }
              </p>
              <GKAccordionBox
                accordionItems={securityTipsData}
                itemClass="px-0"
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
export default SecurityTips;

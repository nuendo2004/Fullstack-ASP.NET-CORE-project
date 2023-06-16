import React from "react";
import { phishingAttack } from "./rescueCenterData";
import { Col, Row, Container } from "react-bootstrap";
import * as DOMPurify from "dompurify";

function HowToPhishingAttack() {
  const cleanHTML = DOMPurify.sanitize(phishingAttack.content);
  return (
    <>
      <div className="py-10">
        <Container>
          <Row>
            <Col md={{ offset: 2, span: 8 }} xs={12}>
              <div className="mb-8">
                <h1 className="display-4 fw-semi-bold text-center mb-5">
                  {phishingAttack.title}
                </h1>
                <div
                  className="mt-3"
                  dangerouslySetInnerHTML={{
                    __html: cleanHTML,
                  }}
                ></div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default HowToPhishingAttack;

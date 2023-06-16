import { Col, Row, Container } from "react-bootstrap";
import GKAccordionBox from "../accordions/GkAccordionBox";
import HeaderBreadcrumb from "./HeaderBreadcrumb";
import { MostAskedFAQs, GeneralInquiriesFAQs, SupportFAQs } from "./faqsData";
import React, { useState } from "react";

function AllFAQsList() {
  const [showMostAsked, setMostAsked] = useState(true);

  const [showGeneralInquries, setGeneralInquries] = useState(false);

  const [showSupport, setSupport] = useState(false);

  const [isActive, setIsActive] = useState(0);

  const mostAskedButton = (e, idx) => {
    e.preventDefault();
    setMostAsked(true);
    setGeneralInquries(false);
    setSupport(false);
    setIsActive(idx);
  };

  const generalInquriesButton = (e, idx) => {
    e.preventDefault();
    setGeneralInquries(true);
    setMostAsked(false);
    setSupport(false);
    setIsActive(idx);
  };

  const supportButton = (e, idx) => {
    e.preventDefault();
    setSupport(true);
    setMostAsked(false);
    setGeneralInquries(false);
    setIsActive(idx);
  };

  return (
    <React.Fragment>
      <div>
        <HeaderBreadcrumb />
      </div>
      <Container>
        <Row>
          <Col md={{ offset: 2, span: 8 }} xs={12}>
            <div className="container">
              <button
                name="mostAskedQuestions"
                onClick={(e) => mostAskedButton(e, 0)}
                className={`btn btn-primary ${
                  isActive === 0 ? "active faq-btn opacity-50 " : ""
                }`}
              >
                Most Asked Questions
              </button>
              {"  "}
              <button
                name="generalInquiries"
                onClick={(e) => generalInquriesButton(e, 1)}
                className={`btn btn-primary ${
                  isActive === 1 ? "active opacity-50" : ""
                }`}
              >
                General Inquiries
              </button>
              {"  "}
              <button
                name="support"
                onClick={(e) => supportButton(e, 2)}
                className={`btn btn-primary ${
                  isActive === 2 ? "active opacity-50" : ""
                }`}
              >
                Support
              </button>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="py-10">
        <Container>
          {showMostAsked && (
            <Row>
              <Col md={{ offset: 2, span: 8 }} xs={12}>
                <div className="mb-4">
                  <h2 className="mb-0 fw-semi-bold">Most asked Questions</h2>
                </div>
                <GKAccordionBox
                  accordionItems={MostAskedFAQs}
                  itemClass="px-0"
                />
              </Col>
            </Row>
          )}
          {showGeneralInquries && (
            <Row>
              <Col md={{ offset: 2, span: 8 }} xs={12}>
                <div className="mb-4 mt-6">
                  <h2 className="mb-0 fw-semi-bold">General inquiries</h2>
                </div>
                <GKAccordionBox
                  accordionItems={GeneralInquiriesFAQs}
                  itemClass="px-0"
                />
              </Col>
            </Row>
          )}
          {showSupport && (
            <Row>
              <Col md={{ offset: 2, span: 8 }} xs={12}>
                <div className="mb-4 mt-6">
                  <h2 className="mb-0 fw-semi-bold">Support</h2>
                </div>

                <GKAccordionBox accordionItems={SupportFAQs} itemClass="px-0" />
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
}
export default AllFAQsList;

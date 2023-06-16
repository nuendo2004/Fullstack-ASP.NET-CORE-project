import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, Container, ListGroup } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiFacebook, mdiTwitter, mdiInstagram } from "@mdi/js";
import FooterLogo from "assets/images/brand/logo/immersed-spiral-logo.png";

const FooterWithLinks = () => {
  return (
    <Fragment>
      <div className="pt-lg-10 pt-5 footer bg-white ">
        <Container>
          <Row className="align-items-center g-0 border-top py-2 bg-white" />
          <Row className="pt-6">
            <Col lg={4} md={6} sm={12}>
              <div className="mb-4">
                <Link to="/">
                  <Image src={FooterLogo} alt="" className="mb-4 w-15 h-15" />
                  <h3 className="d-inline pull-right p-2">
                    <strong className="text-black">Immersed</strong>
                  </h3>
                </Link>
                <div className="mt-4">
                  <p>Immersed theme and text accordingly</p>
                  <div className="fs-4 mt-4">
                    <Link to="#" className="mdi mdi-facebook text-muted me-2">
                      <Icon path={mdiFacebook} size={0.7} />
                    </Link>
                    <Link to="#" className="mdi mdi-twitter text-muted me-2">
                      <Icon path={mdiTwitter} size={0.7} />
                    </Link>
                    <Link to="#" className="mdi mdi-instagram text-muted ">
                      <Icon path={mdiInstagram} size={0.7} />
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={{ span: 2, offset: 1 }} md={3} sm={6}>
              <div className="mb-4">
                <h3 className="fw-bold mb-3">Company</h3>
                <ListGroup
                  as="ul"
                  bsPrefix="list-unstyled"
                  className="nav nav-footer flex-column nav-x-0"
                >
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="/aboutpage" className="nav-link">
                      About
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="/subscription" className="nav-link">
                      Pricing
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="/blogs" className="nav-link">
                      Blog
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="/newsletters" className="nav-link">
                      Newsletter
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="#" className="nav-link">
                      Careers
                    </Link>
                  </ListGroup.Item>
                  {/* <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="#" className="nav-link">
                      Contact
                    </Link>
                  </ListGroup.Item> */}
                </ListGroup>
              </div>
            </Col>
            <Col lg={2} md={3} sm={6}>
              <div className="mb-4">
                <h3 className="fw-bold mb-3">Support</h3>
                <ListGroup
                  as="ul"
                  bsPrefix="list-unstyled"
                  className="nav nav-footer flex-column nav-x-0"
                >
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="#" className="nav-link">
                      Help and Support
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="#" className="nav-link">
                      Become Instructor
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="#" className="nav-link">
                      Get the app
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="/faq" className="nav-link">
                      FAQ’s
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="#" className="nav-link">
                      Tutorial
                    </Link>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </Col>
            <Col lg={3} md={12} sm={12}>
              <div className="mb-4">
                <h3 className="fw-bold mb-3">Get in touch</h3>
                <p>Address: 339 McDermott Points Hettingerhaven, NV 15283</p>
                <p className="mb-1">
                  Email: <Link to="#">support@immersed.com</Link>
                </p>
                <p>
                  Phone:{" "}
                  <span className="text-dark fw-semi-bold">
                    (333) 123 456 789
                  </span>
                </p>
              </div>
            </Col>
          </Row>
          <Row className="align-items-center g-0 border-top py-2 mt-6">
            <Col lg={4} md={5} sm={12}>
              <span>© 2022 Immersed. All Rights Reserved</span>
            </Col>
            <Col
              lg={8}
              md={7}
              sm={12}
              className="d-md-flex justify-content-end"
            >
              <nav className="nav nav-footer">
                <Link className="nav-link ps-0" to="#">
                  Privacy Policy
                </Link>
                <Link className="nav-link px-2 px-md-3" to="#">
                  Cookie Policy{" "}
                </Link>
                <Link className="nav-link d-none d-lg-block" to="#">
                  Do Not Sell My Personal Information{" "}
                </Link>
                <Link className="nav-link" to="#">
                  Terms of Use
                </Link>
              </nav>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default FooterWithLinks;

import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Collapse,
  Form,
  Image,
  Navbar,
  Container,
  CloseButton,
} from "react-bootstrap";
import PropTypes from "prop-types";

import Logo from "assets/images/brand/logo/immersed-spiral-logo.png";

const NavbarHelpCenter = ({ bg, className }) => {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <Collapse in={open}>
        <Container>
          <Row className="align-items-center">
            <Col md={11} xs={10}>
              <div className="py-4">
                <Form className="d-flex align-items-center">
                  <span className="position-absolute ps-3">
                    <i className="fe fe-search text-muted"></i>
                  </span>
                  <Form.Control
                    type="search"
                    placeholder="Enter a question, topic or keyword"
                    className="form-control ps-6 border-0 py-3 smooth-shadow-md"
                  />
                </Form>
              </div>
            </Col>
            <Col md={1} xs={2}>
              <CloseButton onClick={() => setOpen(!open)} />
            </Col>
          </Row>
        </Container>
      </Collapse>
      <Navbar bg={bg} className={className} expand="lg">
        <Container className="px-0 ">
          <div className="d-flex align-items-center">
            <Navbar.Brand
              as={Link}
              to="/"
              className={bg === "dark" ? "text-inverse" : ""}
            >
              <Image src={Logo} alt="" />
            </Navbar.Brand>
            <div
              className={`text-${
                bg === "dark" ? "white" : "black"
              }-50 justify-content-between d-flex`}
            >
              <div
                className={`vr bg-${
                  bg === "dark" ? "light" : "dark"
                } bg-opacity-25`}
              ></div>
              <p className="ms-3 mb-0">Help Center</p>
            </div>
          </div>
          <div className="ms-auto d-flex align-items-center">
            <Link
              to="#"
              className={`me-md-4 text-${
                bg === "dark" ? "white-50" : "inherit"
              } collapsed`}
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              <i className="fe fe-search fs-3"></i>
            </Link>
            <Link
              to="/marketing/help-center/support/"
              className="btn btn-primary d-md-block d-none"
            >
              Submit Ticket
            </Link>
          </div>
        </Container>
      </Navbar>
    </Fragment>
  );
};

NavbarHelpCenter.propTypes = {
  bg: PropTypes.string,
  className: PropTypes.string,
};

NavbarHelpCenter.defaultProps = {
  bg: "dark",
  className: "",
};

export default NavbarHelpCenter;
